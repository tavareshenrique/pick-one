'use client'

import { useEffect, useRef, useState } from 'react'

import { getAdsenseClient, getAdsenseSlot } from '@/lib/adsense'

const ADSENSE_SCRIPT =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

type AdsByGoogle = unknown[] & {
  requestNonPersonalizedAds?: number
}

declare global {
  interface Window {
    adsbygoogle?: AdsByGoogle
  }
}

/** A flag tem de existir antes do script executar. O `push` entra na fila depois. */
function armAdsense(client: string) {
  const ads: AdsByGoogle = (window.adsbygoogle = window.adsbygoogle || [])
  ads.requestNonPersonalizedAds = 1

  if (document.querySelector(`script[src^="${ADSENSE_SCRIPT}"]`)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `${ADSENSE_SCRIPT}?client=${client}`
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

export function AdSlot() {
  const client = getAdsenseClient()
  const slot = getAdsenseSlot()
  const insRef = useRef<HTMLModElement>(null)
  const [unfilled, setUnfilled] = useState(false)

  useEffect(() => {
    const ins = insRef.current
    if (!ins || !client || !slot) return

    const hideIfUnfilled = () => {
      if (ins.getAttribute('data-ad-status') === 'unfilled') setUnfilled(true)
    }
    const observer = new MutationObserver(hideIfUnfilled)
    observer.observe(ins, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    })

    armAdsense(client)

    if (!ins.getAttribute('data-adsbygoogle-status')) {
      try {
        window.adsbygoogle?.push({})
      } catch {}
    }

    hideIfUnfilled()
    return () => observer.disconnect()
  }, [client, slot])

  if (!client || !slot || unfilled) return null

  return (
    <aside className="flex w-full flex-col gap-1.5">
      <p className="text-xs text-white/40">Publicidade</p>
      <div className="min-h-[100px] w-full">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: 90 }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  )
}
