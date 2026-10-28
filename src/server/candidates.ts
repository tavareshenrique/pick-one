import { G, getMood, type Sadness } from '@/config/moods'
import {
  NOW_PLAYING_TTL_SECONDS,
  POOL_RECENT_SHARE,
  POOL_SIZE,
  POOL_TTL_SECONDS,
  RECENT_MONTHS,
} from '@/config/recommend'
import type { RecommendRequest } from '@/lib/schema'

import { cached } from './cache'
import { tmdb, type TmdbListItem } from './tmdb'

export interface Candidate {
  id: number
  title: string
  year: number | null
  genreIds: number[]
  overview: string
  rating: number
  votes: number
  popularity: number
  recent: boolean
  nowPlaying: boolean
}

interface TmdbPage {
  results: TmdbListItem[]
}

export function recentCutoff(): string {
  const d = new Date()
  d.setMonth(d.getMonth() - RECENT_MONTHS)
  return d.toISOString().slice(0, 10)
}

function toCandidate(item: TmdbListItem, recent: boolean): Candidate {
  return {
    id: item.id,
    title: item.title,
    year: item.release_date ? Number(item.release_date.slice(0, 4)) : null,
    genreIds: item.genre_ids,
    overview: item.overview,
    rating: item.vote_average,
    votes: item.vote_count,
    popularity: item.popularity,
    recent,
    nowPlaying: false,
  }
}

export function moodGenres(req: Pick<RecommendRequest, 'mood' | 'mode'>) {
  const mood = getMood(req.mood)
  return req.mode === 'shift' ? mood.genresShift : mood.genresKeep
}

/** Remove combinações de tema muito pesado para quem está arrasado. */
export function isHeavy(c: Pick<Candidate, 'genreIds'>): boolean {
  const g = c.genreIds
  return (
    g.includes(G.horror) ||
    (g.includes(G.drama) && g.includes(G.war)) ||
    (g.includes(G.drama) && g.includes(G.crime)) ||
    (g.includes(G.war) && g.includes(G.history))
  )
}

export function durationParams(d: RecommendRequest['duration']) {
  return { 'with_runtime.gte': d.min, 'with_runtime.lte': d.max }
}

const poolKey = (req: RecommendRequest, sadness: Sadness) =>
  `pool:${req.mood}:${req.mode}:${sadness}:${req.duration.min ?? 'x'}-${req.duration.max ?? 'x'}`

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function discover(
  genres: number[],
  req: RecommendRequest,
  extra: Record<string, string | number>,
  page: number,
) {
  const data = await tmdb<TmdbPage>('/discover/movie', {
    include_adult: 'false',
    include_video: 'false',
    sort_by: 'popularity.desc',
    with_genres: genres.join('|'),
    with_original_language: undefined,
    page,
    ...durationParams(req.duration),
    ...extra,
  })
  return data.results.filter((r) => r.overview && r.poster_path)
}

/** Pool de até POOL_SIZE candidatos: ~40% recentes, ~60% catálogo. */
export async function getPool(
  req: RecommendRequest,
  sadness: Sadness,
): Promise<Candidate[]> {
  return cached(poolKey(req, sadness), POOL_TTL_SECONDS, async () => {
    const genres = moodGenres(req)
    const catalogStart = 1 + Math.floor(Math.random() * 3)

    const [recentA, recentB, catA, catB] = await Promise.all([
      discover(
        genres,
        req,
        { 'primary_release_date.gte': recentCutoff(), 'vote_count.gte': 80 },
        1,
      ),
      discover(
        genres,
        req,
        { 'primary_release_date.gte': recentCutoff(), 'vote_count.gte': 80 },
        2,
      ),
      discover(
        genres,
        req,
        {
          'primary_release_date.lte': recentCutoff(),
          'vote_count.gte': 800,
          'vote_average.gte': 6.5,
        },
        catalogStart,
      ),
      discover(
        genres,
        req,
        {
          'primary_release_date.lte': recentCutoff(),
          'vote_count.gte': 800,
          'vote_average.gte': 6.5,
        },
        catalogStart + 1,
      ),
    ])

    const keep = (c: Candidate) =>
      !(sadness === 2 && req.mode === 'keep' && isHeavy(c))
    const recent = shuffle(
      [...recentA, ...recentB].map((i) => toCandidate(i, true)),
    ).filter(keep)
    const catalog = shuffle(
      [...catA, ...catB].map((i) => toCandidate(i, false)),
    ).filter(keep)

    const nRecent = Math.round(POOL_SIZE * POOL_RECENT_SHARE)
    const seen = new Set<number>()
    return [
      ...recent.slice(0, nRecent),
      ...catalog.slice(0, POOL_SIZE - nRecent),
    ].filter((c) => !seen.has(c.id) && !!seen.add(c.id))
  })
}

/** Filmes em cartaz no Brasil (compartilhado entre todos, cache de 6h). */
export async function getNowPlaying(): Promise<Candidate[]> {
  return cached('nowplaying:br', NOW_PLAYING_TTL_SECONDS, async () => {
    const data = await tmdb<TmdbPage>('/movie/now_playing', {
      region: 'BR',
      page: 1,
    })
    return data.results
      .filter((r) => r.overview && r.poster_path)
      .map((r) => ({ ...toCandidate(r, true), nowPlaying: true }))
  })
}

const LIGHT = [G.comedy, G.animation, G.adventure, G.family]

/** Opções de tom leve em cartaz (nada de drama pesado ou terror). */
export function lightCinemaOptions(list: Candidate[]): Candidate[] {
  return list.filter(
    (c) =>
      c.genreIds.some((g) => LIGHT.includes(g as (typeof LIGHT)[number])) &&
      !c.genreIds.includes(G.horror) &&
      !c.genreIds.includes(G.war) &&
      !c.genreIds.includes(G.thriller) &&
      !(c.genreIds.includes(G.drama) && !c.genreIds.includes(G.comedy)),
  )
}
