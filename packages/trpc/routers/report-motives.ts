import { prisma } from '@gincana/prisma'
import { reportMotiveSchema, reportMotiveUpdateSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const reportMotivesRouter = createTRPCRouter({
  createReportMotive: protectedProcedure
    .input(reportMotiveSchema)
    .mutation(async ({ input }) => {
      const findReportMotive = await prisma.reportMotive.findUnique({
        where: {
          name: input.name,
        },
      })

      if (findReportMotive) {
        throw new Error('ReportMotive already exists')
      }

      const reportMotive = await prisma.reportMotive.create({
        data: input,
      })

      return reportMotive
    }),

  getReportMotive: protectedProcedure.query(async ({ input }) => {
    const reportMotive = await prisma.reportMotive.findUnique({
      where: {
        id: input,
      },
    })

    return { reportMotive }
  }),

  getReportMotives: protectedProcedure.query(async () => {
    const reportMotives = await prisma.reportMotive.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return { reportMotives }
  }),

  getTotalReportMotives: protectedProcedure.query(async () => {
    const totalReportMotives = await prisma.reportMotive.count()

    return { totalReportMotives }
  }),

  updateReportMotive: protectedProcedure
    .input(reportMotiveUpdateSchema)
    .mutation(async ({ input }) => {
      const findReportMotive = await prisma.reportMotive.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!findReportMotive) {
        throw new Error('ReportMotive not found')
      }

      if (input.name !== findReportMotive.name) {
        const findReportMotive = await prisma.reportMotive.findUnique({
          where: {
            name: input.name,
          },
        })

        if (findReportMotive) {
          throw new Error('ReportMotive already exists')
        }
      }

      const reportMotive = await prisma.reportMotive.update({
        where: {
          id: input.id,
        },
        data: input,
      })

      return reportMotive
    }),
})
