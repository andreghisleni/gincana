import { z } from 'zod'

export const consultationFormFields = {
  text: z.string().nullable(),
  prescription: z.string().nullable(),
}

export const consultationFieldsCreateAndEdit = {
  ...consultationFormFields,
}

export const consultationCreateSchema = z.object({
  ...consultationFieldsCreateAndEdit,
  clientId: z.string().uuid(),
  scheduleItemId: z.string().uuid().optional(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date(),
})

export const consultationEditSchema = z.object({
  id: z.string().uuid(),
  ...consultationFieldsCreateAndEdit,
})

export const consultationFormSchema = z.object(consultationFormFields)

export type ConsultationForm = z.infer<typeof consultationFormSchema>
