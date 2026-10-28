'use client'

import { Slider } from '@/components/ui/slider'
import { DURATION_STEP } from '@/config/recommend'
import { cn } from '@/lib/utils'
import { DURATION_RANGE, type DurationPreset, usePick } from '@/state/pick'

const PRESETS: { id: DurationPreset; title: string; hint: string }[] = [
  { id: 'short', title: 'Curtinho', hint: 'até 1h30' },
  { id: 'standard', title: 'Padrão', hint: '1h30 a 2h' },
  { id: 'long', title: 'Longo', hint: '2h ou mais' },
  { id: 'any', title: 'Tanto faz', hint: 'qualquer duração' },
  { id: 'custom', title: 'Personalizar', hint: 'mínimo e máximo' },
]

export const fmt = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? `${h}h${m ? String(m).padStart(2, '0') : ''}` : `${m}min`
}

export function DurationStep() {
  const { state, dispatch } = usePick()
  const { lo, hi, noMin, noMax } = state.custom

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Quanto tempo você tem?
        </h1>
        <p className="mt-1 text-white/60">Escolha a duração do filme.</p>
      </header>

      <div role="radiogroup" aria-label="Duração" className="grid grid-cols-2 gap-2.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            role="radio"
            aria-checked={state.preset === p.id}
            onClick={() => dispatch({ type: 'preset', preset: p.id })}
            className={cn(
              'flex min-h-16 flex-col items-start justify-center rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              p.id === 'any' && 'col-span-1',
              state.preset === p.id
                ? 'border-white/70 bg-white/15'
                : 'border-white/10 bg-white/5 hover:bg-white/10',
            )}
          >
            <span className="font-semibold">{p.title}</span>
            <span className="text-sm text-white/60">{p.hint}</span>
          </button>
        ))}
      </div>

      {state.preset === 'custom' && (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex justify-between text-sm">
            <span className={cn(noMin && 'text-white/40')}>
              Mínimo: <strong>{noMin ? 'sem mínimo' : fmt(lo)}</strong>
            </span>
            <span className={cn(noMax && 'text-white/40')}>
              Máximo: <strong>{noMax ? 'sem máximo' : fmt(hi)}</strong>
            </span>
          </div>
          <Slider
            min={DURATION_RANGE.min}
            max={DURATION_RANGE.max}
            step={DURATION_STEP}
            minStepsBetweenThumbs={1}
            value={[lo, hi]}
            thumbLabels={['Duração mínima', 'Duração máxima']}
            onValueChange={([a, b]) =>
              dispatch({ type: 'custom', custom: { lo: a, hi: b } })
            }
          />
          <div className="flex flex-wrap gap-4 text-sm">
            {(
              [
                ['noMin', 'Sem mínimo', noMin],
                ['noMax', 'Sem máximo', noMax],
              ] as const
            ).map(([key, label, checked]) => (
              <label key={key} className="flex min-h-12 items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    dispatch({ type: 'custom', custom: { [key]: e.target.checked } })
                  }
                  className="h-5 w-5 accent-white"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
