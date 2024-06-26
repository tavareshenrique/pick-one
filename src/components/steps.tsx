'use client'

import { useSteps } from '@/context/StepContext'

import { Feelings } from './feelings'
import { Movie } from './movie'
import { Time } from './time'

export function Steps() {
  const { currentStep, handleNextStep } = useSteps()

  function renderStep() {
    if (currentStep === 0) {
      return <Feelings />
    }

    if (currentStep === 1) {
      return <Time />
    }

    return <Movie />
  }

  return (
    <>
      {renderStep()}

      {currentStep <= 1 && (
        <div className="w-full flex items-center justify-center">
          <button
            className="p-4 m-8 text-white bg-blue-500 rounded-lg md:w-1/4 w-full"
            onClick={handleNextStep}
          >
            Avançar
          </button>
        </div>
      )}
    </>
  )
}
