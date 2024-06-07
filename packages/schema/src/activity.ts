import { z } from 'zod'

export const activitySchema = z
  .object({
    name: z.string().min(1).describe('Nome do método de pagamento'),
    feePercentage: z.coerce.number().describe('Taxa (%)'),

    title: z.string().min(1).describe('Título da atividade'),
    description: z.string().min(1).describe('Descrição da atividade'),
    scoreType: z
      .enum(['NUMBER', 'TIME', 'DISTANCE', 'WEIGHT', 'POINTS'])
      .describe('Tipo de pontuação'),
    scoreOrdination: z
      .enum(['NONE', 'BIGGER', 'SMALLER', 'CLOSER'])
      .describe('Ordenação da pontuação'),
    scoreDescription: z.string().min(1).describe('Descrição da pontuação'),
    defaultScore: z.coerce.number().describe('Pontuação padrão'),
  })
  .describe('Método de pagamento')

export const activityUpdateSchema = activitySchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type Activity = z.infer<typeof activityUpdateSchema>

export enum ScoreType {
  NUMBER = 'Número',
  TIME = 'Tempo',
  DISTANCE = 'Distancia',
  WEIGHT = 'Peso',
  POINTS = 'Pontos',
}

export enum ScoreOrdination {
  NONE = 'Nenhuma',
  BIGGER = 'Maiores',
  SMALLER = 'Menores',
  CLOSER = 'Mais próximos',
}
