'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface IStepsContext {
  currentStep: number
  feeling: string
  movieTimeInMinutes: number
  handleNextStep: () => void
  handleFeeling: (feeling: string) => void
  handleMovieTime: (time: number) => void
}

interface IStepsProvider {
  children: ReactNode
}

export const StepsContext = createContext<IStepsContext>({} as IStepsContext)

export function StepsProvider({ children }: IStepsProvider) {
  const [currentStep, setCurrentStep] = useState(0)
  const [feeling, setFeeling] = useState('neutral')
  const [movieTimeInMinutes, setMovieTimeInMinutes] = useState(90)

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1)
  }

  function handleFeeling(feeling: string) {
    setFeeling(feeling)
  }

  function handleMovieTime(time: number) {
    setMovieTimeInMinutes(time)
  }

  return (
    <StepsContext.Provider
      value={{
        currentStep,
        feeling,
        movieTimeInMinutes,
        handleNextStep,
        handleFeeling,
        handleMovieTime,
      }}
    >
      {children}
    </StepsContext.Provider>
  )
}

export function useSteps() {
  return useContext(StepsContext)
}
