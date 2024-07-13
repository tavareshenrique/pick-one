'use client'

import { useQuery } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { movies } from '@/modules/movies'

import movieLoadingAnimation from '../../assets/lottie/movie-loading.json'

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
    function getRandomNumber(movieList: IMovieData[]) {
      const randomIndex = Math.floor(Math.random() * movieList.length)

      return randomIndex
    }

    async function getFallbackMovie() {
      const randomIndex = getRandomNumber(data)

      const movieFallback = data[randomIndex]

      const movieTime = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieFallback.id}`,
      )

      const movieFallbackData = await movieTime.json()

      setMovieNotFound(true)

      setSelectedMovie(movieFallback)
      setMovieTime(movieFallbackData.time)
    }

    function getMovie(dataMovie: IMovieData[]) {
      const randomIndex = getRandomNumber(dataMovie)

      const selectedMovie = dataMovie[randomIndex]

      return { selectedMovie }
    }

    async function getMovieDetail(movieId: number) {
      const movieTime = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieId}`,
      )

      return await movieTime.json()
    }

    async function chooseMovie(dataMovie: IMovieData[]) {
      try {
        const movieList = dataMovie

        setIsLoadingMovie(true)

        if (!movieList.length) {
          getFallbackMovie()

          return
        }

        const { selectedMovie } = getMovie(movieList)

        const { time: selectedMovieTime } = await getMovieDetail(
          selectedMovie.id,
        )

        if (selectedMovieTime <= movieTimeInMinutes) {
          setSelectedMovie(selectedMovie)
          setMovieTime(selectedMovieTime)
        } else {
          const newDataMovieList = movieList.filter(
            (movie) => movie.id !== selectedMovie.id,
          )

          await chooseMovie(newDataMovieList)
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
      <div className="flex items-center justify-center w-screen h-screen flex-col">
        <Lottie
          animationData={movieLoadingAnimation}
          loop={true}
          className="w-60"
        />

        <p className="text-lg mx-4 font-bold ">
          Buscando a melhor opção pra você...
        </p>
      </div>
    )

  if (isError)
    return (
      <p className="text-center text-sm text-rose-500">
        Não conseguimos carregar os filmes, tente novamente mais tarde
      </p>
    )

  return (
    <div className="flex flex-col items-center justify-center w-full h-full  md:space-x-4 md:max-w-3xl md:gap-16">
      <h1 className="md:text-2xl font-bold text-lg mt-12 md:mt-0">
        O Filme escolhido pra você hoje é...✨
      </h1>

      {movieNotFound && (
        <p className="text-center text-sm text-rose-500">
          Não encontramos um filme com a duração que você deseja, mas
          selecionamos um filme para você assistir! Divirta-se! 🍿
        </p>
      )}

      <section className="flex md:flex-row flex-col mt-8 md:mt-0 items-center justify-center md:space-x-4 w-full gap-4 px-4 md:px-0">
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
