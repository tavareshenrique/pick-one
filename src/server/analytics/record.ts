import { getMood } from '@/config/moods'
import { toAnalyticsMovie } from '@/lib/analytics-movie'
import type { RecommendRequest } from '@/lib/schema'
import type { MovieResult, Sadness } from '@/lib/types'

import type { AnalyticsEventInput } from './schema'
import { recordEvent } from './store'

function moodSnapshot(id: string) {
  const mood = getMood(id)
  return { id: mood.id, label: mood.label, emoji: mood.emoji }
}

export async function recordClientEvent(event: AnalyticsEventInput) {
  if (event.name === 'mood_select') {
    await recordEvent(event.name, event.visitId, moodSnapshot(event.props.id))
    return
  }
  await recordEvent(event.name, event.visitId, event.props)
}

export async function recordRecommendation(args: {
  input: RecommendRequest
  inferredMoodId: string
  /** Texto já limpo. Abuso chega aqui como null e com `abuse`. */
  text: string | null
  abuse: boolean
  source: 'ai' | 'fallback'
  sadness: Sadness
  showCvv: boolean
  movies: MovieResult[]
  cinema: MovieResult | null
}) {
  const { input } = args
  await recordEvent('recommendation', input.visitId ?? null, {
    mood: moodSnapshot(input.mood),
    inferredMood: moodSnapshot(args.inferredMoodId),
    mode: input.mode,
    text: args.abuse ? null : args.text,
    ...(args.abuse ? { omitReason: 'abuse' as const } : {}),
    preset: input.preset ?? null,
    duration: {
      min: input.duration.min ?? null,
      max: input.duration.max ?? null,
    },
    source: args.source,
    sadness: args.sadness,
    showCvv: args.showCvv,
    movies: args.movies.map(toAnalyticsMovie),
    cinema: args.cinema ? toAnalyticsMovie(args.cinema) : null,
  })
}
