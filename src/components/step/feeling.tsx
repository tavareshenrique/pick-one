'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useSteps } from '@/context/StepContext'
import { cn } from '@/lib/utils'

import { Slider } from '../ui/slider'

enum EFeelings {
  HELP = 'help',
  SAD = 'sad',
  WORRIED = 'worried',
  NEUTRAL = 'neutral',
  HAPPY = 'happy',
  INLOVE = 'inlove',
  WONDERFUL = 'wonderful',
}

const FEELINGS = [
  {
    id: EFeelings.HELP,
    value: 0,
    name: 'Socorro',
    image: '/images/feelings/00-help.svg',
  },
  {
    id: EFeelings.SAD,
    value: 10,
    name: 'Triste',
    image: '/images/feelings/01-sad.svg',
  },
  {
    id: EFeelings.WORRIED,
    value: 20,
    name: 'Sei lá',
    image: '/images/feelings/02-worried.svg',
  },
  {
    id: EFeelings.NEUTRAL,
    value: 30,
    name: 'Normal',
    image: '/images/feelings/03-neutral.svg',
  },
  {
    id: EFeelings.HAPPY,
    value: 40,
    name: 'Feliz',
    image: '/images/feelings/04-happy.svg',
  },
  {
    id: EFeelings.INLOVE,
    value: 50,
    name: 'Apaixonado',
    image: '/images/feelings/05-in-love.svg',
  },
  {
    id: EFeelings.WONDERFUL,
    value: 60,
    name: 'Extraordinário',
    image: '/images/feelings/06-wonderful.svg',
  },
]

export function Feeling() {
  const { handleFeeling } = useSteps()

  const [feelingInterval, setFeelingInterval] = useState([30])

  const feelingIntervalValue = feelingInterval[0]

  function getFeelings() {
    switch (feelingIntervalValue) {
      case 0:
        return FEELINGS[0]

      case 10:
        return FEELINGS[1]

      case 20:
        return FEELINGS[2]

      case 30:
        return FEELINGS[3]

      case 40:
        return FEELINGS[4]

      case 50:
        return FEELINGS[5]

      case 60:
        return FEELINGS[6]

      default:
        return FEELINGS[3]
    }
  }

  function commitValue(referenceValue: number) {
    const feelingValueId = FEELINGS.filter(
      (feeling) => feeling.value === referenceValue,
    )[0].id

    handleFeeling(feelingValueId)
  }

  return (
    <div className="gap-8 flex items-center justify-start flex-col w-full h-full">
      <h1 className="text-xl mt-16 text-center">
        Como você está se sentindo hoje?
      </h1>

      <div className="gap-4 w-full flex items-center justify-start flex-col h-full">
        <Slider
          onValueChange={setFeelingInterval}
          onValueCommit={(value) => commitValue(value[0])}
          value={feelingInterval}
          defaultValue={feelingInterval}
          max={60}
          step={10}
          className={cn('w-[70%] mb-6 mt-6')}
        />

        <div className="mt-auto mb-8 flex items-center justify-center flex-col gap-4">
          <Image
            src={getFeelings().image}
            alt={getFeelings().name}
            width={64}
            height={64}
          />
          <p>{getFeelings().name}</p>
        </div>
      </div>
    </div>
  )
}
