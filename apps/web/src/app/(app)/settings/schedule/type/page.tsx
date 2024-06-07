import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ScheduleTypesTable } from './schedule-type-table'

export const metadata: Metadata = {
  title: 'Schedule Type settings',
}

export default async function ScheduleTypePage() {
  unstable_noStore()

  const { scheduleTypes } = await serverClient.getScheduleTypes({})

  return <ScheduleTypesTable scheduleTypes={scheduleTypes} />
}
