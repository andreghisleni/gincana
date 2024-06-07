'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
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
      </CardContent>
    </Card>
  )
}
