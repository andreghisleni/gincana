import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/summary/loading'
import { TotalActivities } from '@/components/summary/total-activities'
import { TotalReports } from '@/components/summary/total-reports'
import { TotalScores } from '@/components/summary/total-scores'
import { TotalTeams } from '@/components/summary/total-teams'
import { TotalUsers } from '@/components/summary/total-users'
import { TotalVotes } from '@/components/summary/total-votes'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const revalidate = 900

export default function DashboardPage() {
  return (
    <div className="px-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalTeams />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalActivities />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalScores />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalReports />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalVotes />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<Loading />}>
            <TotalUsers />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
