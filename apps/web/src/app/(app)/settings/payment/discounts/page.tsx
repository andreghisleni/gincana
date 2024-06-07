import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { DiscountsTable } from './discount-table'

export const metadata: Metadata = {
  title: 'Schedule Type settings',
}

export default async function DiscountPage() {
  unstable_noStore()

  const { discounts } = await serverClient.getDiscounts()

  return <DiscountsTable discounts={discounts} />
}
