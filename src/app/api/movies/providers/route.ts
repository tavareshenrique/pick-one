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

export interface IProvidersResponse {
  results: {
    BR: TProviders
  }
}

export interface IMovieProviders {
  streaming: {
    id: number
    name: string
    icon: string
    priority: number
  }[]
  rent: {
    id: number
    name: string
    icon: string
    priority: number
  }[]
}

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  const searchParams = req.nextUrl.searchParams

  const movieId = searchParams.get('movieId')

  console.log('movieId', movieId)

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

    const providersData = (await providersResponse.json()) as IProvidersResponse

    const streaming = []
    const rent = []

    if (!!providersData.results.BR && !!providersData.results.BR.flatrate) {
      const flatRateData = providersData.results.BR.flatrate.map((provider) => {
        return {
          id: provider.provider_id,
          name: provider.provider_name,
          icon: `https://image.tmdb.org/t/p/w200${provider.logo_path}`,
          priority: provider.display_priority,
        }
      })

      console.log(
        'providersData.results.BR.flatrate',
        providersData.results.BR.flatrate,
      )

      streaming.push(...flatRateData)
    }

    if (!!providersData.results.BR && !!providersData.results.BR.rent) {
      const rentData = providersData.results.BR.rent.map((provider) => {
        return {
          id: provider.provider_id,
          name: provider.provider_name,
          icon: `https://image.tmdb.org/t/p/w200${provider.logo_path}`,
          priority: provider.display_priority,
        }
      })

      rent.push(...rentData)
    }

    return NextResponse.json({ streaming, rent }, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
