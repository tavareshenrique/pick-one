import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #1e1b4b 0%, #0a0a0f 60%, #7c3aed 140%)',
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 112,
            border: '8px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 56,
            fontWeight: 800,
          }}
        >
          P1
        </div>
      </div>
    ),
    size,
  )
}
