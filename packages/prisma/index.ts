// import { env } from '@gincana/env'
// import { neonConfig, Pool } from '@neondatabase/serverless'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { PrismaClient } from '@prisma/client'
// import ws from 'ws'

// const prismaClientSingleton = () => {
//   neonConfig.webSocketConstructor = ws
//   return new PrismaClient({
//     adapter: new PrismaNeon(
//       new Pool({
//         connectionString: env.DATABASE_URL,
//       }),
//     ),
//   })
// }

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton> // eslint-disable-line no-var
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// export { prisma }

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

import { env } from '@gincana/env'
import { PrismaClient } from '@prisma/client'

export * from '@prisma/client'

export const prisma = new PrismaClient(
  env.NODE_ENV === 'development'
    ? {
        log: ['error', 'info', 'query', 'warn'],
      }
    : {
        log: ['error'],
      },
)
