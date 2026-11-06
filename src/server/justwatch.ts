import { cached } from './cache'

const ENDPOINT = 'https://apis.justwatch.com/graphql'
const TIMEOUT_MS = 6000
const LINKS_TTL_SECONDS = 60 * 60 * 24
const YEAR_TOLERANCE = 1

const QUERY = `query($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {
  popularTitles(country: $country, first: $first, filter: $filter) {
    edges {
      node {
        objectType
        content(country: $country, language: $language) {
          title
          originalReleaseYear
          externalIds { tmdbId }
        }
        offers(country: $country, platform: WEB) {
          standardWebURL
          package { packageId }
        }
      }
    }
  }
}`

interface JwOffer {
  standardWebURL?: string | null
  package?: { packageId?: number | null } | null
}

interface JwNode {
  objectType?: string
  content?: {
    title?: string | null
    originalReleaseYear?: number | null
    externalIds?: { tmdbId?: string | number | null } | null
  } | null
  offers?: JwOffer[] | null
}

interface JwResponse {
  data?: {
    popularTitles?: { edges?: { node?: JwNode | null }[] | null } | null
  }
}

export interface StreamingLinkQuery {
  id: number
  title: string
  originalTitle: string | null
  year: number | null
}

/**
 * Mapa providerId → URL da ficha. A API GraphQL do JustWatch não é a de
 * parceiros: rede, timeout ou título sem o ano devolvem {} e esse vazio
 * também fica no cache, para não repetir a busca a cada recomendação.
 */
export async function getStreamingLinks(
  movie: StreamingLinkQuery,
): Promise<Record<string, string>> {
  try {
    const links = await cached(`jw:links:${movie.id}`, LINKS_TTL_SECONDS, () =>
      loadLinks(movie),
    )
    return onlyHttps(links)
  } catch {
    return {}
  }
}

async function loadLinks(
  movie: StreamingLinkQuery,
): Promise<Record<string, string>> {
  try {
    const found = await findTitle(movie.title, movie.year, movie.id)
    if (found) return toLinkMap(found)
    const original = otherTitle(movie.originalTitle, movie.title)
    if (!original) return {}
    const fallback = await findTitle(original, movie.year, movie.id)
    return fallback ? toLinkMap(fallback) : {}
  } catch {
    return {}
  }
}

async function findTitle(
  title: string,
  year: number | null,
  tmdbId: number,
): Promise<JwNode | null> {
  const query = title.trim()
  if (!query || year == null) return null
  const nodes = await search(query, year)
  return pickTitle(nodes, query, year, tmdbId)
}

/**
 * O nome no JustWatch nem sempre é o do TMDB ("Zootrópolis" / "Zootopia").
 * O tmdbId fecha o filme. Sem esse id, exige o mesmo título e o ano.
 */
function pickTitle(
  nodes: JwNode[],
  query: string,
  year: number,
  tmdbId: number,
): JwNode | null {
  const byId = nodes.find(
    (node) =>
      node.objectType === 'MOVIE' &&
      sameTmdbId(node.content?.externalIds?.tmdbId, tmdbId),
  )
  if (byId) return byId

  let best: { node: JwNode; rank: number } | null = null
  for (const node of nodes) {
    if (node.objectType !== 'MOVIE') continue
    const release = node.content?.originalReleaseYear
    const name = node.content?.title
    if (typeof release !== 'number' || !name) continue
    const distance = Math.abs(release - year)
    if (distance > YEAR_TOLERANCE) continue
    const score = titleScore(query, name)
    if (score === 0) continue
    const rank = score * 10 - distance
    if (!best || rank > best.rank) best = { node, rank }
  }
  return best?.node ?? null
}

function sameTmdbId(value: string | number | null | undefined, tmdbId: number) {
  return value != null && String(value) === String(tmdbId)
}

function titleScore(query: string, title: string): number {
  const wanted = tokens(query)
  const found = tokens(title)
  if (!wanted.length || !found.length) return 0
  if (wanted.join(' ') === found.join(' ')) return 3
  if (hasSequence(found, wanted)) return 2
  return 0
}

function tokens(value: string): string[] {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function hasSequence(haystack: string[], needle: string[]): boolean {
  if (!needle.length || needle.length > haystack.length) return false
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((token, offset) => haystack[i + offset] === token)) {
      return true
    }
  }
  return false
}

function otherTitle(original: string | null, title: string): string | null {
  const next = original?.trim()
  if (!next) return null
  const same =
    next.localeCompare(title.trim(), 'pt-BR', { sensitivity: 'accent' }) === 0
  return same ? null : next
}

async function search(title: string, year: number): Promise<JwNode[]> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        country: 'BR',
        language: 'pt',
        first: 5,
        filter: {
          searchQuery: title,
          objectTypes: ['MOVIE'],
          releaseYear: {
            min: year - YEAR_TOLERANCE,
            max: year + YEAR_TOLERANCE,
          },
        },
      },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`JustWatch ${res.status}`)
  const json = (await res.json()) as JwResponse
  return (json.data?.popularTitles?.edges ?? []).flatMap((edge) =>
    edge.node ? [edge.node] : [],
  )
}

function toLinkMap(node: JwNode): Record<string, string> {
  const links: Record<string, string> = {}
  for (const offer of node.offers ?? []) {
    const id = offer.package?.packageId
    const url = offer.standardWebURL
    if (typeof id !== 'number' || !url || links[String(id)]) continue
    if (!isHttps(url)) continue
    links[String(id)] = url
  }
  return links
}

function onlyHttps(links: unknown): Record<string, string> {
  if (!links || typeof links !== 'object') return {}
  const safe: Record<string, string> = {}
  for (const [id, url] of Object.entries(links)) {
    if (typeof url === 'string' && isHttps(url)) safe[id] = url
  }
  return safe
}

function isHttps(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}
