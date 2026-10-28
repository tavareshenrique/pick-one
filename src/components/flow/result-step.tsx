'use client'

import {
  Clock,
  Play,
  RotateCcw,
  Share2,
  Shuffle,
  Sparkles,
  Star,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getMood } from '@/config/moods'
import { addToHistory, getHistory } from '@/lib/history'
import { pickNext } from '@/lib/pick-next'
import { getTurnstileToken } from '@/lib/turnstile'
import type { MovieResult, RecommendResponse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { getDuration, usePick } from '@/state/pick'

import { fmt } from './duration-step'

const LoadingAnimation = dynamic(() => import('./loading-animation'), {
  ssr: false,
  loading: () => <div className="h-52 w-52" />,
})

type Status = 'loading' | 'error' | 'ready'

export function ResultStep() {
  const { state, dispatch } = usePick()
  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<RecommendResponse | null>(null)
  const [movie, setMovie] = useState<MovieResult | null>(null)
  const [cinemaDismissed, setCinemaDismissed] = useState(false)
  const shown = useRef<Set<number>>(new Set())
  const history = useRef<Set<number>>(new Set())

  const show = useCallback((m: MovieResult) => {
    shown.current.add(m.id)
    addToHistory(m.id)
    setMovie(m)
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    setStatus('loading')
    setCinemaDismissed(false)
    shown.current = new Set()
    const past = getHistory()
    history.current = new Set(past)
    ;(async () => {
      try {
        const turnstileToken = await getTurnstileToken()
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: ctrl.signal,
          body: JSON.stringify({
            mood: state.mood,
            mode: state.mode,
            text: state.moodText.trim() || undefined,
            duration: getDuration(state),
            turnstileToken,
            exclude: past.slice(0, 30),
          }),
        })
        if (!res.ok) throw new Error(String(res.status))
        const json = (await res.json()) as RecommendResponse
        setData(json)
        const first = pickNext(
          json.movies,
          shown.current,
          history.current,
          null,
        )
        if (!first) throw new Error('vazio')
        show(first)
        setStatus('ready')
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setStatus('error')
      }
    })()
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.run])

  function another() {
    if (!data || !movie) return
    const next = pickNext(
      data.movies,
      shown.current,
      history.current,
      movie.recent,
    )
    if (next) show(next)
  }

  async function share() {
    if (!movie) return
    const payload = {
      title: 'Pick One',
      text: `O Pick One me indicou "${movie.title}"!`,
      url: window.location.origin,
    }
    try {
      if (navigator.share) await navigator.share(payload)
      else await navigator.clipboard.writeText(`${payload.text} ${payload.url}`)
    } catch {}
  }

  if (status === 'loading') return <Loading />
  if (status === 'error' || !data || !movie) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-5xl">🎞️</p>
        <h1 className="font-display text-2xl font-bold">
          Não deu certo desta vez
        </h1>
        <p className="text-white/60">
          Não encontramos um filme agora. Tente de novo ou mude a duração.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: 'back' })}
            className="min-h-12 rounded-full bg-white/10 px-5"
          >
            Voltar
          </button>
          <button
            onClick={() => dispatch({ type: 'reset' })}
            className="min-h-12 rounded-full bg-white px-5 font-semibold text-neutral-950"
          >
            Recomeçar
          </button>
        </div>
      </div>
    )
  }

  const mood = state.mood ? getMood(state.mood) : null

  return (
    <div className="flex flex-col gap-5 pb-4">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">
          {data.source === 'ai' ? '✨ Escolhido por IA' : 'Seleção automática'}
        </span>
        {mood && <span className="text-white/50">{mood.label}</span>}
      </div>

      {data.message && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/10 p-4 text-base leading-relaxed"
        >
          {data.message}
        </motion.p>
      )}

      {data.cinema && !cinemaDismissed && (
        <CinemaCard
          movie={data.cinema}
          onDismiss={() => setCinemaDismissed(true)}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.article
          key={movie.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          {movie.backdrop && (
            <Image
              src={movie.backdrop}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="scale-125 object-cover opacity-40 blur-2xl"
              priority
            />
          )}
          <div className="relative flex flex-col gap-4 p-4">
            <p className="text-sm text-white/70">O filme de hoje é…</p>
            <div className="flex gap-4">
              {movie.poster && (
                <Image
                  src={movie.poster}
                  alt={`Pôster de ${movie.title}`}
                  width={160}
                  height={240}
                  priority
                  className="h-auto w-32 shrink-0 self-start rounded-xl shadow-2xl sm:w-40"
                />
              )}
              <div className="flex min-w-0 flex-col gap-2">
                <h1 className="font-display text-2xl font-bold leading-tight">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
                  {movie.year && <span>{movie.year}</span>}
                  {movie.runtime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />{' '}
                      {fmt(movie.runtime)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                      aria-hidden
                    />
                    {movie.rating.toFixed(1)}
                  </span>
                </div>
                {movie.nowPlaying && (
                  <span className="w-fit rounded-full bg-white/15 px-2 py-0.5 text-xs">
                    Em cartaz
                  </span>
                )}
              </div>
            </div>

            {movie.reason && (
              <div className="rounded-2xl bg-white/10 p-3 text-sm">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                  <Sparkles className="h-3 w-3" aria-hidden /> Por que esse
                  filme
                </p>
                {movie.reason}
              </div>
            )}

            <p className="text-sm leading-relaxed text-white/80">
              {movie.overview}
            </p>

            <Providers movie={movie} />
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2.5">
        <Action
          onClick={another}
          icon={<Shuffle className="h-4 w-4" />}
          primary
        >
          Outro filme
        </Action>
        <Action
          onClick={() => dispatch({ type: 'reset' })}
          icon={<RotateCcw className="h-4 w-4" />}
        >
          Recomeçar
        </Action>
        <Action onClick={share} icon={<Share2 className="h-4 w-4" />}>
          Compartilhar
        </Action>
        {movie.trailer ? (
          <a
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Play className="h-4 w-4" /> Trailer
          </a>
        ) : (
          <span />
        )}
      </div>

      {data.showCvv && (
        <p className="text-center text-xs text-white/50">
          Se estiver pesado demais, conversar ajuda: CVV 188, 24h, gratuito.
        </p>
      )}
    </div>
  )
}

function Action({
  children,
  onClick,
  icon,
  primary,
}: {
  children?: React.ReactNode
  onClick: () => void
  icon?: React.ReactNode
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
        primary ? 'bg-white font-semibold text-neutral-950' : 'bg-white/10',
      )}
    >
      {icon}
      {children}
    </button>
  )
}

function Providers({ movie }: { movie: MovieResult }) {
  const [tab, setTab] = useState<'streaming' | 'rent'>('streaming')
  const list = movie.providers[tab]
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold">Onde assistir</h2>
      <div
        role="tablist"
        className="flex gap-1 rounded-full bg-black/30 p-1 text-sm"
      >
        {(
          [
            ['streaming', 'Streaming'],
            ['rent', 'Aluguel'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              'min-h-10 flex-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              tab === id ? 'bg-white text-neutral-950' : 'text-white/70',
            )}
          >
            {label} ({movie.providers[id].length})
          </button>
        ))}
      </div>
      {list.length ? (
        <ul className="flex flex-wrap gap-3">
          {list.map((p) => (
            <li key={p.id}>
              <Image
                src={p.icon}
                alt={p.name}
                title={p.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/50">
          Sem opções de {tab === 'streaming' ? 'streaming' : 'aluguel'} no
          Brasil.
        </p>
      )}
    </div>
  )
}

function CinemaCard({
  movie,
  onDismiss,
}: {
  movie: MovieResult
  onDismiss: () => void
}) {
  const q = encodeURIComponent(`${movie.title} cinema perto de mim`)
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-3"
    >
      {movie.poster && (
        <Image
          src={movie.poster}
          alt=""
          width={72}
          height={108}
          className="h-[108px] w-[72px] shrink-0 rounded-lg"
        />
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="font-display text-lg font-bold leading-tight">
          Que tal sair um pouquinho?
        </h2>
        <p className="text-sm text-white/70">
          <strong>{movie.title}</strong> está em cartaz.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.google.com/search?q=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center rounded-full bg-white px-4 text-sm font-semibold text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Ver sessões
          </a>
          <button
            onClick={onDismiss}
            className="min-h-12 rounded-full bg-white/10 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Prefiro ficar em casa
          </button>
        </div>
      </div>
    </motion.section>
  )
}

function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-6 py-10"
    >
      <LoadingAnimation />
      <p className="font-display text-lg font-semibold">
        Buscando a melhor opção pra você…
      </p>
      <div className="w-full animate-pulse space-y-3" aria-hidden>
        <div className="flex gap-4 rounded-3xl bg-white/5 p-4">
          <div className="h-48 w-32 rounded-xl bg-white/10" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
