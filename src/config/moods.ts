import { z } from 'zod'

export type Sadness = 0 | 1 | 2

/** IDs de gênero do TMDB. */
export const G = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  scifi: 878,
  thriller: 53,
  war: 10752,
  western: 37,
} as const

export interface Mood {
  id: string
  label: string
  /** Código unicode do emoji Noto em public/emoji */
  emoji: string
  /** Gêneros para "manter o clima" */
  genresKeep: number[]
  /** Gêneros para "quero mudar o clima" */
  genresShift: number[]
  /** Dica enviada à IA */
  promptHint: string
  sadness: Sadness
  /** Chance (0 a 1) de sugerir cinema */
  cinemaWeight: number
  /** Matiz HSL do gradiente de fundo */
  hue: number
}

export const MOODS = [
  {
    id: 'devastated',
    label: 'Arrasado',
    emoji: '1f62d',
    genresKeep: [G.drama, G.romance, G.family],
    genresShift: [G.comedy, G.animation, G.family, G.adventure],
    promptHint: 'muito triste, precisa de acolhimento',
    sadness: 2,
    cinemaWeight: 1,
    hue: 225,
  },
  {
    id: 'sad',
    label: 'Triste',
    emoji: '1f622',
    genresKeep: [G.drama, G.romance, G.music],
    genresShift: [G.comedy, G.animation, G.family, G.adventure],
    promptHint: 'triste',
    sadness: 1,
    cinemaWeight: 0.4,
    hue: 215,
  },
  {
    id: 'anxious',
    label: 'Ansioso',
    emoji: '1f630',
    genresKeep: [G.thriller, G.mystery, G.crime, G.drama],
    genresShift: [G.comedy, G.animation, G.family, G.fantasy],
    promptHint: 'ansioso, mente acelerada',
    sadness: 1,
    cinemaWeight: 0.12,
    hue: 190,
  },
  {
    id: 'stressed',
    label: 'Estressado',
    emoji: '1f624',
    genresKeep: [G.action, G.crime, G.thriller],
    genresShift: [G.comedy, G.animation, G.music, G.family],
    promptHint: 'estressado, com a cabeça cheia',
    sadness: 0,
    cinemaWeight: 0.12,
    hue: 8,
  },
  {
    id: 'tired',
    label: 'Cansado',
    emoji: '1f634',
    genresKeep: [G.comedy, G.family, G.animation],
    genresShift: [G.adventure, G.action, G.comedy],
    promptHint: 'cansado, quer algo leve e fácil de acompanhar',
    sadness: 0,
    cinemaWeight: 0.1,
    hue: 250,
  },
  {
    id: 'bored',
    label: 'Entediado',
    emoji: '1f610',
    genresKeep: [G.comedy, G.adventure, G.scifi, G.mystery],
    genresShift: [G.action, G.thriller, G.scifi, G.fantasy, G.adventure],
    promptHint: 'entediado, quer algo que prenda a atenção',
    sadness: 0,
    cinemaWeight: 0.3,
    hue: 160,
  },
  {
    id: 'lonely',
    label: 'Solitário',
    emoji: '1f97a',
    genresKeep: [G.drama, G.romance, G.family],
    genresShift: [G.comedy, G.romance, G.family, G.animation],
    promptHint: 'solitário, quer companhia e calor humano',
    sadness: 1,
    cinemaWeight: 0.35,
    hue: 270,
  },
  {
    id: 'normal',
    label: 'Normal',
    emoji: '1f642',
    genresKeep: [G.comedy, G.drama, G.adventure, G.scifi],
    genresShift: [G.adventure, G.fantasy, G.scifi, G.comedy],
    promptHint: 'num dia comum, aberto a qualquer coisa boa',
    sadness: 0,
    cinemaWeight: 0.12,
    hue: 210,
  },
  {
    id: 'happy',
    label: 'Feliz',
    emoji: '1f604',
    genresKeep: [G.comedy, G.animation, G.family, G.music, G.adventure],
    genresShift: [G.drama, G.thriller, G.mystery, G.scifi],
    promptHint: 'feliz e animado',
    sadness: 0,
    cinemaWeight: 0.15,
    hue: 45,
  },
  {
    id: 'inlove',
    label: 'Apaixonado',
    emoji: '1f970',
    genresKeep: [G.romance, G.comedy, G.music],
    genresShift: [G.adventure, G.comedy, G.fantasy, G.action],
    promptHint: 'apaixonado, coração leve',
    sadness: 0,
    cinemaWeight: 0.15,
    hue: 335,
  },
  {
    id: 'nostalgic',
    label: 'Nostálgico',
    emoji: '1f979',
    genresKeep: [G.family, G.adventure, G.fantasy, G.animation, G.history],
    genresShift: [G.scifi, G.action, G.thriller],
    promptHint: 'nostálgico, com saudade de outros tempos',
    sadness: 0,
    cinemaWeight: 0.1,
    hue: 30,
  },
  {
    id: 'reflective',
    label: 'Reflexivo',
    emoji: '1f914',
    genresKeep: [G.drama, G.documentary, G.history, G.scifi, G.mystery],
    genresShift: [G.comedy, G.adventure, G.animation],
    promptHint: 'reflexivo, quer pensar sobre a vida',
    sadness: 0,
    cinemaWeight: 0.15,
    hue: 200,
  },
  {
    id: 'adventurous',
    label: 'Aventureiro',
    emoji: '1f920',
    genresKeep: [G.adventure, G.action, G.fantasy, G.western],
    genresShift: [G.drama, G.mystery, G.comedy],
    promptHint: 'aventureiro, com vontade de explorar',
    sadness: 0,
    cinemaWeight: 0.3,
    hue: 25,
  },
  {
    id: 'thrill',
    label: 'Querendo um susto',
    emoji: '1f631',
    genresKeep: [G.horror, G.thriller, G.mystery],
    genresShift: [G.horror, G.thriller, G.mystery],
    promptHint: 'quer sentir medo e tensão de forma divertida',
    sadness: 0,
    cinemaWeight: 0.2,
    hue: 355,
  },
  {
    id: 'extraordinary',
    label: 'Extraordinário',
    emoji: '1f929',
    genresKeep: [G.adventure, G.family, G.fantasy, G.action, G.comedy],
    genresShift: [G.adventure, G.fantasy, G.action, G.scifi],
    promptHint: 'no auge, empolgado',
    sadness: 0,
    cinemaWeight: 0.2,
    hue: 290,
  },
] as const satisfies readonly Mood[]

export type MoodId = (typeof MOODS)[number]['id']

export const MOOD_IDS = MOODS.map((m) => m.id) as [MoodId, ...MoodId[]]
export const moodIdSchema = z.enum(MOOD_IDS)

export function getMood(id: string): Mood {
  return (MOODS as readonly Mood[]).find((m) => m.id === id) ?? MOODS[7]
}
