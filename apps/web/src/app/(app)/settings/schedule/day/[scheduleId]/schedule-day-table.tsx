'use client'

import Link from 'next/link'
import React from 'react'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'
import { WeekTime } from '@/utils/generate-days-with-times'

import { columns, ScheduleDay } from './columns'
import { ScheduleDayForm } from './schedule-day-form'
import { ScheduleMultipleDaysFormDialog } from './schedule-multiple-days-dialog'
import { Schedule } from './schedule-multiple-days-form'

type IProps = {
  scheduleDays: ScheduleDay[]
  schedule: Schedule
  defaultWeekTimes: WeekTime[]
}

export const ScheduleDaysTable: React.FC<IProps> = ({
  scheduleDays,
  schedule,
  defaultWeekTimes,
}) => {
  const { data, refetch } = trpc.getScheduleDays.useQuery({
    scheduleId: schedule.id,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dias abertos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch, scheduleId: schedule.id })}
          data={data?.scheduleDays || scheduleDays}
          addComponent={
            <>
              <Button variant="outline" asChild>
                <Link href={`/settings/schedule/day/${schedule.id}/week-times`}>
                  Horários Padrão
                </Link>
              </Button>
              <ScheduleDayForm refetch={refetch} scheduleId={schedule.id} />
              <ScheduleMultipleDaysFormDialog
                refetch={refetch}
                schedule={schedule}
                defaultWeekTimes={defaultWeekTimes}
              />
            </>
          }
        />
      </CardContent>
    </Card>
  )
}
