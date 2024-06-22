'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { ReportMotiveForm } from './report-motive-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportMotive = RouterOutput['getReportMotives']['reportMotives'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({
  refetch,
}: ColumnsProps): ColumnDef<ReportMotive>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome da equipe'),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ getValue }) => {
      return <span>{getValue<string | null>() || '-'}</span>
    },
  },
  {
    accessorKey: 'discountPoint',
    header: 'Pontuação de desconto',
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
      <ReportMotiveForm refetch={refetch} reportMotive={row.original} />
    ),
  },
]
