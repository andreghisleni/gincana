import { z } from 'zod'

export const scheduleDefaultWeekTimeFields = {
  times: z.array(z.string()),
}

export const scheduleDefaultWeekTimeToCreateFields = {
  ...scheduleDefaultWeekTimeFields,
  dayOfWeek: z.union([
    z.literal('SUNDAY'),
    z.literal('MONDAY'),
    z.literal('TUESDAY'),
    z.literal('WEDNESDAY'),
    z.literal('THURSDAY'),
    z.literal('FRIDAY'),
    z.literal('SATURDAY'),
  ]),
  scheduleId: z.string().uuid(),
}

export const scheduleDefaultWeekTimeToUpdateFields = {
  ...scheduleDefaultWeekTimeFields,
  id: z.string(),
}

export const scheduleDefaultWeekTimeToCreateSchema = z.object(
  scheduleDefaultWeekTimeToCreateFields,
)

export const scheduleDefaultWeekTimeToUpdateSchema = z.object(
  scheduleDefaultWeekTimeToUpdateFields,
)
