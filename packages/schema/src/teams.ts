import { z } from 'zod'

export const teamSchema = z
  .object({
    name: z.string().min(1).describe('Nome da equipe'),
  })
  .describe('Equipe')

export const teamUpdateSchema = teamSchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type Team = z.infer<typeof teamUpdateSchema>
