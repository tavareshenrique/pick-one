import { Step } from '@/components/step'
import { StepsProvider } from '@/context/StepContext'

export default async function Home() {
  return (
    <StepsProvider>
      <main className="flex flex-col items-center justify-center h-screen ">
        <section className="flex flex-col items-center justify-between h-4/5 space-y-4 w-full">
          <Step />
        </section>
      </main>
    </StepsProvider>
  )
}
