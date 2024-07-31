'use client'
import { Screen } from '@/components/screen'
import { ShowJson } from '@/components/show-json'
import { trpc } from '@/lib/trpc/react'

import { ActivityAllTeams } from './activity-all-teams'
import { ActivityTwoTeams } from './activity-two-teams'
import Loading from './loading'
import { ActivityOneTeam } from './one-team/activity-one-team'
import { Activity } from './page'

type ActivityProps = {
  activity: Activity
}

export function ActivityP({ activity }: ActivityProps) {
  const { data, refetch, isLoading } = trpc.getActivity.useQuery(activity.id)

  if (isLoading) {
    return <Loading />
  }

  const a = data?.activity

  if (!a) {
    return (
      <Screen>
        <h1>Activity Page {activity.id}</h1>
        <ShowJson data={{ activity, data }} />
      </Screen>
    )
  }

  if (a.numberOfTeams === 0) {
    return (
      <ActivityAllTeams
        activity={a}
        refetch={async () => {
          await refetch()
        }}
      />
    )
  }

  if (a.numberOfTeams === 1) {
    return (
      <ActivityOneTeam
        activity={a}
        refetch={async () => {
          await refetch()
        }}
      />
    )
  }

  if (a.numberOfTeams === 2) {
    return (
      <ActivityTwoTeams
        activity={a}
        refetch={async () => {
          await refetch()
        }}
      />
    )
  }

  return (
    <Screen>
      <ShowJson data={{ activity, data }} />
    </Screen>
  )
}
