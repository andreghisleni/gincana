'use client'

import { ScoreOrdination, ScoreType } from '@gincana/schema'
import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

import { tableDataButton } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'

import { ActivityForm } from './activity-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Activity = RouterOutput['getActivities']['activities'][0]

type ColumnsProps = {
  refetch: () => void
}

// title
// description
// scoreType
// scoreOrdination
// scoreDescription
// defaultScore

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Activity>[] => [
  {
    accessorKey: 'title',
    header: tableDataButton('Título'),
  },
  {
    accessorKey: 'description',
    header: tableDataButton('Descrição'),
  },
  {
    accessorKey: 'scoreType',
    header: tableDataButton('Tipo de pontuação'),
    cell: ({ getValue }) => ScoreType[getValue<ScoreType>()] || getValue(),
  },
  {
    accessorKey: 'scoreOrdination',
    header: tableDataButton('Ordenação da pontuação'),
    cell: ({ getValue }) =>
      ScoreOrdination[getValue<ScoreOrdination>()] || getValue(),
  },
  {
    accessorKey: 'scoreDescription',
    header: tableDataButton('Descrição da pontuação'),
  },
  {
    accessorKey: 'defaultScore',
    header: tableDataButton('Pontuação padrão'),
    cell: ({ getValue }) => getValue() || '-',
  },
  {
    accessorKey: 'numberOfTeams',
    header: tableDataButton('Número de equipes'),
    cell: ({ getValue }) => (getValue() === 0 ? 'Todas' : getValue()) || '-',
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
        <ActivityForm refetch={refetch} activity={row.original} />
        <Button variant="outline" asChild>
          <Link href={`/activity/${row.original.id}`}>Lançar pontuação</Link>
        </Button>
      </>
    ),
  },
]
