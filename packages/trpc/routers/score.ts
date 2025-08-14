import { prisma } from '@gincana/prisma'
import { scoreSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const scoresRouter = createTRPCRouter({
  createScore: protectedProcedure
    .input(scoreSchema)
    .mutation(async ({ input }) => {
      const settings = await prisma.settings.findFirst()

      if (!settings?.saveScore) {
        throw new Error('Save score is disabled')
      }

      const team = await prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
      })

      if (!team) {
        throw new Error('Team not found')
      }

      if (input.teamsId && input.teamsId.length > 0) {
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
            connect: input.teamsId?.map((id) => ({
              id,
            })),
          },
        },
      })

      return score
    }),

  updateScore: protectedProcedure
    .input(z.object({
      scoreId: z.string().uuid(),
      newValue: z.number(),
    }))
    .mutation(async ({ input }) => {
      const settings = await prisma.settings.findFirst()

      if (!settings?.saveScore) {
        throw new Error('Save score is disabled')
      }

      const scoreExists = await prisma.score.findUnique({
        where: {
          id: input.scoreId,
        },
      })

      if (!scoreExists) {
        throw new Error('Score not found')
      }

      const score = await prisma.score.update({
        where: {
          id: input.scoreId,
        },
        data: {
          value: input.newValue,
        },
      })

      return score
    }),

  getTotalScores: protectedProcedure.query(async () => {
    const totalScores = await prisma.score.count()

    return { totalScores }
  }),
})
