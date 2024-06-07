'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { ScheduleDayForm } from './schedule-day-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduleDay = RouterOutput['getScheduleDays']['scheduleDays'][0]

type ColumnsProps = {
  refetch: () => void
  scheduleId: string
}

export const columns = ({
  refetch,
  scheduleId,
}: ColumnsProps): ColumnDef<ScheduleDay>[] => [
    {
      accessorKey: 'day',
      header: tableDataButton('Dia'),
      cell: ({ row }) => {
        return format(new Date(row.getValue('day')), 'dd/MM/yyyy')
      },
    },
    {
      accessorKey: 'times',
      header: tableDataButton('Horas'),
      cell: ({ row }) => {
        return (
          <span className="flex max-w-60 flex-wrap gap-1">
            {row.original.times?.map((time, index) => (
              <span key={time} className="flex gap-1">
                {time} {index + 1 !== row.original.times.length && <span>|</span>}
              </span>
            ))}
          </span>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ row }) => {
        return (
          <span>
            {format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}
          </span>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <ScheduleDayForm
          refetch={refetch}
          scheduleDay={row.original}
          scheduleId={scheduleId}
        />
      ),
    },
  ]
