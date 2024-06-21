import { auth } from '@gincana/auth'
import { RouterOutput } from '@gincana/trpc'
import { unstable_noStore } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'
import { z } from 'zod'

import { serverClient } from '@/lib/trpc/server'

import { ActivityP } from './activity'

const activityPagePropsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export type ActivityPageProps = z.infer<typeof activityPagePropsSchema>

export type Activity = NonNullable<RouterOutput['getActivity']['activity']>

export default async function ActivityPage(p: ActivityPageProps) {
  unstable_noStore()

  const props = await activityPagePropsSchema.safeParseAsync(p)

  if (!props.success) {
    return <div>Invalid props</div>
  }

  const { id } = props.data.params
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>
  }

  if (!!session.user.activityId && session.user.activityId !== id) {
    return redirect(
      `/activity/${session.user.activityId}`,
      RedirectType.replace,
    )
  }

  const { activity } = await serverClient.getActivity(id)

  if (!activity) {
    return <div>Activity not found</div>
  }

  return <ActivityP activity={activity} />
}
