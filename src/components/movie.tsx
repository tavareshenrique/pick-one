'use client'

import { useQuery } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { movies } from '@/modules/movies'

import movieLoadingAnimation from '../assets/lottie/movie-loading.json'

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
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieFallback.id}`,
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieFromList.id}`,
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
    return (
      <Lottie
        animationData={movieLoadingAnimation}
        loop={true}
        className="w-1/4"
      />
    )

  if (isError)
    return (
      <p className="text-center text-sm text-rose-500">
        Não conseguimos carregar os filmes, tente novamente mais tarde
      </p>
    )

  return (
    // <div className="flex flex-col items-center justify-center space-x-4 w-full max-w-3xl gap-16 md:bg-red-500">
    <div className="flex flex-col items-center justify-center w-full md:space-x-4 md:max-w-3xl md:gap-16">
      <h1 className="md:text-2xl font-bold text-lg">
        O Filme escolhido pra você hoje é...✨
      </h1>

      {movieNotFound && (
        <p className="text-center text-sm text-rose-500">
          Não encontramos um filme com a duração que você deseja, mas
          selecionamos um filme para você assistir! Divirta-se! 🍿
        </p>
      )}

      <section className="flex md:flex-row flex-col mt-8 md:mt-0 items-center justify-center md:space-x-4 w-full gap-4">
        <Image
          className="w-1/4 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          width={400}
          height={400}
        />

        <div className="flex flex-col justify-center space-y-4 items-center md:items-start ">
          <h2 className="md:text-xl text-lg font-bold text-center md:text-left">
            {selectedMovie.title}
          </h2>

          <p className="text-center md:text-left">{selectedMovie.overview}</p>

          <p>
            <strong>Duração:</strong> {movieTime} minutos
          </p>

          <p>
            <strong>Nota:</strong> {selectedMovie.vote_average}
          </p>
        </div>
      </section>
    </div>
  )
}
