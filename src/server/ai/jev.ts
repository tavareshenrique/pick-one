import { MOOD_IDS } from '@/config/moods'

import type { Candidate } from '../candidates'
import type {
  RankContext,
  RankResult,
  Ranker,
  TextReader,
  TextReading,
} from './types'

/**
 * Adaptador do Jev (TypeSafe).
 *
 * PENDENTE: o formato exato da chamada (SDK ou HTTP) vem da documentação do
 * console TypeSafe, que exige a chave. Até lá, `call` lança e a rota cai no
 * fallback de gêneros, o que é seguro. Para integrar, implemente apenas `call`.
 *
 * Contratos esperados:
 *  - leitura: { text, moods: MOOD_IDS } -> { mood, sadness 0|1|2, abuse, confidence }
 *  - ranking: candidatos (id, título, ano, gêneros, sinopse curta, flags)
 *             -> nota 0..1 por id + confiança
 */
async function call<T>(_task: 'read' | 'rank', _payload: unknown): Promise<T> {
  throw new Error('Jev: integração pendente (ver docs do console TypeSafe)')
}

export function createJev(): (TextReader & Ranker) | null {
  if (!process.env.TYPESAFE_API_KEY) return null

  return {
    async readText(text: string): Promise<TextReading | null> {
      return call<TextReading>('read', { text, moods: MOOD_IDS })
    },
    async rank(
      candidates: Candidate[],
      ctx: RankContext,
    ): Promise<RankResult | null> {
      return call<RankResult>('rank', {
        ctx,
        candidates: candidates.map((c) => ({
          id: c.id,
          title: c.title,
          year: c.year,
          genres: c.genreIds,
          overview: c.overview.slice(0, 240),
          flag: c.nowPlaying ? 'now_playing' : c.recent ? 'recent' : 'catalog',
        })),
      })
    },
  }
}
