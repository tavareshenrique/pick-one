'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { movies } from '@/modules/movies'

export interface IMovieData {
  id: number
  title: string
  originalTitle: string
  overview: string
  poster_path: string
  vote_average: string
}

export function Movie() {
  const { feeling, movieTimeInMinutes } = useSteps()

  console.log(`movieTimeInMinutes`, movieTimeInMinutes)

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await movies().GET({ feeling }),
    queryKey: ['movies'],
  })

  const [selectedMovie, setSelectedMovie] = useState<IMovieData | null>(null)
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [movieTime, setMovieTime] = useState(0)
  const [movieNotFound, setMovieNotFound] = useState(false)

  useEffect(() => {
    function getNumber(movieList: IMovieData[]) {
      const randomIndex = Math.floor(Math.random() * movieList.length)

      return randomIndex
    }

    async function chooseMovie(dataMovie: IMovieData[]) {
      try {
        if (!dataMovie.length) {
          const randomIndex = getNumber(data)

          const movieFallback = data[randomIndex]

          const movieTime = await fetch(
            `http://localhost:3000/api/movies/details/${movieFallback.id}`,
          )

          const movieFallbackData = await movieTime.json()

          setMovieNotFound(true)

          setSelectedMovie(movieFallback)
          setMovieTime(movieFallbackData.time)

          return
        }

        setIsLoadingMovie(true)

        const randomIndex = getNumber(dataMovie)

        const movieFromList = dataMovie[randomIndex]

        const movieTime = await fetch(
          `http://localhost:3000/api/movies/details/${movieFromList.id}`,
        )

        const movieData = await movieTime.json()

        if (movieData.time <= movieTimeInMinutes) {
          setSelectedMovie(movieFromList)
          setMovieTime(movieData.time)
        } else {
          const newDataMovie = dataMovie.filter(
            (movie) => movie.id !== movieFromList.id,
          )

          chooseMovie(newDataMovie)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingMovie(false)
      }
    }

    if (data) {
      chooseMovie(data)
    }
  }, [data, movieTimeInMinutes])

  if (isLoading || isLoadingMovie || !selectedMovie)
    return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <div className="flex flex-col items-center justify-center space-x-4 w-full max-w-3xl gap-16">
      <h1 className="text-2xl font-bold">
        O Filme escolhido pra você hoje é...✨
      </h1>

      {movieNotFound && (
        <p className="text-center text-sm text-rose-500">
          Não encontramos um filme com a duração que você deseja, mas
          selecionamos um filme para você assistir! Divirta-se! 🍿
        </p>
      )}

      <section className="flex flex-row items-center justify-center space-x-4 w-full gap-4">
        <Image
          className="w-1/4 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          width={400}
          height={400}
        />

        <div className="flex flex-col items-start justify-center space-y-4">
          <h2 className="text-xl font-bold">{selectedMovie.title}</h2>

          <p>{selectedMovie.overview}</p>

          <p>Duração: {movieTime} minutos</p>

          <p>Nota: {selectedMovie.vote_average}</p>
        </div>
      </section>
    </div>
  )
}
