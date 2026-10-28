const KEY = 'pickone:history'
const MAX = 60

export function getHistory(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.filter((n) => typeof n === 'number') : []
  } catch {
    return []
  }
}

export function addToHistory(id: number) {
  try {
    const next = [id, ...getHistory().filter((i) => i !== id)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {}
}
