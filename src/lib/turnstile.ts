interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  execute: (id: string) => void
  remove: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript() {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('turnstile'))
    document.head.appendChild(s)
  })
  return scriptPromise
}

/** Token do Turnstile invisível. Sem site key, devolve undefined. */
export async function getTurnstileToken(): Promise<string | undefined> {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!sitekey) return undefined
  try {
    await loadScript()
    return await new Promise<string | undefined>((resolve) => {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const done = (t?: string) => {
        if (id) window.turnstile?.remove(id)
        el.remove()
        resolve(t)
      }
      const timer = setTimeout(() => done(undefined), 8000)
      const id = window.turnstile!.render(el, {
        sitekey,
        size: 'invisible',
        execution: 'execute',
        callback: (t: string) => {
          clearTimeout(timer)
          done(t)
        },
        'error-callback': () => {
          clearTimeout(timer)
          done(undefined)
        },
      })
      window.turnstile!.execute(id)
    })
  } catch {
    return undefined
  }
}
