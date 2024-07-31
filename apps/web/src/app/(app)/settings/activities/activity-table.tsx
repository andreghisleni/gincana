'use client'

import { env } from '@gincana/env'
import React from 'react'

import { DataTable } from '@/components/data-table'
import { ShowJson } from '@/components/show-json'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { ActivityForm } from './activity-form'
import { Activity, columns } from './columns'

type IProps = {
  activities: Activity[]
}

export const ActivitiesTable: React.FC<IProps> = ({ activities }) => {
  const { data, refetch } = trpc.getActivities.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.activities || activities}
          addComponent={<ActivityForm refetch={refetch} />}
        />
        <ShowJson
          data={{
            links: (data?.activities || activities).map((activity) => ({
              id: activity.id,
              title: activity.title,
              href: `${env.NEXT_PUBLIC_VERCEL_URL}/auth/sign-in?${new URLSearchParams(
                {
                  user: activity.User?.userName || '',
                  pass: activity.User?.password || '',
                },
              )}`,
              created_at: activity.createdAt,
            })),
          }}
        />
      </CardContent>
    </Card>
  )
}
