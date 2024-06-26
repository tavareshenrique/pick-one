export function movies() {
  async function GET({ feeling = 'happy' }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feeling=${feeling}`,
    )
    return response.json()
  }

  return { GET }
}
