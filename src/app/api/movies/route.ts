import { NextRequest, NextResponse } from 'next/server'

type TGenre = {
  id: number
  name: string
}

export interface IGenreResponse {
  genres: TGenre[]
}

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  try {
    const searchParams = req.nextUrl.searchParams

    const feeling = searchParams.get('feeling')

    const internalGenreResponse = await fetch(
      `http://localhost:3000/api/movies/genre?feeling=${feeling}`,
    )

    const internalGenresData =
      (await internalGenreResponse.json()) as IGenreResponse

    const genresIds = internalGenresData.map((genre) => genre).join(',')

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${genresIds}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmVjZWE1NzJkNDZmMmIzNDY1NWVmMmExNjAzZjBmZSIsIm5iZiI6MTcxOTI4MjcwMC44MjM0MDQsInN1YiI6IjVkMGVhNGZlYzNhMzY4MGE2ZjIxMzFiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dlanSIMsJ-OWAp0O2Yr8ZO8nzdhR4e_XLSHCS9c1dPs',
      },
    }

    const moviesResponse = await fetch(url, options)

    const movies = (await moviesResponse.json()) as IGenreResponse

    return NextResponse.json(
      movies,

      { status: 200 },
    )
  } catch (error) {
    console.log('error:', error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
