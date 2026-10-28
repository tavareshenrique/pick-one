import { ImageResponse } from 'next/og'

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
  // Ícone maskable usa só a área segura central
  const inner = size * (maskable ? 0.5 : 0.62)

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #1e1b4b 0%, #0a0a0f 60%, #7c3aed 140%)',
          borderRadius: maskable ? 0 : size * 0.22,
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            borderRadius: inner,
            border: `${inner * 0.07}px solid #ffffff`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: inner * 0.5,
            fontWeight: 800,
          }}
        >
          P1
        </div>
      </div>
    ),
    { width: size, height: size },
  )
}
