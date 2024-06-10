'use client'

import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'

import { Screen } from '@/components/screen'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'
import { trpc } from '@/lib/trpc/react'

import Loading from './loading'
import { Activity } from './page'
import { Timer } from './timer'

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
                <Timer {...{ handleFinish, setLockSelectedTeam }} />
              )}
            </>
          )}
        </div>
      </div>
    </Screen>
  )
}
