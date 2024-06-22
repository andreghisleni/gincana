import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Screen } from '@/components/screen'
import { Separator } from '@/components/ui/separator'
import { serverClient } from '@/lib/trpc/server'

import { Report } from './report'

export const metadata: Metadata = {
  title: 'Descontar pontos',
}

export default async function ScoresPage() {
  unstable_noStore()
  const { teams } = await serverClient.getTeams()
  const { reportMotives } = await serverClient.getReportMotives()
  // const teams = null

  if (!teams) {
    return (
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className="text-xl">Denunciar quebra das regras</h1>
          <Separator orientation="horizontal" />
          <h1 className="text-center text-4xl">Teams not found</h1>
        </div>
      </div>
    )
  }

  if (!reportMotives) {
    return (
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className="text-xl">Denunciar quebra das regras</h1>
          <Separator orientation="horizontal" />
          <h1 className="text-center text-4xl">Report Motives not found</h1>
        </div>
      </div>
    )
  }

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">Denunciar quebra das regras</h1>
          <Separator orientation="horizontal" />

          <Report teams={teams} motives={reportMotives} />
        </div>
      </div>
    </Screen>
  )
}
