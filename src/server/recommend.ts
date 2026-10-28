import { NextRequest } from 'next/server'

import { SUPPORT_MESSAGES } from '@/config/messages'
import { getMood, MOODS, type MoodId } from '@/config/moods'
import {
  AI_TIMEOUT_MS,
  CINEMA_CHANCE_SADNESS_1,
  MIN_AI_CONFIDENCE,
  RANK_TTL_SECONDS,
} from '@/config/recommend'
import type { RecommendRequest } from '@/lib/schema'
import type { MovieResult, RecommendResponse, Sadness } from '@/lib/types'

import { cacheGet, cacheSet } from './cache'
import { createGemini, isValidMessage } from './ai/gemini'
import { readTextHeuristic } from './ai/heuristics'
import { createJev } from './ai/jev'
import type { RankResult } from './ai/types'
import {
  type Candidate,
  getNowPlaying,
  getPool,
  lightCinemaOptions,
} from './candidates'
import { fallbackScore } from './fallback'
import { canUseAI } from './guard'
import { type Scored, selectTop } from './select'
import { getMovieDetails } from './tmdb'

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    p.catch(() => null),
    new Promise<null>((r) => setTimeout(() => r(null), ms)),
  ])
}

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

function fitsDuration(runtime: number | null, d: RecommendRequest['duration']) {
  if (!runtime) return true
  return (d.min === undefined || runtime >= d.min) && (d.max === undefined || runtime <= d.max)
}

export async function recommend(
  req: NextRequest,
  input: RecommendRequest,
): Promise<RecommendResponse> {
  const jev = createJev()
  const gemini = createGemini()
  const hasAI = !!(jev || gemini)

  // Rede de segurança local: sempre roda, é gratuita.
  const text = input.text?.trim() || undefined
  const heuristic = text ? readTextHeuristic(text) : null

  let aiAllowed = hasAI && !heuristic?.abuse && (await canUseAI(req, input.turnstileToken))

  let moodId = input.mood as string
  let sadness: Sadness = Math.max(getMood(moodId).sadness, heuristic?.sadness ?? 0) as Sadness
  let usableText = heuristic?.abuse ? undefined : text

  // Jev: leitura do texto livre
  if (aiAllowed && jev && usableText) {
    const reading = await withTimeout(jev.readText(usableText), AI_TIMEOUT_MS)
    if (reading) {
      if (reading.abuse) {
        aiAllowed = false
        usableText = undefined
      } else if (reading.confidence >= MIN_AI_CONFIDENCE) {
        if (reading.mood && MOODS.some((m) => m.id === reading.mood)) {
          moodId = reading.mood as MoodId
        }
        sadness = Math.max(sadness, reading.sadness, getMood(moodId).sadness) as Sadness
      }
    }
  }
  const mood = getMood(moodId)
  const effective: RecommendRequest = { ...input, mood: mood.id as MoodId }

  const exclude = new Set(input.exclude ?? [])
  const pool = (await getPool(effective, sadness)).filter((c) => !exclude.has(c.id))

  // Ranking: Jev (se permitido) ou fallback por gêneros
  let source: 'ai' | 'fallback' = 'fallback'
  let scored: Scored[] = []

  if (aiAllowed && jev) {
    const cacheKey = usableText
      ? null
      : `rank:${mood.id}:${input.mode}:${sadness}:${input.duration.min ?? 'x'}-${input.duration.max ?? 'x'}`
    let ranked: RankResult | null = cacheKey ? await cacheGet<RankResult>(cacheKey) : null
    const coverage = (r: RankResult) =>
      pool.filter((c) => c.id in r.scores).length / Math.max(1, pool.length)
    if (ranked && coverage(ranked) < 0.5) ranked = null

    if (!ranked) {
      ranked = await withTimeout(
        jev.rank(pool, {
          moodHint: mood.promptHint,
          mode: input.mode,
          sadness,
          text: usableText,
        }),
        AI_TIMEOUT_MS,
      )
      if (ranked && cacheKey && ranked.confidence >= MIN_AI_CONFIDENCE) {
        await cacheSet(cacheKey, ranked, RANK_TTL_SECONDS)
      }
    }
    if (ranked && ranked.confidence >= MIN_AI_CONFIDENCE) {
      const r = ranked
      scored = pool
        .filter((c) => c.id in r.scores)
        .map((c) => ({ candidate: c, score: r.scores[c.id] }))
      if (scored.length) source = 'ai'
    }
  }
  if (source === 'fallback') scored = fallbackScore(pool, effective, sadness)

  const top = selectTop(scored)
  const detailed = (
    await Promise.all(
      top.map((s) =>
        getMovieDetails(s.candidate.id, {
          recent: s.candidate.recent,
          nowPlaying: false,
        }),
      ),
    )
  ).filter((m): m is MovieResult => !!m && fitsDuration(m.runtime, input.duration))

  // Gemini: só textos, só sobre filmes já escolhidos
  let message: string | null = null
  if (source === 'ai' && gemini && detailed.length) {
    const copy = await withTimeout(
      gemini.writeCopy(detailed, {
        moodHint: mood.promptHint,
        mode: input.mode,
        sadness,
        text: usableText,
      }),
      7000,
    )
    if (copy) {
      for (const m of detailed) if (copy.reasons[m.id]) m.reason = copy.reasons[m.id]
      if (sadness >= 1 && copy.message && isValidMessage(copy.message)) {
        message = copy.message.trim()
      }
    }
  }
  if (sadness >= 1 && !message) message = pick(SUPPORT_MESSAGES)

  const cinema = await pickCinema(
    mood.cinemaWeight,
    sadness,
    input.duration,
    new Set([...exclude, ...detailed.map((m) => m.id)]),
  )

  return {
    source,
    movies: detailed,
    cinema,
    message,
    sadness,
    showCvv: sadness === 2,
  }
}

async function pickCinema(
  weight: number,
  sadness: Sadness,
  duration: RecommendRequest['duration'],
  exclude: Set<number>,
): Promise<MovieResult | null> {
  const chance = sadness === 2 ? 1 : sadness === 1 ? Math.max(weight, CINEMA_CHANCE_SADNESS_1) : weight
  if (Math.random() > chance) return null
  try {
    let options: Candidate[] = (await getNowPlaying()).filter((c) => !exclude.has(c.id))
    if (sadness >= 1) options = lightCinemaOptions(options)
    options = [...options].sort(() => Math.random() - 0.5).slice(0, 4)
    for (const c of options) {
      const m = await getMovieDetails(c.id, { recent: true, nowPlaying: true })
      if (m && fitsDuration(m.runtime, duration)) return m
    }
  } catch {}
  return null
}
