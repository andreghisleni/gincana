import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { serverClient } from '@/lib/trpc/server'

export const metadata: Metadata = {
  title: `Dias abertos`,
}

export default async function CalendarPage() {
  unstable_noStore()

  const { schedules } = await serverClient.getSchedules({})

  redirect(`/settings/schedule/day/${schedules[0].id}`)

  return null
}
