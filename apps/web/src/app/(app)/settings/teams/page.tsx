import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { TeamsTable } from './team-table'

export const metadata: Metadata = {
  title: 'Equipes',
}

export default async function TeamPage() {
  unstable_noStore()

  const { teams } = await serverClient.getTeams()

  return <TeamsTable teams={teams} />
}
