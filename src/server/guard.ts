import { Ratelimit } from '@upstash/ratelimit'
import { NextRequest } from 'next/server'

import {
  DEFAULT_AI_DAILY_LIMIT,
  RATE_LIMIT_PER_DAY,
  RATE_LIMIT_PER_MINUTE,
} from '@/config/recommend'

import { getRedis } from './cache'

export function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

/** Rejeita quando o Origin não for o do app. Sem Origin (curl, SSR) passa a ser tratado como inválido em produção. */
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return process.env.NODE_ENV !== 'production'
  const host = req.headers.get('host')
  try {
    const o = new URL(origin)
    if (host && o.host === host) return true
    const extra = (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
    return extra.includes(origin)
  } catch {
    return false
  }
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // camada desligada
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body, signal: AbortSignal.timeout(3000) },
    )
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

let limiters: { day: Ratelimit; minute: Ratelimit } | null = null

function getLimiters() {
  const redis = getRedis()
  if (!redis) return null
  limiters ??= {
    day: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_PER_DAY, '1 d'),
      prefix: 'rl:day',
    }),
    minute: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_PER_MINUTE, '1 m'),
      prefix: 'rl:min',
    }),
  }
  return limiters
}

function secondsUntilMidnightBR(): number {
  const now = new Date()
  const br = new Date(now.getTime() - 3 * 3600 * 1000)
  const next = Date.UTC(
    br.getUTCFullYear(),
    br.getUTCMonth(),
    br.getUTCDate() + 1,
  )
  return Math.max(60, Math.ceil((next - br.getTime()) / 1000))
}

async function withinDailyBudget(): Promise<boolean> {
  const redis = getRedis()
  if (!redis) return false
  const limit = Number(process.env.AI_DAILY_LIMIT) || DEFAULT_AI_DAILY_LIMIT
  const br = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10)
  const key = `ai:budget:${br}`
  try {
    const used = await redis.incr(key)
    if (used === 1) await redis.expire(key, secondsUntilMidnightBR())
    return used <= limit
  } catch {
    return false
  }
}

/**
 * Decide se esta requisição pode gastar IA. Qualquer falha => false
 * (o usuário ainda recebe filme pelo fallback). Exige Redis: sem ele,
 * não há como limitar abuso, então a IA fica desligada.
 */
export async function canUseAI(
  req: NextRequest,
  turnstileToken: string | undefined,
): Promise<boolean> {
  const l = getLimiters()
  if (!l) return false
  const ip = getIp(req)

  if (!(await verifyTurnstile(turnstileToken, ip))) return false
  try {
    const [min, day] = await Promise.all([
      l.minute.limit(ip),
      l.day.limit(ip),
    ])
    if (!min.success || !day.success) return false
  } catch {
    return false
  }
  return withinDailyBudget()
}
