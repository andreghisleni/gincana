'use client'

import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { Screen } from '@/components/screen'
import { ShowJson } from '@/components/show-json'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { nativeClient } from '@/lib/trpc/client'
import { trpc } from '@/lib/trpc/react'

import { Activity } from './page'
import { Timer } from './timer'

type ActivityOneTeamProps = {
  activity: Activity
  refetch: () => void
}
type Team = {
  id: string
  name: string
}

export function ActivityOneTeam({ activity, refetch }: ActivityOneTeamProps) {
  const { data: teams, refetch: refetchTeams } = trpc.getTeams.useQuery()
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(() => {
    const selectedTeam = localStorage.getItem('selectedTeam')
    if (selectedTeam) {
      return JSON.parse(selectedTeam)
    }
    return null
  })
  const { toast } = useToast()

  if (!teams) {
    return <div>Teams not found</div>
  }

  const handleFinish = async (time: number) => {
    if (!selectedTeam) {
      toast({
        title: 'Selecione uma equipe',
        variant: 'destructive',
      })
      return
    }

    try {
      await nativeClient.createScore.mutate({
        activityId: activity.id,
        teamId: selectedTeam?.id,
        score: time,
      })
      toast({
        title: 'Pontuação enviada',
      })
      refetch()
      refetchTeams()

      localStorage.removeItem('selectedTeam')
      setSelectedTeam(null)
    } catch (error: any) {// eslint-disable-line
      toast({
        title: 'Erro ao enviar pontuação',
        variant: 'destructive',
        description: error.message,
      })
    }
  }

  const filteredTeamsWithOutScore = teams.teams.filter(
    (t) => activity.scores.find((s) => s.teamId === t.id) === undefined,
  )

  const filteredTeamsWithScore = teams.teams.filter(
    (t) => activity.scores.find((s) => s.teamId === t.id) !== undefined,
  )

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">Atividade: {activity.title}</h1>
          <Separator orientation="horizontal" />

          {!selectedTeam && (
            <div>
              <h2 className="text-lg">Selecione uma das equipes</h2>
              <div className="flex w-full flex-col gap-4">
                {filteredTeamsWithOutScore.map((t) => (
                  <Button
                    key={t.id}
                    variant="outline"
                    className="flex items-center justify-between"
                    onClick={() => {
                      setSelectedTeam(t)
                      localStorage.setItem('selectedTeam', JSON.stringify(t))
                    }}
                  >
                    <h3>{t.name}</h3>
                    <ArrowRight />
                  </Button>
                ))}
              </div>
              <h2 className="text-lg">Equipes que já participaram</h2>
              <div className="flex w-full flex-col gap-4">
                {filteredTeamsWithScore.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between border p-2"
                  >
                    <h3>{t.name}</h3>
                    {activity.scoreType === 'TIME' && (
                      <h3>
                        Tempo:{' '}
                        <span>
                          {format(
                            activity.scores.find((s) => s.teamId === t.id)
                              ?.value || 0,
                            'mm:ss.SSS',
                          )}
                        </span>
                      </h3>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedTeam && (
            <>
              <div>
                <h2 className="text-lg">
                  Equipe selecionada: {selectedTeam.name}
                </h2>
                <Button
                  onClick={() => {
                    setSelectedTeam(null)
                    localStorage.removeItem('selectedTeam')
                  }}
                >
                  Selecionar outra equipe
                </Button>
              </div>
              <Separator orientation="horizontal" />

              {activity.scoreType === 'TIME' && <Timer {...{ handleFinish }} />}
            </>
          )}
        </div>
      </div>
      <ShowJson data={activity} />
    </Screen>
  )
}
