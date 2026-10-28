import { Redis } from '@upstash/redis'

let redis: Redis | null | undefined

export function getRedis(): Redis | null {
  if (redis !== undefined) return redis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  redis = url && token ? new Redis({ url, token }) : null
  return redis
}

const memory = new Map<string, { value: unknown; expires: number }>()

export async function cacheGet<T>(key: string): Promise<T | null> {
  const r = getRedis()
  if (r) {
    try {
      return (await r.get<T>(key)) ?? null
    } catch {
      return null
    }
  }
  const hit = memory.get(key)
  if (hit && hit.expires > Date.now()) return hit.value as T
  memory.delete(key)
  return null
}

export async function cacheSet(key: string, value: unknown, ttl: number) {
  const r = getRedis()
  if (r) {
    try {
      await r.set(key, value, { ex: ttl })
    } catch {}
    return
  }
  if (memory.size > 500) memory.clear()
  memory.set(key, { value, expires: Date.now() + ttl * 1000 })
}

export async function cached<T>(
  key: string,
  ttl: number,
  load: () => Promise<T>,
): Promise<T> {
  const hit = await cacheGet<T>(key)
  if (hit !== null) return hit
  const value = await load()
  await cacheSet(key, value, ttl)
  return value
}
