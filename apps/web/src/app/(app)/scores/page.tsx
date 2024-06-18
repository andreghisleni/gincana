import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Screen } from '@/components/screen'
import { serverClient } from '@/lib/trpc/server'

import { ScoresTable } from './scores-table'

export const metadata: Metadata = {
  title: 'Equipes',
}

export default async function ScoresPage() {
  unstable_noStore()

  const { teams } = await serverClient.getTeams()
  const { activities } = await serverClient.getActivities()

  // split activities into 3 arrays on the middle
  const half = Math.ceil(activities.length / 3)
  const activities1 = activities.slice(0, half)
  const activities2 = activities.slice(half)

  return (
    <Screen>
      <ScoresTable teams={teams} activities={activities1} />
      <ScoresTable teams={teams} activities={activities2} />
    </Screen>
  )
}
