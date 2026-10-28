import { NextRequest, NextResponse } from 'next/server'

import { recommendRequestSchema } from '@/lib/schema'
import { isAllowedOrigin } from '@/server/guard'
import { recommend } from '@/server/recommend'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json(
      { message: 'Origem não permitida' },
      { status: 403 },
    )
  }

  const length = Number(req.headers.get('content-length') ?? 0)
  if (length > 4096) {
    return NextResponse.json(
      { message: 'Requisição muito grande' },
      { status: 413 },
    )
  }

  const raw = await req.text()
  if (raw.length > 4096) {
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

  const parsed = recommendRequestSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })
  }

  try {
    const result = await recommend(req, parsed.data)
    if (!result.movies.length) {
      return NextResponse.json(
        { message: 'Nenhum filme encontrado' },
        { status: 404 },
      )
    }
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('[recommend]', error)
    return NextResponse.json(
      { message: 'Erro ao buscar filmes' },
      { status: 502 },
    )
  }
}
