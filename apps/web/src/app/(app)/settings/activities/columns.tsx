'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { ActivityForm } from './activity-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Activity = RouterOutput['getActivities']['activities'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Activity>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'feePercentage',
    header: tableDataButton('Taxa (%)'),
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
      <ActivityForm refetch={refetch} activity={row.original} />
    ),
  },
]
