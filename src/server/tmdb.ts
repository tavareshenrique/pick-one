import { DETAILS_TTL_SECONDS } from '@/config/recommend'
import type { MovieResult, Provider } from '@/lib/types'

import { cached } from './cache'
import { getStreamingLinks } from './justwatch'

const BASE = 'https://api.themoviedb.org/3'

export const IMG = {
  poster: (p: string | null) =>
    p ? `https://image.tmdb.org/t/p/w500${p}` : null,
  backdrop: (p: string | null) =>
    p ? `https://image.tmdb.org/t/p/w780${p}` : null,
}

export class TmdbError extends Error {}

export async function tmdb<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  const token = process.env.TMDB_TOKEN
  if (!token) throw new TmdbError('TMDB_TOKEN ausente')

  const qs = new URLSearchParams({ language: 'pt-BR' })
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v))
  }

  const res = await fetch(`${BASE}${path}?${qs}`, {
    headers: {
      accept: 'application/json',
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
    },
    signal: AbortSignal.timeout(6000),
  })
  if (!res.ok) throw new TmdbError(`TMDB ${res.status} em ${path}`)
  return (await res.json()) as T
}

export interface TmdbListItem {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  genre_ids: number[]
  release_date?: string
  vote_average: number
  vote_count: number
  popularity: number
}

interface TmdbProvider {
  provider_id: number
  provider_name: string
  logo_path: string
  display_priority: number
}

interface TmdbDetails {
  id: number
  title: string
  original_title?: string
  overview: string
  runtime: number | null
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  vote_average: number
  genres: { id: number; name: string }[]
  videos?: { results: { site: string; type: string; key: string }[] }
  'watch/providers'?: {
    results?: {
      BR?: {
        flatrate?: TmdbProvider[]
        rent?: TmdbProvider[]
        buy?: TmdbProvider[]
      }
    }
  }
}

const toProviders = (
  list: TmdbProvider[] = [],
  links: Record<string, string> = {},
): Provider[] =>
  [...list]
    .sort((a, b) => a.display_priority - b.display_priority)
    .map((p) => ({
      id: p.provider_id,
      name: p.provider_name,
      icon: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
      url: links[String(p.provider_id)] ?? null,
    }))

function releaseYear(date: string | undefined): number | null {
  if (!date) return null
  const year = Number(date.slice(0, 4))
  return Number.isInteger(year) ? year : null
}

export interface MovieFlags {
  recent: boolean
  nowPlaying: boolean
}

export async function getMovieDetails(
  id: number,
  flags: MovieFlags,
): Promise<MovieResult | null> {
  try {
    const d = await cached(`tmdb:details:${id}`, DETAILS_TTL_SECONDS, () =>
      tmdb<TmdbDetails>(`/movie/${id}`, {
        append_to_response: 'videos,watch/providers',
      }),
    )
    const br = d['watch/providers']?.results?.BR
    const year = releaseYear(d.release_date)
    const links = await getStreamingLinks({
      id: d.id,
      title: d.title,
      originalTitle: d.original_title?.trim() || null,
      year,
    })
    const trailer = d.videos?.results.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer',
    )
    return {
      id: d.id,
      title: d.title,
      year,
      runtime: d.runtime || null,
      rating: Math.round(d.vote_average * 10) / 10,
      overview: d.overview,
      poster: IMG.poster(d.poster_path),
      backdrop: IMG.backdrop(d.backdrop_path),
      genres: d.genres.map((g) => g.name),
      recent: flags.recent,
      nowPlaying: flags.nowPlaying,
      trailer: trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : null,
      providers: {
        streaming: toProviders(br?.flatrate, links),
        rent: toProviders(br?.rent, links),
      },
    }
  } catch {
    return null
  }
}
