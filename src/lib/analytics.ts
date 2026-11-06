import type { AnalyticsMovie } from '@/lib/analytics-movie'

export const FLOW_STEPS = ['Humor', 'Clima', 'Duração', 'Resultado'] as const
export type FlowStep = (typeof FLOW_STEPS)[number]
type ContinueStep = Exclude<FlowStep, 'Resultado'>

type AnalyticsEvent =
  | { name: 'mood_select'; props: { id: string } }
  | { name: 'step_continue'; props: { step: ContinueStep } }
  | { name: 'back'; props: { from: FlowStep; to: FlowStep } }
  | { name: 'movie_shown'; props: { movie: AnalyticsMovie } }
  | { name: 'another'; props: { movieId: number } }
  | { name: 'share'; props: { movieId: number; via: 'share' | 'clipboard' } }
  | { name: 'trailer'; props: { movieId: number } }
  | {
      name: 'provider'
      props: { movieId: number; kind: 'streaming' | 'rent'; name: string }
    }
  | {
      name: 'cinema'
      props: { action: 'sessions' | 'stay'; movieId: number; title: string }
    }
  | { name: 'restart'; props: { from: 'result' | 'error' } }
  | { name: 'recommend_error'; props: { status: string } }

/** Vale só nesta aba. Recarregar gera outro. */
let visitId: string | undefined

export function getVisitId() {
  visitId ??= crypto.randomUUID()
  return visitId
}

/** Não bloqueia a tela. Falha some sem aviso. */
export function track(event: AnalyticsEvent) {
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        visitId: getVisitId(),
        name: event.name,
        props: event.props,
      }),
    }).catch(() => {})
  } catch {
    // analytics nunca interrompe o fluxo
  }
}
