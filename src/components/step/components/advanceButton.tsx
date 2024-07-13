'use client'

import { useSteps } from '@/context/StepContext'

export function AdvanceButton() {
  const { currentStep, handleNextStep } = useSteps()

  return (
    <>
      {currentStep <= 1 && (
        <div className="w-full flex items-center justify-center">
          <button
            className="p-4 mx-8 mb-16 text-white bg-emerald-500 rounded-lg md:w-1/4 w-full"
            onClick={handleNextStep}
          >
            Avançar
          </button>
        </div>
      )}
    </>
  )
}
