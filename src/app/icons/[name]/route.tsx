import { ImageResponse } from 'next/og'

import { PickOneIcon } from '@/components/brand/pick-one-icon'

const SIZES: Record<string, { size: number; maskable: boolean }> = {
  '192': { size: 192, maskable: false },
  '512': { size: 512, maskable: false },
  maskable: { size: 512, maskable: true },
}

export function generateStaticParams() {
  return Object.keys(SIZES).map((name) => ({ name }))
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params
  const cfg = SIZES[name]
  if (!cfg) return new Response('Not found', { status: 404 })

  const { size, maskable } = cfg

  return new ImageResponse(<PickOneIcon size={size} maskable={maskable} />, {
    width: size,
    height: size,
  })
}
