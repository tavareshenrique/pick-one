import './globals.css'

import type { Metadata, Viewport } from 'next'
// eslint-disable-next-line camelcase
import { Bricolage_Grotesque, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Pick One',
  description:
    'Me fala o que sente, me fala o que quer sentir, e eu te recomendo um filme baseado nisso.',
  applicationName: 'Pick One',
  appleWebApp: {
    capable: true,
    title: 'Pick One',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${display.variable} bg-neutral-950 font-sans text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
