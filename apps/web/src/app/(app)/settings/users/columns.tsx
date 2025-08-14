'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { UpdateActiveButton } from './update-active-button'
import { UpdateUserTypeSelector } from './update-user-type-selector'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = RouterOutput['getUsers']['users'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'userName',
    header: tableDataButton('Nome de usuário'),
  },
  {
    accessorKey: 'password',
    header: 'Senha',
  },
  {
    accessorKey: 'lastOnlineAt',
    header: 'Último acesso',
    cell: ({ getValue }) => {
      if(!getValue<string>()) {
        return '-'
      }

      return (
        <span>
          {format(new Date(getValue<string>()), 'dd/MM/yyyy HH:mm')}
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
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <UpdateActiveButton
            {...{
              id: row.original.id,
              isActive: row.original.isActive,
              refetch,
            }}
          />
          <UpdateUserTypeSelector
            {...{
              id: row.original.id,
              type: row.original.type,
              refetch,
            }}
          />
        </div>
      )
    },
  },
]
