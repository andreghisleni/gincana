import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { SchedulesTable } from './schedule-table'

export const metadata: Metadata = {
  title: 'Schedule settings',
}

export default async function SchedulePage() {
  unstable_noStore()

  const { schedules } = await serverClient.getSchedules({})

  return <SchedulesTable schedules={schedules} />
}
