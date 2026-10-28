'use client'

import { createContext, type ReactNode, useContext, useMemo, useReducer } from 'react'

import { DURATION_MAX, DURATION_MIN } from '@/config/recommend'
import type { MoodId } from '@/config/moods'

export type Step = 0 | 1 | 2
export type DurationPreset = 'short' | 'standard' | 'long' | 'any' | 'custom'

export interface Duration {
  min?: number
  max?: number
}

export interface PickState {
  step: Step
  mood: MoodId | null
  mode: 'keep' | 'shift'
  moodText: string
  preset: DurationPreset
  custom: { lo: number; hi: number; noMin: boolean; noMax: boolean }
  /** incrementa a cada novo pedido de resultado */
  run: number
}

type Action =
  | { type: 'mood'; mood: MoodId }
  | { type: 'mode'; mode: 'keep' | 'shift' }
  | { type: 'text'; text: string }
  | { type: 'preset'; preset: DurationPreset }
  | { type: 'custom'; custom: Partial<PickState['custom']> }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }

const initial: PickState = {
  step: 0,
  mood: null,
  mode: 'keep',
  moodText: '',
  preset: 'any',
  custom: { lo: 90, hi: 150, noMin: false, noMax: false },
  run: 0,
}

function reducer(s: PickState, a: Action): PickState {
  switch (a.type) {
    case 'mood':
      return { ...s, mood: a.mood }
    case 'mode':
      return { ...s, mode: a.mode }
    case 'text':
      return { ...s, moodText: a.text }
    case 'preset':
      return { ...s, preset: a.preset }
    case 'custom':
      return { ...s, preset: 'custom', custom: { ...s.custom, ...a.custom } }
    case 'next':
      return { ...s, step: Math.min(2, s.step + 1) as Step, run: s.step === 1 ? s.run + 1 : s.run }
    case 'back':
      return { ...s, step: Math.max(0, s.step - 1) as Step }
    case 'reset':
      return { ...initial, run: s.run }
  }
}

export function getDuration(s: PickState): Duration {
  switch (s.preset) {
    case 'short':
      return { max: 90 }
    case 'standard':
      return { min: 90, max: 120 }
    case 'long':
      return { min: 120 }
    case 'any':
      return {}
    case 'custom':
      return {
        min: s.custom.noMin ? undefined : s.custom.lo,
        max: s.custom.noMax ? undefined : s.custom.hi,
      }
  }
}

export const DURATION_RANGE = { min: DURATION_MIN, max: DURATION_MAX }

const Ctx = createContext<{ state: PickState; dispatch: (a: Action) => void } | null>(null)

export function PickProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePick() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePick fora do PickProvider')
  return ctx
}
