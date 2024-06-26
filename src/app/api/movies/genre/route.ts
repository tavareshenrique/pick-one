import { NextRequest, NextResponse } from 'next/server'

type TGenre = {
  id: number
  name: string
}

export interface IGenreResponse {
  genres: TGenre[]
}

const HELP = ['Thriller', 'Terror']
const SAD = ['Drama', 'Romance']
const WORRIED = [
  'Ação',
  'Crime',
  'Documentário',
  'Ficção científica',
  'Guerra',
  'Mistério',
  'Faroeste',
]
const NEUTRAL = [
  'Comédia',
  'Família',
  'Fantasia',
  'Aventura',
  'Ficção científica',
]
const HAPPY = [
  'Animação',
  'Comédia',
  'Família',
  'Fantasia',
  'Aventura',
  'Música',
]
const IN_LOVE = ['Romance', 'Comédia']
const WONDERFUL = ['Aventura', 'Família', 'Fantasia', 'Ação', 'Comédia']

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_TOKEN!,
    },
  }

  try {
    const genresResponse = await fetch(url, options)

    const genresData = (await genresResponse.json()) as IGenreResponse

    const searchParams = req.nextUrl.searchParams

    const feeling = searchParams.get('feeling')

    if (!feeling) {
      return NextResponse.json(
        { message: 'Feeling query param is required' },
        { status: 400 },
      )
    }

    const genresIds = genresData.genres.reduce((acc, genre) => {
      if (feeling.toLocaleLowerCase() === 'help' && HELP.includes(genre.name)) {
        acc.push(genre.id)
      }

      if (feeling.toLocaleLowerCase() === 'sad' && SAD.includes(genre.name)) {
        acc.push(genre.id)
      }

      if (
        feeling.toLocaleLowerCase() === 'worried' &&
        WORRIED.includes(genre.name)
      ) {
        acc.push(genre.id)
      }

      if (
        feeling.toLocaleLowerCase() === 'neutral' &&
        NEUTRAL.includes(genre.name)
      ) {
        acc.push(genre.id)
      }

      if (
        feeling.toLocaleLowerCase() === 'happy' &&
        HAPPY.includes(genre.name)
      ) {
        acc.push(genre.id)
      }

      if (
        feeling.toLocaleLowerCase() === 'inlove' &&
        IN_LOVE.includes(genre.name)
      ) {
        acc.push(genre.id)
      }

      if (
        feeling.toLocaleLowerCase() === 'wonderful' &&
        WONDERFUL.includes(genre.name)
      ) {
        acc.push(genre.id)
      }

      return acc
    }, [] as number[])

    return NextResponse.json(genresIds, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
