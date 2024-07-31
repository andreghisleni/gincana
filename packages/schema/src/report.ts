import { z } from 'zod'

export const reportSchema = z
  .object({
    description: z.string().optional().describe('Descrição da denúncia'),
    motiveId: z.string().uuid().describe('ID do motivo da denúncia'),
    teamId: z.string().uuid().describe('ID da equipe'),
  })
  .describe('Report')
