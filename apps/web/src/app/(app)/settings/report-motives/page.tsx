import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ReportMotivesTable } from './report-motive-table'

export const metadata: Metadata = {
  title: 'Motivos de denúncia',
}

export default async function ReportMotivePage() {
  unstable_noStore()

  const { reportMotives } = await serverClient.getReportMotives()

  return <ReportMotivesTable reportMotives={reportMotives} />
}
