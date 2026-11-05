const CLIENT_RE = /^ca-pub-\d+$/

/** `ca-pub-…` válido, ou nada. Id malformado não entra no HTML. */
export function getAdsenseClient() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim()
  if (!client || !CLIENT_RE.test(client)) return undefined
  return client
}

export function getAdsenseSlot() {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim()
  if (!slot) return undefined
  return slot
}

/** `ca-pub-123` → `pub-123`, o id que o ads.txt publica. */
export function toAdsensePublisherId(client: string) {
  return client.slice(3)
}
