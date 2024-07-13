'use client'

import { useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { cn } from '@/lib/utils'

import { Slider } from '../ui/slider'

const TIME = [
  {
    id: 0,
    minutes: 75,
    name: 'No Máximo 1h 15 minutos',
  },
  {
    id: 10,
    minutes: 90,
    name: 'No Máximo 1h 30 minutos',
  },
  {
    id: 20,
    minutes: 120,
    name: 'No Máximo 2h',
  },
  {
    id: 30,
    minutes: 180,
    name: 'No Máximo 3h',
  },
]

export function Time() {
  const { handleMovieTime } = useSteps()

  const [timeInterval, setTimeInterval] = useState([10])

  function getTime() {
    if (timeInterval[0] === 0) {
      return TIME[0]
    }

    if (timeInterval[0] <= 10) {
      return TIME[1]
    }

    if (timeInterval[0] <= 20) {
      return TIME[2]
    }

    return TIME[3]
  }

  function commitValue(referenceValue: number) {
    const timeValueMinutes = TIME.filter(
      (time) => time.id === referenceValue,
    )[0].minutes

    handleMovieTime(timeValueMinutes)
  }

  return (
    <>
      <div className="gap-8 flex items-center justify-start flex-col w-full h-full">
        <h1 className="text-xl mt-16 text-center">
          Qual a duração do filme que você gostaria de assistir?
        </h1>

        <div className="gap-4 w-full flex items-center justify-start flex-col h-full">
          <Slider
            onValueChange={setTimeInterval}
            onValueCommit={(value) => commitValue(value[0])}
            value={timeInterval}
            defaultValue={timeInterval}
            max={30}
            step={10}
            className={cn('w-[70%] mb-6 mt-6')}
          />

          <div className="mt-auto mb-8 flex items-center justify-center flex-col gap-4">
            <p>{getTime().name}</p>
          </div>
        </div>
      </div>
    </>
  )
}
