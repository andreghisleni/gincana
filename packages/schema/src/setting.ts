import { z } from 'zod'

export const settingSchema = z
  .object({
    saveScore: z.coerce.boolean(),
    saveReport: z.coerce.boolean(),
    saveVote: z.coerce.boolean(),
  })
  .describe('Settings')
