import type { Metadata } from 'next'
import Link from 'next/link'

import { ContentShell } from '@/components/content/content-shell'
import { Emoji } from '@/components/emoji'
import { MOODS } from '@/config/moods'
import { getMoodPageById } from '@/content/moods'

export const metadata: Metadata = {
  title: 'Humores',
  description:
    'Quinze humores, cada um com um texto e uma lista de filmes. Escolhe o que mais se aproxima de agora.',
  alternates: { canonical: '/humores' },
  openGraph: {
    title: 'Humores',
    description:
      'Quinze humores, cada um com um texto e uma lista de filmes. Escolhe o que mais se aproxima de agora.',
    url: '/humores',
  },
}

export default function HumoresPage() {
  const moods = MOODS.map((mood) => {
    const page = getMoodPageById(mood.id)
    if (!page) throw new Error(`página ausente para ${mood.id}`)
    return { mood, page }
  })

  return (
    <ContentShell>
      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Humores
          </h1>
          <p className="text-base leading-7 text-white/80">
            O Pick One começa por aqui: como você está, não qual gênero você
            acha que deveria querer. Cada humor abaixo tem uma página com texto
            próprio e filmes escolhidos para esse estado, com o motivo ao lado.
            Se preferir que o site indique um só, entre no humor e peça o filme.
          </p>
        </header>
        <ul className="flex flex-col gap-3">
          {moods.map(({ mood, page }) => (
            <li key={mood.id}>
              <Link
                href={`/humor/${page.slug}`}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Emoji code={mood.emoji} size={48} />
                <span className="flex flex-col gap-1">
                  <span className="font-display text-lg font-bold">
                    {mood.label}
                  </span>
                  <span className="text-sm leading-6 text-white/70">
                    {page.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </ContentShell>
  )
}
