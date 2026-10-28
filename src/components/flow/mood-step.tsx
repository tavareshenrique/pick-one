'use client'

import { motion } from 'motion/react'

import { Emoji } from '@/components/emoji'
import { MOODS } from '@/config/moods'
import { MAX_TEXT_LENGTH } from '@/config/recommend'
import { cn } from '@/lib/utils'
import { usePick } from '@/state/pick'

export function MoodStep() {
  const { state, dispatch } = usePick()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Como você está agora?
        </h1>
        <p className="mt-1 text-white/60">Escolha o que mais se aproxima.</p>
      </header>

      <div
        role="radiogroup"
        aria-label="Humor"
        className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5"
      >
        {MOODS.map((m) => {
          const selected = state.mood === m.id
          return (
            <motion.button
              key={m.id}
              role="radio"
              aria-checked={selected}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'mood', mood: m.id })}
              className={cn(
                'flex min-h-[104px] flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-3 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                selected
                  ? 'border-white/70 bg-white/15'
                  : 'border-white/10 bg-white/5 hover:bg-white/10',
              )}
            >
              <Emoji code={m.emoji} size={48} />
              <span className="text-center leading-tight">{m.label}</span>
            </motion.button>
          )
        })}
      </div>

      {state.mood && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          <fieldset>
            <legend className="mb-2 text-sm text-white/60">
              O que você quer?
            </legend>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-1">
              {(
                [
                  ['keep', 'Manter o clima'],
                  ['shift', 'Quero mudar o clima'],
                ] as const
              ).map(([mode, label]) => (
                <button
                  key={mode}
                  aria-pressed={state.mode === mode}
                  onClick={() => dispatch({ type: 'mode', mode })}
                  className={cn(
                    'min-h-12 rounded-xl px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                    state.mode === mode
                      ? 'bg-white text-neutral-950'
                      : 'text-white/70',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/60">
              Quer contar mais? (opcional)
            </span>
            <textarea
              value={state.moodText}
              maxLength={MAX_TEXT_LENGTH}
              rows={3}
              onChange={(e) => dispatch({ type: 'text', text: e.target.value })}
              placeholder="Ex.: o dia foi longo e quero algo que me abrace"
              className="resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-base placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            />
            <span className="self-end text-xs text-white/40">
              {state.moodText.length}/{MAX_TEXT_LENGTH}
            </span>
          </label>
        </motion.div>
      )}
    </div>
  )
}
