import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { WeekTimesTable } from './week-times-table'

export const metadata: Metadata = {
  title: 'Schedule week times',
}

export default async function SchedulePage({
  params: { scheduleId },
}: {
  params: { scheduleId: string }
}) {
  unstable_noStore()

  const { scheduleDefaultWeekTimes } =
    await serverClient.getScheduleDefaultWeekTimes({
      scheduleId,
    })

  return (
    <WeekTimesTable
      scheduleDefaultWeekTimes={scheduleDefaultWeekTimes}
      scheduleId={scheduleId}
    />
  )
}
