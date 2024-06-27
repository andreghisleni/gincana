import { ScoreOrdination, ScoreType } from '@prisma/client'

type Score = {
  id: string
  value: number
  activityId: string
  teamId: string
  createdAt: Date
  updatedAt: Date
}

export type NScore = Score & {
  nv: number
}

type ActivityWithScores = {
  id: string
  title: string
  scoreType: ScoreType
  scoreOrdination: ScoreOrdination
  scoreDescription: string | null
  scores: Score[]
}

type Report = {
  id: string
  motiveId: string
}

type Team = {
  id: string
  name: string
  reports: Report[]
}

type ReportMotive = {
  id: string
  discountPoint: number
}

type ProcessScoresProps = {
  teams: Team[]
  activitiesWithScores: ActivityWithScores[]
  reportMotives: ReportMotive[]
}

export function processScores({
  teams,
  activitiesWithScores,
  reportMotives,
}: ProcessScoresProps) {
  const teamsWithScores = teams.map((team) => ({
    ...team,
    scores: [] as NScore[],
  }))

  const activitiesWithOrderedScores = activitiesWithScores.map((activity) => ({
    ...activity,
    scores: [] as NScore[],
  }))

  for (const activity of activitiesWithScores) {
    if (activity.scoreType === 'POINTS' || activity.scoreType === 'PRICE') {
      // add nv (new value = value) to each score

      ;(activity.scores as NScore[]).forEach((score) => {
        score.nv = score.value
      })

      for (const score of activity.scores) {
        const team = teamsWithScores.find((t) => t.id === score.teamId)
        if (!team) {
          throw new Error(`Team not found for score ${score.id}`)
        }
        team.scores.push(score as NScore)
      }
      const a = activitiesWithOrderedScores.find((a) => a.id === activity.id)

      if (!a) {
        throw new Error(`Activity not found for activity ${activity.id}`)
      }

      a.scores = activity.scores as NScore[]
    }

    if (
      activity.scoreType === 'TIME' ||
      activity.scoreType === 'NUMBER' ||
      activity.scoreType === 'OBJECTS' ||
      activity.scoreType === 'WEIGHT' ||
      activity.scoreType === 'DISTANCE'
    ) {
      switch (activity.scoreOrdination) {
        case 'BIGGER':
          activity.scores.sort((a, b) => b.value - a.value)
          break
        case 'SMALLER':
          activity.scores.sort((a, b) => a.value - b.value)
          break
        case 'CLOSER': // Closer to 0
          activity.scores.sort((a, b) => Math.abs(a.value) - Math.abs(b.value))
          break
        default:
          throw new Error(
            `Invalid score ordination ${activity.scoreOrdination}`,
          )
      }

      // activity.scores.forEach((score, index) => {
      //   score.nv = activity.scores.length - index
      // })

      // activity.scores.forEach((score) => {
      //   // Encontra a posição do último score com o mesmo valor
      //   const lastSameValueIndex = activity.scores.findLastIndex(
      //     (s) => s.value === score.value,
      //   )

      //   // Calcula a pontuação com base no último score com valor igual
      //   score.nv = activity.scores.length - lastSameValueIndex
      // })

      ;(activity.scores as NScore[]).forEach((score, index) => {
        let lastSameValueIndex = index
        while (
          lastSameValueIndex < activity.scores.length - 1 &&
          activity.scores[lastSameValueIndex + 1].value === score.value
        ) {
          lastSameValueIndex++
        }
        score.nv = activity.scores.length - lastSameValueIndex
      })

      for (const score of activity.scores) {
        const team = teamsWithScores.find((t) => t.id === score.teamId)
        if (!team) {
          throw new Error(`Team not found for score ${score.id}`)
        }
        team.scores.push(score as NScore)
      }

      const a = activitiesWithOrderedScores.find((a) => a.id === activity.id)

      if (!a) {
        throw new Error(`Activity not found for activity ${activity.id}`)
      }

      a.scores = activity.scores as NScore[]
    }
  }

  const teamsWithScoresAndTotalPoints = teamsWithScores.map((team) => {
    const totalPoints = team.scores.reduce((acc, score) => acc + score.nv, 0)
    const totalReportPoints = team.reports
      .map((report) => ({
        ...report,
        points:
          reportMotives.find((m) => m.id === report.motiveId)?.discountPoint ??
          0,
      }))
      .reduce((acc, report) => acc + report.points, 0)
    return { ...team, totalPoints, totalReportPoints }
  })

  return {
    activitiesWithOrderedScores,
    teamsWithScores,
    teamsWithScoresAndTotalPoints,
  }
}
