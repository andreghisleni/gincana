'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

import { tableDataButton } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'

import { ClinicFormSheet } from './clinic-form-sheet'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Clinic = RouterOutput['getClinics']['clinics'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Clinic>[] => [
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
      <>
        <ClinicFormSheet refetch={refetch} clinic={row.original} />
        <Button variant="outline" asChild>
          <Link href={`/settings/clinics/${row.original.id}`}>Editar</Link>
        </Button>
      </>
    ),
  },
]
