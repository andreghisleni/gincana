'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { ScheduleTypeForm } from './schedule-type-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduleType = RouterOutput['getScheduleTypes']['scheduleTypes'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({
  refetch,
}: ColumnsProps): ColumnDef<ScheduleType>[] => [
    {
      accessorKey: 'name',
      header: tableDataButton('Nome'),
    },
    {
      accessorKey: 'description',
      header: tableDataButton('Descrição'),
    },
    {
      accessorKey: 'price',
      header: tableDataButton('Preço'),
    },
    {
      accessorKey: 'time',
      header: tableDataButton('Tempo (minutos)'),
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
        <ScheduleTypeForm refetch={refetch} scheduleType={row.original} />
      ),
    },
  ]
