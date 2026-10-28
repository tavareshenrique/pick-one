import { MIN_RECENT_SCORE, RECENT_RATIO, RESULT_SIZE } from '@/config/recommend'

import type { Candidate } from './candidates'

export interface Scored {
  candidate: Candidate
  /** 0 a 1 */
  score: number
}

const decade = (c: Candidate) => (c.year ? Math.floor(c.year / 10) : 0)

/**
 * Monta o top respeitando a cota de recentes (~RECENT_RATIO), sem forçar
 * lançamentos ruins, e variando as épocas do catálogo.
 */
export function selectTop(scored: Scored[], size = RESULT_SIZE): Scored[] {
  const sorted = [...scored].sort((a, b) => b.score - a.score)
  const recentTarget = Math.round(size * RECENT_RATIO)

  const picked: Scored[] = []
  for (const s of sorted) {
    if (picked.length >= recentTarget) break
    if (s.candidate.recent && s.score >= MIN_RECENT_SCORE) picked.push(s)
  }

  const usedDecades = new Map<number, number>()
  const catalog = sorted.filter((s) => !picked.includes(s))
  // Catálogo primeiro, penalizando décadas repetidas
  while (picked.length < size && catalog.length) {
    let bestIdx = 0
    let best = -Infinity
    catalog.forEach((s, i) => {
      if (s.candidate.recent) return
      const v = s.score - 0.08 * (usedDecades.get(decade(s.candidate)) ?? 0)
      if (v > best) {
        best = v
        bestIdx = i
      }
    })
    if (best === -Infinity) break
    const [s] = catalog.splice(bestIdx, 1)
    usedDecades.set(decade(s.candidate), (usedDecades.get(decade(s.candidate)) ?? 0) + 1)
    picked.push(s)
  }

  // Se o catálogo acabou, completa com o que sobrar (recentes)
  for (const s of catalog) {
    if (picked.length >= size) break
    picked.push(s)
  }
  return picked
}
