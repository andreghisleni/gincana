import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Screen } from '@/components/screen'
import { serverClient } from '@/lib/trpc/server'

import { VotesTable } from './votes-table'

export const metadata: Metadata = {
  title: 'Pontuações',
}

export default async function VotesPage() {
  unstable_noStore()

  const { teams } = await serverClient.getTeams()

  const teamsWithTotalVotes = teams
    .map((team) => {
      return {
        ...team,
        totalVotes: team.votes.length,
      }
    })
    .sort((a, b) => b.totalVotes - a.totalVotes)

  return (
    <Screen>
      <VotesTable teams={teamsWithTotalVotes} />
    </Screen>
  )
}
