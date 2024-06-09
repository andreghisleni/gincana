import { z } from 'zod'

export const scoreSchema = z
  .object({
    score: z.number().min(0).describe('Pontuação'),
    teamId: z.string().uuid().describe('ID da equipe'),
    activityId: z.string().uuid().describe('ID da atividade'),
  })
  .describe('Score')
