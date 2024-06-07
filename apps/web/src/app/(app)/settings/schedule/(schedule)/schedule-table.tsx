'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, Schedule } from './columns'
import { ScheduleForm } from './schedule-form'

type IProps = {
  schedules: Schedule[]
}

export const SchedulesTable: React.FC<IProps> = ({ schedules }) => {
  const { data, refetch } = trpc.getSchedules.useQuery({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.schedules || schedules}
          addComponent={<ScheduleForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
