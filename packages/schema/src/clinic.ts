import { z } from 'zod'

export const clinicFields = {
  name: z.string().min(1),
  description: z.string().optional(),
}

export const clinicSchema = z.object(clinicFields)

export const clinicUpdateFormFields = {
  ...clinicFields,
  doctorName: z.string().min(1),
  address: z.string().min(1),
  slug: z.string().min(1),
  evolutionApiUrl: z.string().url(),
  evolutionApiKey: z.string().min(1),
}

export const clinicUpdateFormSchema = z.object(clinicUpdateFormFields)

export const clinicUpdateFields = {
  ...clinicUpdateFormFields,
  id: z.string().uuid(),
}

export const clinicUpdateSchema = z.object(clinicUpdateFields)
