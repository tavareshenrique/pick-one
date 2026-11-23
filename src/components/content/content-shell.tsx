import Link from 'next/link'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site-footer'

export function ContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Pick One
          </Link>
          <Link
            href="/humores"
            className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Humores
          </Link>
        </div>
      </header>
      <main className="editorial mx-auto w-full max-w-2xl px-4 py-10">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

export function Paragraphs({ text }: { text: string }) {
  const parts = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className="flex flex-col gap-4 text-base leading-7 text-white/80">
      {parts.map((part) => (
        <p key={part.slice(0, 48)}>{part}</p>
      ))}
    </div>
  )
}
