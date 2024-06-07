import { z } from 'zod'

const clientDefFields = {
  name: z.string().min(1),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  isALongTimeClient: z.coerce.boolean().optional(),
  comments: z.string().optional(),
  sex: z.string().optional(),
  civilStatus: z.string().optional(),
  occupation: z.string().optional(),
  cep: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  cityOfBirth: z.string().optional(),
  indication: z.string().optional(),

  // if fatherId is present, it must be a valid UUID
  // if fatherId is not present, it must be undefined

  fatherId: z.string().optional(),
  motherId: z.string().optional(),
}

export const clientFormSchema = z.object({
  ...clientDefFields,
  birthDate: z.string().optional(),
  firstConsultation: z.string().optional(),
})

export const clientFields = {
  ...clientDefFields,
  birthDate: z.coerce.date().optional(),
  firstConsultation: z.coerce.date().optional(),
}

export const clientSchema = z.object(clientFields)
