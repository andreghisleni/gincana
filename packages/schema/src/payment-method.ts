import { z } from 'zod'

export const paymentMethodSchema = z
  .object({
    name: z.string().min(1).describe('Nome do método de pagamento'),
    feePercentage: z.coerce.number().describe('Taxa (%)'),
  })
  .describe('Método de pagamento')

export const paymentMethodUpdateSchema = paymentMethodSchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)

export type PaymentMethod = z.infer<typeof paymentMethodUpdateSchema>
