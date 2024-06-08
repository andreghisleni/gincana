'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { TeamForm } from './team-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = RouterOutput['getTeams']['teams'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Team>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome da equipe'),
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
    cell: ({ row }) => <TeamForm refetch={refetch} team={row.original} />,
  },
]
