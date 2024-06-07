import { z } from 'zod'

export enum DiscountType {
  PERCENTAGE = 'Desconto em porcentagem',
  FIXED_AMOUNT = 'Desconto em valor fixo',
  CUSTOM = 'Desconto customizado',
}

export const discountSchema = z
  .object({
    name: z.string().min(1).describe('Nome do desconto'),
    description: z.string().optional().describe('Descrição do desconto'),
    discountType: z
      .enum(['PERCENTAGE', 'FIXED_AMOUNT', 'CUSTOM'])
      .describe('Tipo de desconto'),
    discountValue: z.coerce.number().describe('Valor do desconto'),
  })
  .describe('Desconto')

export const discountUpdateSchema = discountSchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type Discount = z.infer<typeof discountUpdateSchema>
