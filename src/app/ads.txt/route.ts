import { getAdsenseClient, toAdsensePublisherId } from '@/lib/adsense'

export function GET() {
  const client = getAdsenseClient()
  if (!client) return new Response('Not found', { status: 404 })

  const body = `google.com, ${toAdsensePublisherId(client)}, DIRECT, f08c47fec0942fa0\n`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
