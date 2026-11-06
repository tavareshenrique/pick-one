import { z } from 'zod'

import { moodIdSchema } from '@/config/moods'

const step = z.enum(['Humor', 'Clima', 'Duração', 'Resultado'])
const movieId = z.number().int().positive()

const movie = z
  .object({
    id: movieId,
    title: z.string().trim().min(1).max(300),
    year: z.number().int().min(1880).max(2100).nullable(),
    rating: z.number().min(0).max(10),
    runtime: z.number().int().min(0).max(1000).nullable(),
    genres: z.array(z.string().trim().min(1).max(40)).max(12),
    recent: z.boolean(),
    nowPlaying: z.boolean(),
  })
  .strict()

export const analyticsEventSchema = z.discriminatedUnion('name', [
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('mood_select'),
      props: z.object({ id: moodIdSchema }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('step_continue'),
      props: z.object({ step: z.enum(['Humor', 'Clima', 'Duração']) }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('back'),
      props: z.object({ from: step, to: step }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('movie_shown'),
      props: z.object({ movie }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('another'),
      props: z.object({ movieId }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('share'),
      props: z
        .object({ movieId, via: z.enum(['share', 'clipboard']) })
        .strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('trailer'),
      props: z.object({ movieId }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('provider'),
      props: z
        .object({
          movieId,
          kind: z.enum(['streaming', 'rent']),
          name: z.string().trim().min(1).max(80),
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('cinema'),
      props: z
        .object({
          action: z.enum(['sessions', 'stay']),
          movieId,
          title: z.string().trim().min(1).max(300),
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('restart'),
      props: z.object({ from: z.enum(['result', 'error']) }).strict(),
    })
    .strict(),
  z
    .object({
      visitId: z.uuid(),
      name: z.literal('recommend_error'),
      props: z.object({ status: z.string().trim().min(1).max(20) }).strict(),
    })
    .strict(),
])

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>
