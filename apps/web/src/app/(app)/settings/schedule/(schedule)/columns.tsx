'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { ScheduleForm } from './schedule-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Schedule = RouterOutput['getSchedules']['schedules'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Schedule>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'description',
    header: tableDataButton('Descrição'),
  },
  {
    accessorKey: 'startTime',
    header: tableDataButton('Início'),
  },
  {
    accessorKey: 'endTime',
    header: tableDataButton('Fim'),
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
      <ScheduleForm refetch={refetch} schedule={row.original} />
    ),
  },
]
