'use client'
import { Screen } from '@/components/screen'
import { ShowJson } from '@/components/show-json'
import { trpc } from '@/lib/trpc/react'

import { ActivityOneTeam } from './activity-one-team'
import { Activity } from './page'

type ActivityProps = {
  activity: Activity
}

export function ActivityP({ activity }: ActivityProps) {
  const { data, refetch } = trpc.getActivity.useQuery(activity.id)

  if (activity?.numberOfTeams === 0) {
    return (
      <Screen>
        <h1>Activity Page todas as equipes</h1>
        <ShowJson data={{ activity, data }} />
      </Screen>
    )
  }

  if (activity?.numberOfTeams === 1) {
    return <ActivityOneTeam activity={activity} refetch={refetch} />
  }

  if (activity?.numberOfTeams === 2) {
    return (
      <Screen>
        <h1>Activity Page duas equipes por vez</h1>
        <ShowJson data={{ activity, data }} />
      </Screen>
    )
  }

  return (
    <Screen>
      <h1>Activity Page {activity.id}</h1>
      <ShowJson data={{ activity, data }} />
    </Screen>
  )
}
