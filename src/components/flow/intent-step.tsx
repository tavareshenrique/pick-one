'use client'

import { MAX_TEXT_LENGTH } from '@/config/recommend'
import { cn } from '@/lib/utils'
import { usePick } from '@/state/pick'

export function IntentStep() {
  const { state, dispatch } = usePick()

  return (
    <div className="flex flex-col gap-5">
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
    </div>
  )
}
