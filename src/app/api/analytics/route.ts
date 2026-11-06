import { NextRequest, NextResponse } from 'next/server'

import { recordClientEvent } from '@/server/analytics/record'
import { analyticsEventSchema } from '@/server/analytics/schema'
import { allowAnalytics, isAllowedOrigin } from '@/server/guard'

const MAX_BODY = 2048

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json(
      { message: 'Origem não permitida' },
      { status: 403 },
    )
  }

  const length = Number(req.headers.get('content-length') ?? 0)
  if (length > MAX_BODY) {
    return NextResponse.json(
      { message: 'Requisição muito grande' },
      { status: 413 },
    )
  }

  const raw = await req.text()
  if (raw.length > MAX_BODY) {
    return NextResponse.json(
      { message: 'Requisição muito grande' },
      { status: 413 },
    )
  }

  let json: unknown
  try {
    json = JSON.parse(raw)
  } catch {
    return NextResponse.json({ message: 'JSON inválido' }, { status: 400 })
  }

  const parsed = analyticsEventSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })
  }

  if (!(await allowAnalytics(req))) {
    return new NextResponse(null, { status: 204 })
  }

  await recordClientEvent(parsed.data)
  return new NextResponse(null, { status: 204 })
}
