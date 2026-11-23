import type { MetadataRoute } from 'next'

import { MOOD_PAGES } from '@/content/moods'

const BASE = 'https://pick-one.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const paths = [
    '/',
    '/humores',
    ...MOOD_PAGES.map((page) => `/humor/${page.slug}`),
    '/sobre',
    '/privacidade',
    '/termos',
    '/contato',
  ]

  return paths.map((path) => ({
    url: path === '/' ? BASE : `${BASE}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : path.startsWith('/humor') ? 0.8 : 0.5,
  }))
}
