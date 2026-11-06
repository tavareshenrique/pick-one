import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

type Sql = NeonQueryFunction<false, false>

let sql: Sql | null | undefined
let schemaReady: Promise<void> | null = null

function getSql() {
  if (sql !== undefined) return sql
  const url = process.env.DATABASE_URL?.trim()
  sql = url ? neon(url) : null
  return sql
}

/** A tabela nasce na primeira escrita, para o build não depender da env. */
function ensureTable(db: Sql) {
  schemaReady ??= db
    .transaction([
      db`CREATE TABLE IF NOT EXISTS analytics_events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at timestamptz NOT NULL DEFAULT now(),
        visit_id uuid,
        name text NOT NULL,
        props jsonb NOT NULL DEFAULT '{}'::jsonb
      )`,
      db`CREATE INDEX IF NOT EXISTS analytics_events_name_created_at_idx
        ON analytics_events (name, created_at)`,
    ])
    .then(() => undefined)
    .catch((error: unknown) => {
      schemaReady = null
      throw error
    })
  return schemaReady
}

export async function recordEvent(
  name: string,
  visitId: string | null,
  props: object,
) {
  const db = getSql()
  if (!db) return
  const write = (async () => {
    await ensureTable(db)
    await db`
      INSERT INTO analytics_events (visit_id, name, props)
      VALUES (${visitId}::uuid, ${name}, ${JSON.stringify(props)}::jsonb)
    `
  })().catch((error: unknown) => {
    console.warn('[analytics]', (error as Error).message)
  })
  await Promise.race([
    write,
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ])
}
