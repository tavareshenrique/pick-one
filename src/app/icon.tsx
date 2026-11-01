import { ImageResponse } from 'next/og'

import { PickOneIcon } from '@/components/brand/pick-one-icon'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(<PickOneIcon size={32} />, { ...size })
}
