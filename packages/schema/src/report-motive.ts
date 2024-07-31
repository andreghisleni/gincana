import { z } from 'zod'

export const reportMotiveSchema = z
  .object({
    name: z.string().min(1).describe('Nome do motivo da denuncia'),
    description: z
      .string()
      .min(10)
      .nullable()
      .describe('Descrição do motivo da denuncia'),
    discountPoint: z.coerce
      .number()
      .int()
      .positive()
      .describe('Pontuação de desconto'),
  })
  .describe('Motivo da denuncia')

export const reportMotiveUpdateSchema = reportMotiveSchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type ReportMotive = z.infer<typeof reportMotiveUpdateSchema>
