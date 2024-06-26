import { NextRequest, NextResponse } from 'next/server'

interface IMovieResponse {
  runtime: number
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  const url = `https://api.themoviedb.org/3/movie/${params.id}?language=pt-BR`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmVjZWE1NzJkNDZmMmIzNDY1NWVmMmExNjAzZjBmZSIsIm5iZiI6MTcxOTI4MjcwMC44MjM0MDQsInN1YiI6IjVkMGVhNGZlYzNhMzY4MGE2ZjIxMzFiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dlanSIMsJ-OWAp0O2Yr8ZO8nzdhR4e_XLSHCS9c1dPs',
    },
  }

  try {
    const movieResponse = await fetch(url, options)

    const movieData = (await movieResponse.json()) as IMovieResponse

    const movieTime = movieData.runtime

    return NextResponse.json({ time: movieTime }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
