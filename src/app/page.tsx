'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const FEELINGS = [
  {
    id: 1,
    name: 'Socorro',
    image: '/images/feelings/00-help.svg',
  },
  {
    id: 2,
    name: 'Triste',
    image: '/images/feelings/01-sad.svg',
  },
  {
    id: 3,
    name: 'Sei lá',
    image: '/images/feelings/02-worried.svg',
  },
  {
    id: 4,
    name: 'Normal',
    image: '/images/feelings/03-neutral.svg',
  },
  {
    id: 5,
    name: 'Feliz',
    image: '/images/feelings/04-happy.svg',
  },
  {
    id: 6,
    name: 'Apaixonado',
    image: '/images/feelings/05-in-love.svg',
  },
  {
    id: 7,
    name: 'Extraordinário',
    image: '/images/feelings/06-wonderful.svg',
  },
]

export default function Home() {
  const [feelingInterval, setFeelingInterval] = useState([50])

  function getFeelings() {
    if (feelingInterval[0] <= 10) {
      return FEELINGS[0]
    }
    if (feelingInterval[0] <= 25) {
      return FEELINGS[1]
    }
    if (feelingInterval[0] <= 40) {
      return FEELINGS[2]
    }
    if (feelingInterval[0] <= 50) {
      return FEELINGS[3]
    }
    if (feelingInterval[0] <= 65) {
      return FEELINGS[4]
    }
    if (feelingInterval[0] <= 80) {
      return FEELINGS[5]
    }

    return FEELINGS[6]
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <section className="flex flex-col items-center justify-center space-y-4 w-full">
        <div className="flex flex-col items-center justify-center space-y-4 w-1/2 gap-4">
          <h1 className="text-3xl font-bold text-center">
            Como você está se sentindo?
          </h1>

          <Slider
            onValueChange={setFeelingInterval}
            value={feelingInterval}
            defaultValue={feelingInterval}
            max={100}
            step={10}
            className={cn('w-[60%] mb-6')}
          />
        </div>

        <div className="flex items-center justify-center space-x-4 p-2">
          <Image
            src={getFeelings().image}
            alt={getFeelings().name}
            width={80}
            height={80}
          />
          <p>{getFeelings().name}</p>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="p-4 m-8 text-white bg-blue-500 rounded-lg w-1/4">
            Avançar
          </button>
        </div>
      </section>
    </main>
  )
}
