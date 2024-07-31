import { Check } from 'lucide-react'
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'

import { Screen } from '@/components/screen'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { serverClient } from '@/lib/trpc/server'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Descontar pontos',
}

export default async function VotesPage() {
  unstable_noStore()
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

  const voteAnimated = !!votes.find((vote) => vote.type === 'ANIMATED')
  const voteOrganized = !!votes.find((vote) => vote.type === 'ORGANIZED')

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">Votar nas equipes</h1>
          <Separator orientation="horizontal" />

          <div className={cn('w-full', voteAnimated && 'cursor-not-allowed')}>
            <Button
              disabled={voteAnimated}
              variant="outline"
              className={cn(
                'flex w-full items-center justify-between',
                voteAnimated &&
                  'border-green-400 text-green-800 dark:border-green-700 dark:text-green-500',
              )}
              asChild
            >
              <Link
                href="/vote/ANIMATED"
                className={cn(voteAnimated && 'pointer-events-none')}
                aria-disabled={voteAnimated}
                tabIndex={voteAnimated ? -1 : undefined}
              >
                Equipe mais animada {voteAnimated && <Check />}
              </Link>
            </Button>
          </div>

          <div className={cn('w-full', voteOrganized && 'cursor-not-allowed')}>
            <Button
              disabled={voteOrganized}
              variant="outline"
              className={cn(
                'flex w-full items-center justify-between',
                voteOrganized &&
                  'border-green-400 text-green-800 dark:border-green-700 dark:text-green-500',
              )}
              asChild
            >
              <Link
                href="/vote/ORGANIZED"
                className={cn(voteOrganized && 'pointer-events-none')}
                aria-disabled={voteOrganized}
                tabIndex={voteOrganized ? -1 : undefined}
              >
                Equipe mais organizada {voteOrganized && <Check />}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  )
}
