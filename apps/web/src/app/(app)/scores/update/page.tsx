import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Screen } from '@/components/screen'
import { serverClient } from '@/lib/trpc/server'

import { ScoresTable } from './scores-table'

export const metadata: Metadata = {
  title: 'Pontuações',
}

export default async function ScoresPage() {
  unstable_noStore()

  const { teams } = await serverClient.getTeams()
  const { activities } = await serverClient.getActivities()

  const activities2 = activities.filter((a) => !!a.number)

  return (
    <Screen>
      <ScoresTable
        teams={teams}
        activities={activities2}
      />
    </Screen>
  )
}
