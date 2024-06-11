import { prisma } from '@gincana/prisma'
import { activitySchema, activityUpdateSchema } from '@gincana/schema'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const activitiesRouter = createTRPCRouter({
  createActivity: protectedProcedure
    .input(activitySchema)
    .mutation(async ({ input }) => {
      const activity = await prisma.activity.create({
        data: input,
      })

      return activity
    }),

  getActivity: protectedProcedure.input(z.string()).query(async ({ input }) => {
    const activity = await prisma.activity.findFirst({
      where: {
        id: input,
      },
      include: {
        scores: true,
      },
    })

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('a')
    //   }, 2000)
    // })

    return { activity }
  }),

  getActivities: protectedProcedure.query(async () => {
    const activities = await prisma.activity.findMany({
      include: {
        scores: {
          include: {
            team: true,
          },
        },
        User: true,
      },
    })

    return { activities }
  }),

  updateActivity: protectedProcedure
    .input(activityUpdateSchema)
    .mutation(async ({ input }) => {
      const findActivity = await prisma.activity.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!findActivity) {
        throw new Error('Activity not found')
      }

      if (input.scoreType !== findActivity.scoreType) {
        throw new Error('Cannot change score type')
      }

      const activity = await prisma.activity.update({
        where: {
          id: input.id,
        },
        data: input,
      })

      return activity
    }),
})
