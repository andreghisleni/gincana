'use client'
import { Screen } from '@/components/screen'
import { ShowJson } from '@/components/show-json'
import { trpc } from '@/lib/trpc/react'

import { ActivityOneTeam } from './activity-one-team'
import Loading from './loading'
import { Activity } from './page'

type ActivityProps = {
  activity: Activity
}

export function ActivityP({ activity }: ActivityProps) {
  const { data, refetch, isLoading } = trpc.getActivity.useQuery(activity.id)

  if (isLoading) {
    return (
      // <Screen>
      //   <div className="flex justify-center">
      //     <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
      //       <h1 className=" text-xl">Loading...</h1>
      //     </div>
      //   </div>
      // </Screen>
      <Loading />
    )
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
      <Screen>
        <h1>Activity Page todas as equipes</h1>
        <ShowJson data={{ activity, data }} />
      </Screen>
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
      <Screen>
        <h1>Activity Page duas equipes por vez</h1>
        <ShowJson data={{ activity, data }} />
      </Screen>
    )
  }

  return (
    <Screen>
      <ShowJson data={{ activity, data }} />
    </Screen>
  )
}
