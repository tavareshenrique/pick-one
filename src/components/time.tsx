'use client'

import { useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { cn } from '@/lib/utils'

import { Slider } from './ui/slider'

const TIME = [
  {
    id: 1,
    name: 'No Máximo 1h 15 minutos',
  },
  {
    id: 2,
    name: 'No Máximo 1h 30 minutos',
  },
  {
    id: 3,
    name: 'No Máximo 2h 00 minutos',
  },
  {
    id: 4,
    name: 'No Máximo 3h 00 minutos',
  },
]

export function Time() {
  const { handleMovieTime } = useSteps()

  const [timeInterval, setTimeInterval] = useState([33])

  function getTime() {
    if (timeInterval[0] <= 25) {
      handleMovieTime(75)

      return TIME[0]
    }

    if (timeInterval[0] <= 50) {
      handleMovieTime(90)
      return TIME[1]
    }

    if (timeInterval[0] <= 75) {
      handleMovieTime(120)
      return TIME[2]
    }

    handleMovieTime(180)

    return TIME[3]
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 md:w-1/2 gap-4">
        <h1 className="md:text-3xl text-xl font-bold text-center">
          Qual a duração do filme que você gostaria de assistir?
        </h1>

        <Slider
          onValueChange={setTimeInterval}
          value={timeInterval}
          defaultValue={timeInterval}
          max={100}
          step={33}
          className={cn('w-[60%] mb-6')}
        />
      </div>

      <div className="flex items-center justify-center space-x-4 p-2">
        <p>{getTime().name}</p>
      </div>
    </>
  )
}
