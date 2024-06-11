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

  createUserWithActivity: protectedProcedure
    .input(
      z.object({
        activityId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const activity = await prisma.activity.findUnique({
        where: {
          id: input.activityId,
        },
      })

      if (!activity) {
        throw new Error('Activity not found')
      }

      // create a random password with 5 characters
      const password = Math.random().toString(36).slice(-5)

      // create userName from 5 random characters from the activity title
      const userName = activity.title
        .toLowerCase()
        .replaceAll(' ', '')
        .normalize('NFD')
        .split('')
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .join('')
        .toLowerCase()

      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          name: activity.title,
          userName,
          passwordHash: hashedPassword,
          activityId: input.activityId,
          password,
        },
      })

      return user
    }),
})
