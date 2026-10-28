import type { Sadness } from '@/config/moods'
import type { RecommendRequest } from '@/lib/schema'

import { type Candidate, isHeavy, moodGenres } from './candidates'
import type { Scored } from './select'

/** Pontua pelo número de gêneros do humor + nota, com ruído para sorteio ponderado. */
export function fallbackScore(
  pool: Candidate[],
  req: Pick<RecommendRequest, 'mood' | 'mode'>,
  sadness: Sadness,
): Scored[] {
  const genres = moodGenres(req)
  const wantsShift = req.mode === 'shift'

  return pool
    .filter((c) => !(sadness === 2 && !wantsShift && isHeavy(c)))
    .map((c) => {
      const overlap = c.genreIds.filter((g) => genres.includes(g)).length
      const genreScore = Math.min(1, overlap / 2)
      const ratingScore = Math.min(1, Math.max(0, (c.rating - 5) / 4))
      const noise = Math.random()
      return {
        candidate: c,
        score: 0.4 * genreScore + 0.3 * ratingScore + 0.3 * noise,
      }
    })
}
