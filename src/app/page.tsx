import { HomeLibrary } from '@/components/content/home-library'
import { Flow } from '@/components/flow/flow'
import { moodIdFromHumorParam } from '@/content/moods'
import { PickProvider } from '@/state/pick'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ humor?: string | string[] }>
}) {
  const { humor } = await searchParams
  const initialMood = moodIdFromHumorParam(humor)

  return (
    <>
      <PickProvider key={initialMood ?? 'novo'} initialMood={initialMood}>
        <Flow />
      </PickProvider>
      <HomeLibrary />
    </>
  )
}
