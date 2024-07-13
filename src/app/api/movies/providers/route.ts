import { NextRequest, NextResponse } from 'next/server'

export interface TFlatRate_Rent {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

type TProviders = {
  flatrate: TFlatRate_Rent[]
  rent: TFlatRate_Rent[]
}

export interface IPorvidersResponse {
  results: {
    BR: TProviders
  }
}

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  const searchParams = req.nextUrl.searchParams

  const movieId = searchParams.get('movieId')

  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_TOKEN!,
    },
  }

  try {
    const providersResponse = await fetch(url, options)

    const providersData = (await providersResponse.json()) as IPorvidersResponse

    console.log('flatrate', providersData.results.BR.flatrate)
    console.log('rent', providersData.results.BR.rent)

    return NextResponse.json('genresIds', { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
