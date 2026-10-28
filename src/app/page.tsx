import { Flow } from '@/components/flow/flow'
import { PickProvider } from '@/state/pick'

export default function Home() {
  return (
    <PickProvider>
      <Flow />
    </PickProvider>
  )
}
