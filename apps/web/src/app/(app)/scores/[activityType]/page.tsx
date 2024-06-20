import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { z } from 'zod'

import { Screen } from '@/components/screen'
import { serverClient } from '@/lib/trpc/server'

import { ScoresTable } from '../scores-table'

export const metadata: Metadata = {
  title: 'Pontuações',
}

const propsSchema = z.object({
  params: z.object({
    activityType: z.enum(['all', 'one-two']),
  }),
})

export type ScoresPageProps = z.infer<typeof propsSchema>

export default async function ScoresPage(props: ScoresPageProps) {
  unstable_noStore()

  const safeParseProps = await propsSchema.safeParseAsync(props)

  if (!safeParseProps.success) {
    return <div>Invalid props</div>
  }

  const { activityType } = safeParseProps.data.params

  const { teams } = await serverClient.getTeams()
  const { activities } = await serverClient.getActivities()

  const activitiesFiltered =
    activityType === 'all'
      ? activities.filter((a) => a.numberOfTeams === 0)
      : activities.filter((a) => a.numberOfTeams !== 0)

  const title =
    activityType === 'all'
      ? 'Pontuação por atividade e equipe, atividades de todas as equipes'
      : 'Pontuação por atividade e equipe, atividades de uma ou duas equipes'

  return (
    <Screen>
      <ScoresTable
        title={title}
        teams={teams}
        activities={activitiesFiltered}
      />
    </Screen>
  )
}
