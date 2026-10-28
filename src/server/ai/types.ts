import type { MoodId } from '@/config/moods'
import type { Sadness } from '@/lib/types'

import type { Candidate } from '../candidates'

export interface TextReading {
  /** Humor ajustado lido do texto (se a confiança permitir) */
  mood?: MoodId
  sadness: Sadness
  /** Abuso ou tentativa de jailbreak */
  abuse: boolean
  confidence: number
}

export interface RankResult {
  /** id do filme -> nota de 0 a 1 */
  scores: Record<number, number>
  confidence: number
}

export interface CopyContext {
  moodHint: string
  mode: 'keep' | 'shift'
  sadness: Sadness
  /** Texto livre já validado (nunca abuso) */
  text?: string
}

export interface CopyResult {
  reasons: Record<number, string>
  message?: string
}

export interface RankContext {
  moodHint: string
  mode: 'keep' | 'shift'
  sadness: Sadness
  text?: string
}

/** Cada provedor fica atrás de uma interface pequena para poder ser trocado. */
export interface TextReader {
  readText(text: string): Promise<TextReading | null>
}
export interface Ranker {
  rank(candidates: Candidate[], ctx: RankContext): Promise<RankResult | null>
}
export interface CopyWriter {
  writeCopy(
    movies: { id: number; title: string; year: number | null; overview: string }[],
    ctx: CopyContext,
  ): Promise<CopyResult | null>
}
