import { Steps } from '@/components/steps'
import { StepsProvider } from '@/context/StepContext'

export default function Home() {
  return (
    <StepsProvider>
      <main className="flex flex-col items-center justify-center h-screen">
        <section className="flex flex-col items-center justify-center space-y-4 w-full">
          <Steps />
        </section>
      </main>
    </StepsProvider>
  )
}
