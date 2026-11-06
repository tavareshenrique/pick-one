import type { MovieResult } from '@/lib/types'

/** O que a pessoa viu. Sem sinopse, motivo, pôster ou link. */
export interface AnalyticsMovie {
  id: number
  title: string
  year: number | null
  rating: number
  runtime: number | null
  genres: string[]
  recent: boolean
  nowPlaying: boolean
}

export function toAnalyticsMovie(movie: MovieResult): AnalyticsMovie {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    rating: movie.rating,
    runtime: movie.runtime,
    genres: movie.genres,
    recent: movie.recent,
    nowPlaying: movie.nowPlaying,
  }
}
