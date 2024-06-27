import { prisma } from '@gincana/prisma'
import { voteSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const votesRouter = createTRPCRouter({
  createVote: protectedProcedure
    .input(voteSchema)
    .mutation(async ({ input, ctx }) => {
      const electorId = ctx.session.user.id

      if (!electorId) {
        throw new Error('User not found')
      }

      const vote = await prisma.vote.findFirst({
        where: {
          electorId,
          teamId: input.teamId,
          type: input.type,
        },
      })

      if (vote) {
        throw new Error('Vote already exists')
      }

      return await prisma.vote.create({
        data: {
          type: input.type,
          teamId: input.teamId,
          electorId,
        },
      })
    }),

  getElectorVotes: protectedProcedure.query(async ({ ctx }) => {
    const electorId = ctx.session.user.id

    if (!electorId) {
      throw new Error('User not found')
    }

    const votes = await prisma.vote.findMany({
      where: {
        electorId,
      },
    })

    return { votes }
  }),

  getVotes: protectedProcedure.query(async () => {
    const votes = await prisma.vote.findMany()

    return { votes }
  }),

  getTotalVotes: protectedProcedure.query(async () => {
    const totalVotes = await prisma.vote.count()

    return { totalVotes }
  }),
})
