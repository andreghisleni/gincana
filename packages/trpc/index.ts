import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { activitiesRouter } from './routers/activity'
import { reportsRouter } from './routers/report'
import { reportMotivesRouter } from './routers/report-motives'
import { scoresRouter } from './routers/score'
import { teamsRouter } from './routers/team'
import { usersRouter } from './routers/users'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(
  usersRouter,
  activitiesRouter,
  teamsRouter,
  scoresRouter,
  reportMotivesRouter,
  reportsRouter,
)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
