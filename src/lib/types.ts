export type Sadness = 0 | 1 | 2

export interface Provider {
  id: number
  name: string
  icon: string
  /** Ficha do filme no serviço. Null quando o JustWatch não devolve um https. */
  url: string | null
}

export interface MovieResult {
  id: number
  title: string
  year: number | null
  runtime: number | null
  rating: number
  overview: string
  poster: string | null
  backdrop: string | null
  genres: string[]
  recent: boolean
  nowPlaying: boolean
  trailer: string | null
  providers: { streaming: Provider[]; rent: Provider[] }
  /** "Por que esse filme" (só IA) */
  reason?: string
}

export interface RecommendResponse {
  source: 'ai' | 'fallback'
  movies: MovieResult[]
  cinema: MovieResult | null
  message: string | null
  sadness: Sadness
  showCvv: boolean
}
