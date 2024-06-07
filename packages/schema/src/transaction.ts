import { z } from 'zod'

export const transactionSchema = z
  .object({
    amount: z.coerce.number(),
    description: z.string().optional(),

    outcomeDetails: z
      .object({
        scheduledDate: z.coerce.date().optional(),
        proofOfPayment: z.string().optional(),
        status: z.enum(['PENDING', 'SCHEDULED', 'CANCELLED', 'PAID']),
      })
      .optional(),
    incomeDetails: z
      .object({
        amountBeforeDiscount: z.coerce.number(),
        paymentMethodId: z.string().uuid(),
        discountId: z.string().optional(),
        discountAmount: z.coerce.number().optional(),
        scheduleItemId: z.string().uuid().optional(),
      })
      .optional(),
    type: z.enum(['INCOME', 'OUTCOME']),
  })
  .refine((data) => {
    if (data.type === 'INCOME') {
      return data.incomeDetails !== undefined
    }
    if (data.type === 'OUTCOME') {
      return data.outcomeDetails !== undefined
    }
    return false
  })
