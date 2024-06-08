import { prisma } from '@gincana/prisma'
import { teamSchema, teamUpdateSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const teamsRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(teamSchema)
    .mutation(async ({ input }) => {
      const findTeam = await prisma.team.findFirst({
        where: {
          name: input.name,
        },
      })

      if (findTeam) {
        throw new Error('Team already exists')
      }

      const team = await prisma.team.create({
        data: input,
      })

      return team
    }),

  getTeam: protectedProcedure.query(async ({ input }) => {
    const team = await prisma.team.findFirst({
      where: {
        id: input,
      },
    })

    return { team }
  }),

  getTeams: protectedProcedure.query(async () => {
    const teams = await prisma.team.findMany()

    return { teams }
  }),

  updateTeam: protectedProcedure
    .input(teamUpdateSchema)
    .mutation(async ({ input }) => {
      const findTeam = await prisma.team.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!findTeam) {
        throw new Error('Team not found')
      }

      if (input.name !== findTeam.name) {
        const findTeam = await prisma.team.findFirst({
          where: {
            name: input.name,
          },
        })

        if (findTeam) {
          throw new Error('Team already exists')
        }
      }

      const team = await prisma.team.update({
        where: {
          id: input.id,
        },
        data: input,
      })

      return team
    }),
})
