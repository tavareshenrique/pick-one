import { RECENT_RATIO } from '@/config/recommend'

import type { MovieResult } from './types'

/**
 * Escolhe o próximo filme entre os já buscados, alternando entre
 * lançamentos e catálogo. Evita repetir os já mostrados e o histórico.
 */
export function pickNext(
  movies: MovieResult[],
  shown: Set<number>,
  history: Set<number>,
  lastRecent: boolean | null,
): MovieResult | null {
  if (!movies.length) return null
  let pool = movies.filter((m) => !shown.has(m.id))
  if (!pool.length) pool = movies.filter((m) => m.id !== [...shown].at(-1))
  if (!pool.length) pool = movies

  const fresh = pool.filter((m) => !history.has(m.id))
  if (fresh.length) pool = fresh

  const wantRecent =
    lastRecent === null ? Math.random() < RECENT_RATIO : !lastRecent
  const group = pool.filter((m) => m.recent === wantRecent)
  const from = group.length ? group : pool
  return from[Math.floor(Math.random() * from.length)]
}
