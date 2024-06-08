import { unstable_noStore } from 'next/cache'
import { z } from 'zod'

import { Screen } from '@/components/screen'
import { ShowJson } from '@/components/show-json'
import { serverClient } from '@/lib/trpc/server'

const activityPagePropsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export type ActivityPageProps = z.infer<typeof activityPagePropsSchema>

export default async function ActivityPage(p: ActivityPageProps) {
  unstable_noStore()

  const props = await activityPagePropsSchema.safeParseAsync(p)

  if (!props.success) {
    return <div>Invalid props</div>
  }

  const { id } = props.data.params

  const { activity } = await serverClient.getActivity(id)

  return (
    <Screen>
      <h1>Activity Page {id}</h1>
      <ShowJson data={activity} />
    </Screen>
  )
}
