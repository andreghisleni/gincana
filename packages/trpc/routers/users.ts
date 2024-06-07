import { prisma } from '@gincana/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        userName: z.string().min(1),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const hashedPassword = await hash(input.password, 10)

      const user = await prisma.user.create({
        data: {
          name: input.name,
          userName: input.userName,
          passwordHash: hashedPassword,
        },
      })

      return user
    }),

  getUser: protectedProcedure.query(async ({ input }) => {
    const user = await prisma.user.findFirst({
      where: {
        id: input,
      },
    })

    return user
  }),
})
