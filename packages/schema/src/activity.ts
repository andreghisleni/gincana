import { z } from 'zod'

export const activitySchema = z
  .object({
    title: z.string().min(1).describe('Título da atividade'),
    description: z.string().min(10).describe('Descrição da atividade'),
    scoreType: z
      .enum([
        'NUMBER',
        'OBJECTS',
        'TIME',
        'DISTANCE',
        'WEIGHT',
        'POINTS',
        'PRICE',
      ])
      .describe('Tipo de pontuação'),
    scoreOrdination: z
      .enum(['NONE', 'BIGGER', 'SMALLER', 'CLOSER'])
      .describe('Ordenação da pontuação'),
    scoreDescription: z.string().min(10).describe('Descrição da pontuação'),
    exactValue: z.coerce.number().optional().describe('Valor exato'),
    numbers: z
      .array(z.coerce.number())
      .optional()
      .describe('Números da somatória da pontuação'),
    defaultScore: z.coerce.number().optional().describe('Pontuação padrão'),
    numberOfTeams: z.coerce
      .number()
      .describe('Número de equipes, 0 para todas'),
  })
  .describe('Atividade')

export const activityUpdateSchema = activitySchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type Activity = z.infer<typeof activityUpdateSchema>

export enum ScoreType {
  NUMBER = 'Número',
  OBJECTS = 'Objetos',
  TIME = 'Tempo',
  DISTANCE = 'Distancia',
  WEIGHT = 'Peso',
  POINTS = 'Pontos',
  PRICE = 'Preço',
}

export enum ScoreOrdination {
  NONE = 'Nenhuma',
  BIGGER = 'Maiores',
  SMALLER = 'Menores',
  CLOSER = 'Mais próximos',
}
