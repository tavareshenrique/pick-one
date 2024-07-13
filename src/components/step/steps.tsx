'use client'

import { useSteps } from '@/context/StepContext'

import { Feeling } from './feeling'
import { Movie } from './movie'
import { Time } from './time'

export function Steps() {
  const { currentStep } = useSteps()

  function renderStep() {
    if (currentStep === 0) {
      return <Feeling />
    }

    if (currentStep === 1) {
      return <Time />
    }

    return <Movie />
  }

  return <>{renderStep()}</>
}
