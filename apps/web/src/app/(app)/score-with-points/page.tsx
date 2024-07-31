import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Screen } from '@/components/screen'
import { serverClient } from '@/lib/trpc/server'

import { PointsTable } from './points-table'
import { processScores } from './process-scores'
import { ScoresTable } from './scores-table'

export const metadata: Metadata = {
  title: 'Pontuações',
}

export default async function ScoresPage() {
  unstable_noStore()

  const { teams } = await serverClient.getTeams()
  const { activities } = await serverClient.getActivities()
  const { reportMotives } = await serverClient.getReportMotives()

  const scores = teams.map((team) => team.scores).flat()
  const teamsWithOutScores = teams.map((team) => ({
    ...team,
    scores: undefined,
  }))

  const activitiesWithScores = activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
    scoreType: activity.scoreType,
    scoreOrdination: activity.scoreOrdination,
    scoreDescription: activity.scoreDescription,
    scores: scores.filter((score) => score.activityId === activity.id),
  }))

  const dataProcessed = processScores({
    teams: teamsWithOutScores,
    activitiesWithScores,
    reportMotives,
  })

  return (
    <Screen>
      <PointsTable teams={dataProcessed.teamsWithScoresAndTotalPoints as any /*eslint-disable-line*/} />

      <ScoresTable
        title="Pontuação total das equipes"
        teams={dataProcessed.teamsWithScoresAndTotalPoints as any /*eslint-disable-line*/}
        activities={activities}
      />
    </Screen>
  )
}
