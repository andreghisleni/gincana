'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, Discount } from './columns'
import { DiscountForm } from './discount-form'

type IProps = {
  discounts: Discount[]
}

export const DiscountsTable: React.FC<IProps> = ({ discounts }) => {
  const { data, refetch } = trpc.getDiscounts.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Descontos Padrão</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.discounts || discounts}
          addComponent={<DiscountForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
