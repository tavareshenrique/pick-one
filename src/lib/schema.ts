import { z } from 'zod'

import { moodIdSchema } from '@/config/moods'
import { DURATION_MAX, DURATION_MIN, MAX_TEXT_LENGTH } from '@/config/recommend'

const minutes = z
  .number()
  .int()
  .min(DURATION_MIN - 1)
  .max(600)

const durationPresetSchema = z.enum([
  'short',
  'standard',
  'long',
  'any',
  'custom',
])

export const recommendRequestSchema = z
  .object({
    mood: moodIdSchema,
    mode: z.enum(['keep', 'shift']).default('keep'),
    text: z.string().trim().max(MAX_TEXT_LENGTH).optional(),
    duration: z
      .object({ min: minutes.optional(), max: minutes.optional() })
      .refine(
        (d) => d.min === undefined || d.max === undefined || d.min <= d.max,
        {
          message: 'min > max',
        },
      ),
    turnstileToken: z.string().max(2048).optional(),
    exclude: z.array(z.number().int()).max(200).optional(),
    // Só analytics. Não entram na escolha do filme.
    visitId: z.uuid().optional(),
    preset: durationPresetSchema.optional(),
  })
  .strict()

export type RecommendRequest = z.infer<typeof recommendRequestSchema>

export const DURATION_BOUNDS = { min: DURATION_MIN, max: DURATION_MAX }
