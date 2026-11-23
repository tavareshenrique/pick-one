import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ContentShell, Paragraphs } from '@/components/content/content-shell'
import { Emoji } from '@/components/emoji'
import { getMood } from '@/config/moods'
import { getMoodPage, MOOD_PAGES, type MoodPick } from '@/content/moods'
import { IMG, tmdb } from '@/server/tmdb'

export const revalidate = 86400
export const dynamicParams = false

interface TmdbLite {
  title: string
  runtime: number | null
  poster_path: string | null
  release_date?: string
}

interface LoadedPick {
  pick: MoodPick
  title: string | null
  year: number | null
  runtime: number | null
  poster: string | null
}

function formatRuntime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? `${h}h${m ? String(m).padStart(2, '0') : ''}` : `${m}min`
}

function releaseYear(date: string | undefined) {
  if (!date) return null
  const year = Number(date.slice(0, 4))
  return Number.isInteger(year) ? year : null
}

async function loadPick(pick: MoodPick): Promise<LoadedPick> {
  try {
    const movie = await tmdb<TmdbLite>(`/movie/${pick.tmdbId}`, {}, revalidate)
    return {
      pick,
      title: movie.title,
      year: releaseYear(movie.release_date),
      runtime: movie.runtime || null,
      poster: IMG.poster(movie.poster_path),
    }
  } catch {
    return { pick, title: null, year: null, runtime: null, poster: null }
  }
}

export function generateStaticParams() {
  return MOOD_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getMoodPage(slug)
  if (!page) return {}
  const path = `/humor/${page.slug}`
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
    },
  }
}

export default async function HumorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getMoodPage(slug)
  if (!page) notFound()

  const mood = getMood(page.id)
  const picks = await Promise.all(page.picks.map(loadPick))

  return (
    <ContentShell>
      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <p className="flex items-center gap-3 text-sm text-white/70">
            <Emoji code={mood.emoji} size={40} />
            <span>{mood.label}</span>
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight">
            {page.title}
          </h1>
        </header>

        <Paragraphs text={page.intro} />

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold">
            Filmes que costumam servir
          </h2>
          <ul className="flex flex-col gap-4">
            {picks.map((item) => (
              <li
                key={item.pick.tmdbId}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.title ? `Pôster de ${item.title}` : ''}
                    width={96}
                    height={144}
                    className="h-36 w-24 shrink-0 rounded-lg object-cover"
                  />
                ) : null}
                <div className="flex min-w-0 flex-col gap-2">
                  {item.title ? (
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.year || item.runtime ? (
                    <p className="text-sm text-white/60">
                      {[
                        item.year,
                        item.runtime ? formatRuntime(item.runtime) : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  ) : null}
                  <p className="text-sm leading-6 text-white/80">
                    {item.pick.why}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href={`/?humor=${page.slug}`}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-6 text-center text-base font-semibold text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          Quero um filme para esse humor
        </Link>
      </article>
    </ContentShell>
  )
}
