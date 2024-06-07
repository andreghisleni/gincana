import { RouterOutput } from '@gincana/trpc'

import { generateDaysWithTimes } from '@/utils/generate-days-with-times'

export type WeekTime =
  RouterOutput['getScheduleDefaultWeekTimes']['scheduleDefaultWeekTimes'][0]

export function LoadDays({
  defaultWeekTimes,
}: {
  defaultWeekTimes: WeekTime[]
}) {
  const year = 2024
  const month = 2

  const allWeekDaysWithTimes = generateDaysWithTimes({
    year,
    month,
    defaultWeekTimes,
  })

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            year,
            month,

            allWeekDaysWithTimes,

            length: [allWeekDaysWithTimes.length],
          },
          null,
          2,
        )}
      </pre>
    </div>
  )
}
