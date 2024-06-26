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
      Authorization: process.env.TMDB_TOKEN!,
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
