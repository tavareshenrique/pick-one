'use client'

import { useQuery } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { IMovieProviders } from '@/app/api/movies/providers/route'
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
  const [movieProviders, setMoviesProviders] = useState<IMovieProviders | null>(
    null,
  )
  const [isLoadingMovie, setIsLoadingMovie] = useState(false)
  const [movieTime, setMovieTime] = useState(0)
  const [movieNotFound, setMovieNotFound] = useState(false)

  const getRandomNumber = useCallback((movieList: IMovieData[]) => {
    const randomIndex = Math.floor(Math.random() * movieList.length)

    return randomIndex
  }, [])

  const getFallbackMovie = useCallback(async () => {
    const randomIndex = getRandomNumber(data)

    console.log('data', data)

    const movieFallback = data[randomIndex]

    console.log('movieFallback', movieFallback)

    const movieTime = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieFallback.id}`,
    )

    const movieFallbackData = await movieTime.json()

    setMovieNotFound(true)

    setSelectedMovie(movieFallback)
    setMovieTime(movieFallbackData.time)
  }, [data, getRandomNumber])

  const getMovie = useCallback(
    (dataMovie: IMovieData[]) => {
      const randomIndex = getRandomNumber(dataMovie)

      const selectedMovie = dataMovie[randomIndex]

      return { selectedMovie }
    },
    [getRandomNumber],
  )

  const getMovieDetail = useCallback(async (movieId: number) => {
    const movieTime = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details/${movieId}`,
    )

    return movieTime.json()
  }, [])

  const chooseMovie = useCallback(
    async (dataMovie: IMovieData[]) => {
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

          const movieProvidersResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/providers?movieId=${selectedMovie.id}`,
          )

          const movieProvidersData = await movieProvidersResponse.json()

          setMoviesProviders(movieProvidersData)
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
    },
    [getFallbackMovie, getMovie, getMovieDetail, movieTimeInMinutes],
  )

  useEffect(() => {
    if (data) {
      chooseMovie(data)
    }
  }, [chooseMovie, data])

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

        <div className="flex flex-col justify-center space-y-4 items-center md:items-start">
          <h2 className="md:text-xl text-lg font-bold text-center md:text-left">
            {selectedMovie.title}
          </h2>

          <p className="text-center md:text-left line-clamp-4 md:line-clamp-6">
            {selectedMovie.overview}
          </p>

          <p>
            <strong>Duração:</strong> {movieTime} minutos
          </p>

          <p>
            <strong>Nota:</strong> {selectedMovie.vote_average}
          </p>

          {movieProviders && (
            <div>
              <h3 className="text-lg font-bold text-center">Onde assistir?</h3>

              <h4 className="text-center mt-4">Streamings</h4>
              {movieProviders?.streaming.length ? (
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 flex-wrap">
                  {movieProviders.streaming.map((provider) => (
                    <Image
                      key={provider.id}
                      src={provider.icon}
                      alt={provider.name}
                      title={provider.name}
                      width={48}
                      height={48}
                      className="rounded-lg w-12 h-12"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-rose-500 text-center">
                  Não encontramos opções de streaming para este filme
                </p>
              )}

              <h4 className="text-center mt-4">Aluguel</h4>
              {movieProviders?.rent.length ? (
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 flex-wrap">
                  {movieProviders.rent.map((provider) => (
                    <Image
                      key={provider.id}
                      src={provider.icon}
                      alt={provider.name}
                      title={provider.name}
                      width={48}
                      height={48}
                      className="rounded-lg w-12 h-12"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-rose-500 text-center">
                  Não encontramos opções de aluguel para este filme
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
