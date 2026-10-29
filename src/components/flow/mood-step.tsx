'use client'

import { motion } from 'motion/react'

import { Emoji } from '@/components/emoji'
import { MOODS } from '@/config/moods'
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
    </div>
  )
}
