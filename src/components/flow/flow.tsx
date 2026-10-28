'use client'

import { ArrowLeft } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { getMood } from '@/config/moods'
import { usePick } from '@/state/pick'

import { DurationStep } from './duration-step'
import { MoodStep } from './mood-step'
import { ResultStep } from './result-step'

const LABELS = ['Humor', 'Duração', 'Resultado']

export function Flow() {
  const { state, dispatch } = usePick()
  const { step } = state
  const hue = state.mood ? getMood(state.mood).hue : 220

  const canAdvance = step === 0 ? !!state.mood : true

  return (
    <div
      className="mood-bg flex min-h-dvh flex-col"
      style={{ '--mood': `${hue} 80% 60%` } as React.CSSProperties}
    >
      <header className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <button
          onClick={() => dispatch({ type: 'back' })}
          aria-label="Voltar"
          disabled={step === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:invisible"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div
          className="flex flex-1 gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
          aria-valuetext={`Etapa ${step + 1} de 3: ${LABELS[step]}`}
        >
          {LABELS.map((l, i) => (
            <div key={l} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>
        <span className="w-12 text-right font-display text-sm text-white/60">
          {step + 1}/3
        </span>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-6 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <MoodStep />}
            {step === 1 && <DurationStep />}
            {step === 2 && <ResultStep />}
          </motion.div>
        </AnimatePresence>
      </main>

      {step < 2 && (
        <footer className="sticky bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <button
            disabled={!canAdvance}
            onClick={() => dispatch({ type: 'next' })}
            className="mx-auto block min-h-14 w-full max-w-2xl rounded-full bg-white text-base font-semibold text-neutral-950 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-40"
          >
            {step === 0 ? 'Continuar' : 'Indicar um filme'}
          </button>
        </footer>
      )}
    </div>
  )
}
