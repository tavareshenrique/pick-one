import Link from 'next/link'

const LINKS = [
  { href: '/humores', label: 'Humores' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/privacidade', label: 'Privacidade' },
  { href: '/termos', label: 'Termos' },
  { href: '/contato', label: 'Contato' },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <nav
        aria-label="Institucional"
        className="mx-auto flex max-w-2xl flex-wrap gap-x-5 gap-y-2 px-4 py-8 text-sm text-white/60"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
