import { prisma } from '@gincana/prisma'
import { scoreSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const scoresRouter = createTRPCRouter({
  createScore: protectedProcedure
    .input(scoreSchema)
    .mutation(async ({ input }) => {
      const team = await prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
      })

      if (!team) {
        throw new Error('Team not found')
      }

      const teams = await prisma.team.findMany({
        where: {
          id: {
            in: input.teamsId,
          },
        },
      })

      if (teams.length !== input.teamsId?.length) {
        throw new Error('Some teams not found')
      }

      const activity = await prisma.activity.findUnique({
        where: {
          id: input.activityId,
        },
      })

      if (!activity) {
        throw new Error('Activity not found')
      }

      const scoreExists = await prisma.score.findFirst({
        where: {
          teamId: input.teamId,
          activityId: input.activityId,
        },
      })

      if (scoreExists) {
        throw new Error('Score already exists')
      }

      const score = await prisma.score.create({
        data: {
          value: input.score,
          teamId: input.teamId,
          activityId: input.activityId,
          scoresWithMultipleTeams: {
            connect: input.teamsId.map((id) => ({
              id,
            })),
          },
        },
      })

      return score
    }),
})
