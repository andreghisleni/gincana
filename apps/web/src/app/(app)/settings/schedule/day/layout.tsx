import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { serverClient } from '@/lib/trpc/server'

import { Header } from './components/header'

export default async function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  unstable_noStore()

  const { schedules } = await serverClient.getSchedules({})

  if (!schedules) redirect('/settings/schedule')

  // if (schedules.length === 1) {
  //   redirect(`/settings/schedule/day/${schedules[0].id}`)
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <Header schedules={schedules} />
      {children}
    </div>
  )
}
