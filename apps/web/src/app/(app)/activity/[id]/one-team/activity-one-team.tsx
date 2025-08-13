'use client'

import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'

import { Screen } from '@/components/screen'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'
import { trpc } from '@/lib/trpc/react'
import { roundIfDecimals } from '@/utils/round-if-decimals'

import { AllTeamsParticipated } from '../all-teams-participated'
import Loading from '../loading'
import { Activity } from '../page'
import { Distance } from './distance'
import { Objects } from './objects'
import { Points } from './points'
import { Prices } from './prices'
import { SunOfPoints } from './sun-of-points'
import { Timer } from './timer'
import { Weight } from './weight'
import { Time } from './time'

type ActivityOneTeamProps = {
  activity: Activity
  refetch: () => Promise<void>
}
type Team = {
  id: string
  name: string
}

export function ActivityOneTeam({ activity, refetch }: ActivityOneTeamProps) {
  const {
    data: teams,
    refetch: refetchTeams,
    isFetching: isFetchingTeams,
  } = trpc.getTeams.useQuery()

  const [selectedTeam, setSelectedTeam] = usePersistentState<Team | null>(
    'selectedTeam',
    null,
  )
  const [lockSelectedTeam, setLockSelectedTeam] = usePersistentState<boolean>(
    'lockSelectedTeam',
    false,
  )

  // useEffect(() => {
  //   if (!selectedTeam && !isFetchingTeams) {
  //     const st = setTimeout(() => {
  //       refetchTeams()
  //     }, 10000)

  //     return () => clearTimeout(st)
  //   }
  // }, [selectedTeam, isFetchingTeams, refetchTeams])

  const { toast } = useToast()

  const createScore = trpc.createScore.useMutation({
    onSuccess: () => {
      refetch()
      refetchTeams()
      setSelectedTeam(null)
      toast({
        title: 'Pontuação enviada com sucesso',
        description: 'A pontuação foi enviada com sucesso',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar pontuação',
        variant: 'destructive',
        description: error.message,
      })
    },
  })

  if (isFetchingTeams) {
    return <Loading />
  }

  if (!teams) {
    return (
      <Screen>
        <div className="flex h-screen justify-center ">
          <div className="flex h-screen w-full max-w-lg flex-col gap-4 border p-4">
            <h1 className="text-xl">Atividade: {activity.title}</h1>
            <Separator orientation="horizontal" />
            <div>Teams not found</div>
          </div>
        </div>
      </Screen>
    )
  }

  const handleFinish = async (score: number) => {
    if (!selectedTeam) {
      toast({
        title: 'Selecione uma equipe',
        variant: 'destructive',
      })
      return
    }

    await createScore.mutateAsync({
      activityId: activity.id,
      teamId: selectedTeam?.id,
      score,
    })
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
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">Selecione uma das equipes</h2>
              <div className="flex w-full flex-col gap-4">
                {filteredTeamsWithOutScore.map((t) => (
                  <Button
                    key={t.id}
                    variant="outline"
                    className="flex items-center justify-between"
                    onClick={() => {
                      setSelectedTeam(t)
                    }}
                  >
                    <h3>{t.name}</h3>
                    <ArrowRight />
                  </Button>
                ))}

                {filteredTeamsWithOutScore.length === 0 && (
                  <AllTeamsParticipated />
                )}
              </div>
              <Separator orientation="horizontal" />
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
                    {activity.scoreType === 'OBJECTS' && (
                      <h3>
                        Objetos:{' '}
                        <span>
                          {activity.scores.find((s) => s.teamId === t.id)
                            ?.value || 0}
                        </span>
                      </h3>
                    )}

                    {activity.scoreType === 'NUMBER' && (
                      <h3>
                        Pontos:{' '}
                        <span>
                          {activity.scores.find((s) => s.teamId === t.id)
                            ?.value || 0}
                        </span>
                      </h3>
                    )}

                    {activity.scoreType === 'WEIGHT' && (
                      <h3>
                        Diferença de peso:{' '}
                        <span>
                          {activity.scores.find((s) => s.teamId === t.id)
                            ?.value || 0}
                        </span>
                      </h3>
                    )}

                    {activity.scoreType === 'PRICE' && (
                      <h3>
                        Pontos:{' '}
                        <span>
                          {activity.scores.find((s) => s.teamId === t.id)
                            ?.value || 0}
                        </span>
                      </h3>
                    )}

                    {activity.scoreType === 'DISTANCE' && (
                      <h3>
                        Diferença de distancia:{' '}
                        <span>
                          {roundIfDecimals(
                            activity.scores.find((s) => s.teamId === t.id)
                              ?.value || 0,
                            2,
                          )}
                        </span>
                      </h3>
                    )}

                    {activity.scoreType === 'POINTS' && (
                      <h3>
                        Pontos:{' '}
                        <span>
                          {activity.scores.find((s) => s.teamId === t.id)
                            ?.value || 0}
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
                  }}
                  disabled={lockSelectedTeam && !!selectedTeam}
                >
                  Selecionar outra equipe
                </Button>
              </div>
              <Separator orientation="horizontal" />

              {activity.scoreType === 'TIME' && (
                <Time {...{ handleFinish, setLockSelectedTeam }} />
              )}

              {activity.scoreType === 'OBJECTS' && (
                <Objects {...{ handleFinish, setLockSelectedTeam }} />
              )}

              {activity.scoreType === 'NUMBER' && activity.numbers.length > 0 && (
                <SunOfPoints
                  {...{
                    numbers: activity.numbers,
                    handleFinish,
                    setLockSelectedTeam,
                  }}
                />
              )}

              {activity.scoreType === 'NUMBER' && activity.numbers.length === 0 && (
                <Points
                  {...{
                    numbers: activity.numbers,
                    handleFinish,
                    setLockSelectedTeam,
                  }}
                />
              )}

              {activity.scoreType === 'WEIGHT' && (
                <Weight
                  {...{
                    exactNumber: activity.exactValue || 0,
                    handleFinish,
                    setLockSelectedTeam,
                  }}
                />
              )}

              {activity.scoreType === 'PRICE' && (
                <Prices
                  {...{
                    handleFinish,
                    setLockSelectedTeam,
                    products: activity.products.map((p) => ({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                    })),
                  }}
                />
              )}

              {activity.scoreType === 'DISTANCE' && (
                <Distance
                  {...{
                    exactNumber: activity.exactValue || 0,
                    handleFinish,
                    setLockSelectedTeam,
                  }}
                />
              )}

              {activity.scoreType === 'POINTS' && (
                <Points
                  {...{
                    numbers: activity.numbers,
                    handleFinish,
                    setLockSelectedTeam,
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Screen>
  )
}
