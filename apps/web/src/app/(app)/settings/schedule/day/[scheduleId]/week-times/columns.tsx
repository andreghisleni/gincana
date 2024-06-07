'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { DayOfWeek, WeekTimeForm } from './week-time-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WeekTime =
  RouterOutput['getScheduleDefaultWeekTimes']['scheduleDefaultWeekTimes'][0]

type ColumnsProps = {
  refetch: () => void
  scheduleId: string
}

type WeekTimes =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'

export const columns = ({
  refetch,
  scheduleId,
}: ColumnsProps): ColumnDef<WeekTime>[] => [
    {
      accessorKey: 'dayOfWeek',
      header: tableDataButton('Dia'),
      cell: ({ getValue }) => {
        return <span>{DayOfWeek[getValue<WeekTimes>()]}</span>
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
        <WeekTimeForm
          refetch={refetch}
          weekTime={row.original}
          scheduleId={scheduleId}
        />
      ),
    },
  ]
