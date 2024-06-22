import { prisma } from '@gincana/prisma'
import { reportSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const reportsRouter = createTRPCRouter({
  createReport: protectedProcedure
    .input(reportSchema)
    .mutation(async ({ input, ctx }) => {
      const spyId = ctx.session.user.id

      if (!spyId) {
        throw new Error('User not found')
      }

      const spy = await prisma.user.findUnique({
        where: {
          id: spyId,
        },
      })

      if (!spy) {
        throw new Error('Spy/user not found')
      }

      const team = await prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
      })

      if (!team) {
        throw new Error('Team not found')
      }

      const motive = await prisma.reportMotive.findUnique({
        where: {
          id: input.motiveId,
        },
      })

      if (!motive) {
        throw new Error('Motive not found')
      }

      const reportExists = await prisma.report.findFirst({
        where: {
          teamId: input.teamId,
          motiveId: input.motiveId,
          spyId,
          description: input.description,
          createdAt: {
            // criado nos últimos 10 segundos
            gte: new Date(new Date().getTime() - 10000),
          },
        },
      })

      if (reportExists) {
        throw new Error('Report already exists')
      }

      const report = await prisma.report.create({
        data: {
          teamId: input.teamId,
          motiveId: input.motiveId,
          spyId,
          description: input.description,
        },
      })

      return report
    }),

  getTotalReports: protectedProcedure.query(async () => {
    const totalReports = await prisma.report.count()

    return { totalReports }
  }),
})
