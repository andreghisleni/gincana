'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, PaymentMethod } from './columns'
import { PaymentMethodForm } from './payment-method-form'

type IProps = {
  paymentMethods: PaymentMethod[]
}

export const PaymentMethodsTable: React.FC<IProps> = ({ paymentMethods }) => {
  const { data, refetch } = trpc.getPaymentMethods.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.paymentMethods || paymentMethods}
          addComponent={<PaymentMethodForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
