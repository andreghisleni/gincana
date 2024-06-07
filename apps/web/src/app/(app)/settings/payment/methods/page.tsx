import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { PaymentMethodsTable } from './payment-method-table'

export const metadata: Metadata = {
  title: 'Schedule Type settings',
}

export default async function PaymentMethodPage() {
  unstable_noStore()

  const { paymentMethods } = await serverClient.getPaymentMethods()

  return <PaymentMethodsTable paymentMethods={paymentMethods} />
}
