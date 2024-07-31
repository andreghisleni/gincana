import { z } from 'zod'

export const scoreSchema = z
  .object({
    score: z.number().min(0).describe('Pontuação'),
    teamId: z.string().uuid().describe('ID da equipe'),
    teamsId: z.array(z.string().uuid()).optional().describe('ID das equipes'),
    activityId: z.string().uuid().describe('ID da atividade'),
  })
  .describe('Score')
