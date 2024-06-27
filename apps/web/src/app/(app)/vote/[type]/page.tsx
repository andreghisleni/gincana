import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { Screen } from '@/components/screen'
import { Separator } from '@/components/ui/separator'
import { serverClient } from '@/lib/trpc/server'

import { VoteForm } from './vote-form'

export const metadata: Metadata = {
  title: 'Votações',
}

const propsSchema = z.object({
  params: z.object({
    type: z.enum(['ANIMATED', 'ORGANIZED']),
  }),
})

export type ScoresPageProps = z.infer<typeof propsSchema>

export default async function ScoresPage(props: ScoresPageProps) {
  unstable_noStore()

  const safeParseProps = await propsSchema.safeParseAsync(props)

  if (!safeParseProps.success) {
    return <div>Invalid props</div>
  }

  const { type } = safeParseProps.data.params

  const { teams } = await serverClient.getTeams()
  if (!teams) {
    return (
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className="text-xl">Votar nas equipes</h1>
          <Separator orientation="horizontal" />
          <h1 className="text-center text-4xl">Teams not found</h1>
        </div>
      </div>
    )
  }

  const { votes } = await serverClient.getElectorVotes()
  // const teams = null

  const { saveVote } = await serverClient.getSettings()

  if (!saveVote) {
    return (
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className="text-xl">Votar nas equipes</h1>
          <Separator orientation="horizontal" />
          <h1 className="text-center text-4xl">A votação está desativada</h1>
        </div>
      </div>
    )
  }

  if (votes.length >= 2) {
    redirect('/vote')
  }

  const voteAnimated = !!votes.find((vote) => vote.type === 'ANIMATED')
  const voteOrganized = !!votes.find((vote) => vote.type === 'ORGANIZED')

  if (voteAnimated && type === 'ANIMATED') {
    redirect('/vote')
  }

  if (voteOrganized && type === 'ORGANIZED') {
    redirect('/vote')
  }

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">
            Votar na equipe:{' '}
            <span className="font-bold">
              {type === 'ANIMATED' ? 'MAIS ANIMADA' : 'MAIS ORGANIZADA'}
            </span>
          </h1>
          <Separator orientation="horizontal" />
          <VoteForm teams={teams} type={type} />
        </div>
      </div>
    </Screen>
  )
}
