'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, ScheduleType } from './columns'
import { ScheduleTypeForm } from './schedule-type-form'

type IProps = {
  scheduleTypes: ScheduleType[]
}

export const ScheduleTypesTable: React.FC<IProps> = ({ scheduleTypes }) => {
  const { data, refetch } = trpc.getScheduleTypes.useQuery({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Procedimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.scheduleTypes || scheduleTypes}
          addComponent={<ScheduleTypeForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
