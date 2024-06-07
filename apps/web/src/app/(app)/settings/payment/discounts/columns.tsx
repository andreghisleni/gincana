'use client'

import { DiscountType } from '@gincana/schema'
import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'

import { DiscountForm } from './discount-form'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Discount = RouterOutput['getDiscounts']['discounts'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Discount>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'description',
    header: tableDataButton('Descrição'),
  },
  {
    accessorKey: 'discountType',
    header: tableDataButton('Tipo de desconto'),
    cell: ({ row }) => (<span>{DiscountType[row.getValue('discountType') as any]}</span>) // eslint-disable-line
  },
  {
    accessorKey: 'discountValue',
    header: tableDataButton('Valor do desconto'),
    cell: ({ row }) => {
      return <span>{row.getValue('discountValue')}</span>
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
      <DiscountForm refetch={refetch} discount={row.original} />
    ),
  },
]
