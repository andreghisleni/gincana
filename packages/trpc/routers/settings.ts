import { prisma } from '@gincana/prisma'
import { settingSchema } from '@gincana/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const settingsRouter = createTRPCRouter({
  getSettings: protectedProcedure.query(async () => {
    const settings = await prisma.settings.findFirst()

    if (!settings) {
      const newSettings = await prisma.settings.create({
        data: {},
      })

      return newSettings
    }

    return settings
  }),

  updateSettings: protectedProcedure
    .input(settingSchema)
    .mutation(async ({ input }) => {
      const settings = await prisma.settings.findFirst()

      if (!settings) {
        throw new Error('Settings not found')
      }

      return await prisma.settings.update({
        where: {
          id: settings.id,
        },
        data: input,
      })
    }),
})
