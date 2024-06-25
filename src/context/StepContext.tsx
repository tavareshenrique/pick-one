'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface IStepsContext {
  currentStep: number
  handleNextStep: () => void
}

interface IStepsProvider {
  children: ReactNode
}

export const StepsContext = createContext<IStepsContext>({} as IStepsContext)

export function StepsProvider({ children }: IStepsProvider) {
  const [currentStep, setCurrentStep] = useState(0)

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <StepsContext.Provider value={{ currentStep, handleNextStep }}>
      {children}
    </StepsContext.Provider>
  )
}

export function useSteps() {
  return useContext(StepsContext)
}
