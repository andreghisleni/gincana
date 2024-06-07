'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, WeekTime } from './columns'
import { WeekTimeForm } from './week-time-form'

type IProps = {
  scheduleDefaultWeekTimes: WeekTime[]
  scheduleId: string
}

export const WeekTimesTable: React.FC<IProps> = ({
  scheduleDefaultWeekTimes,
  scheduleId,
}) => {
  const { data, refetch } = trpc.getScheduleDefaultWeekTimes.useQuery({
    scheduleId,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horários por dia da semana</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch, scheduleId })}
          data={data?.scheduleDefaultWeekTimes || scheduleDefaultWeekTimes}
          addComponent={
            <WeekTimeForm refetch={refetch} scheduleId={scheduleId} />
          }
        />
      </CardContent>
    </Card>
  )
}
