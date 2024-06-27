import { z } from 'zod'

export const voteFormSchema = z
  .object({
    teamId: z.string().uuid(),
  })
  .describe('Vote')

export const voteSchema = voteFormSchema.merge(
  z.object({
    type: z.enum(['ANIMATED', 'ORGANIZED']),
  }),
)
