export function movies() {
  async function GET({ feeling = 'happy' }) {
    const response = await fetch(
      `http://localhost:3000/api/movies?feeling=${feeling}`,
    )
    return response.json()
  }

  return { GET }
}
