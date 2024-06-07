import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ClinicsTable } from './clinics-table'

export const metadata: Metadata = {
  title: 'Schedule Type settings',
}

export default async function ClinicsPage() {
  unstable_noStore()

  const { clinics } = await serverClient.getClinics({})

  return <ClinicsTable clinics={clinics} />
}
