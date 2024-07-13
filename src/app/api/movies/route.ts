import { NextRequest, NextResponse } from 'next/server'

type TMovieResult = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface IMovie {
  page: number
  results: TMovieResult[]
  total_pages: number
  total_results: number
}

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  try {
    const searchParams = req.nextUrl.searchParams

    const feeling = searchParams.get('feeling')

    const internalGenreResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/genre?feeling=${feeling}`,
    )

    const internalGenresData = (await internalGenreResponse.json()) as string[]

    const genresIds = internalGenresData.map((genre) => genre).join(',')

    const randomPage = Math.floor(Math.random() * 10) + 1

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${randomPage}&sort_by=popularity.desc&with_genres=${genresIds}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_TOKEN!,
      },
    }

    const moviesResponse = await fetch(url, options)

    const movies = (await moviesResponse.json()) as IMovie

    const moviesData = movies.results
      .map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          originalTitle: movie.original_title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        }
      })
      .filter((movie) => movie.overview !== '')

    return NextResponse.json(moviesData, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
