'use client'

import { useEffect, useRef, useState } from 'react'

import { getAdsenseClient, getAdsenseSlot } from '@/lib/adsense'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
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

    if (!ins.getAttribute('data-adsbygoogle-status')) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
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
