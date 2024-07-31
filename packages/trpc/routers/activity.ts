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
        scores: {
          include: {
            scoresWithMultipleTeams: true,
          },
        },
        products: true,
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
            scoresWithMultipleTeams: true,
          },
        },
        User: true,
        products: true,
      },
      orderBy: {
        number: 'asc',
      },
    })

    return { activities }
  }),

  getTotalActivities: protectedProcedure.query(async () => {
    const totalActivities = await prisma.activity.count()

    return { totalActivities }
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

  updateProducts: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        products: z.array(
          z.object({
            name: z.string(),
            price: z.coerce.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const findActivity = await prisma.activity.findFirst({
        where: {
          id: input.id,
        },
        include: {
          products: true,
        },
      })

      if (!findActivity) {
        throw new Error('Activity not found')
      }

      if (findActivity.scoreType !== 'PRICE') {
        throw new Error('Cannot change products')
      }

      if (input.products.length === findActivity.products.length) {
        const isSame = input.products.every((product, index) => {
          return product.name === findActivity.products[index].name
        })

        if (isSame) {
          return findActivity
        }
      }

      if (input.products.length !== findActivity.products.length) {
        // check if all products are unique
        const uniqueProducts = new Set(
          input.products.map((product) => product.name),
        )

        if (uniqueProducts.size !== input.products.length) {
          throw new Error('Products must be unique')
        }

        // check removed products
        const removedProducts = findActivity.products.filter((product) => {
          return !input.products.some((p) => p.name === product.name)
        })

        if (removedProducts.length > 0) {
          await prisma.activityProduct.deleteMany({
            where: {
              id: {
                in: removedProducts.map((product) => product.id),
              },
            },
          })
        }

        // check added products
        const addedProducts = input.products.filter((product) => {
          return !findActivity.products.some((p) => p.name === product.name)
        })

        if (addedProducts.length > 0) {
          await prisma.activityProduct.createMany({
            data: addedProducts.map((product) => ({
              name: product.name,
              price: product.price,
              activityId: input.id,
            })),
          })
        }
      }

      return {
        updated: true,
      }
    }),
})
