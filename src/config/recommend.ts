/** Proporção alvo de filmes recentes no top (0 a 1). Não é regra rígida. */
export const RECENT_RATIO = 0.4
/** "Recente" = lançado nos últimos N meses. */
export const RECENT_MONTHS = 18
/** Nota mínima (0 a 1) para um lançamento ocupar vaga de recente. */
export const MIN_RECENT_SCORE = 0.45

export const RESULT_SIZE = 6
export const POOL_SIZE = 60
export const POOL_RECENT_SHARE = 2 / 5 // 2 recentes : 3 catálogo

export const POOL_TTL_SECONDS = 60 * 60 * 8
export const NOW_PLAYING_TTL_SECONDS = 60 * 60 * 6
export const RANK_TTL_SECONDS = 60 * 60 * 12
export const DETAILS_TTL_SECONDS = 60 * 60 * 24

export const AI_TIMEOUT_MS = 3000
export const MIN_AI_CONFIDENCE = 0.4

export const MAX_TEXT_LENGTH = 200
export const MAX_MESSAGE_LENGTH = 160

export const RATE_LIMIT_PER_DAY = 5
export const RATE_LIMIT_PER_MINUTE = 3
export const DEFAULT_AI_DAILY_LIMIT = 800

export const DURATION_MIN = 60
export const DURATION_MAX = 240
export const DURATION_STEP = 15

export const CINEMA_CHANCE_SADNESS_1 = 0.4
