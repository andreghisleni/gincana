import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { activitiesRouter } from './routers/activity'
import { teamsRouter } from './routers/team'
import { usersRouter } from './routers/users'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(
  usersRouter,
  activitiesRouter,
  teamsRouter,
)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
