import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ActivitiesTable } from './activity-table'

export const metadata: Metadata = {
  title: 'Atividades',
}

export default async function ActivityPage() {
  unstable_noStore()

  const { activities } = await serverClient.getActivities()

  return <ActivitiesTable activities={activities} />
}
