'use client'

import { ArrowRight } from 'lucide-react'

import { Screen } from '@/components/screen'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'
import { trpc } from '@/lib/trpc/react'

import Loading from './loading'
import { Activity } from './page'

type ActivityTwoTeamsProps = {
  activity: Activity
  refetch: () => Promise<void>
}
type Team = {
  id: string
  name: string
}

export function ActivityTwoTeams({ activity, refetch }: ActivityTwoTeamsProps) {
  const {
    data: teams,
    refetch: refetchTeams,
    isFetching: isFetchingTeams,
  } = trpc.getTeams.useQuery()

  const [selectedTeams, setSelectedTeams] = usePersistentState<Team[]>(
    'selectedTeams',
    [],
  )
  const [lockSelectedTeam, setLockSelectedTeam] = usePersistentState<boolean>(
    'lockSelectedTeam',
    false,
  )

  const [activityStarted, setActivityStarted] = usePersistentState<boolean>(
    'activityStarted',
    false,
  )

  const [selectedTeam, setSelectedTeam] = usePersistentState<Team | null>(
    'selectedTeam',
    null,
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

  const handleFinish = async () => {
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
      score: activity.defaultScore || 10,
      teamsId: selectedTeams.map((t) => t.id),
    })

    const otherTeam = selectedTeams.find((t) => t.id !== selectedTeam?.id)

    if (!otherTeam) {
      return
    }

    await createScore.mutateAsync(
      {
        activityId: activity.id,
        teamId: otherTeam.id,
        score: 0,
        teamsId: selectedTeams.map((t) => t.id),
      },
      {
        onSuccess: () => {
          refetch()
          refetchTeams()
          toast({
            title: 'Pontuação enviada com sucesso',
            description: 'A pontuação foi enviada com sucesso',
          })

          setSelectedTeams([])
          setSelectedTeam(null)
          setLockSelectedTeam(false)
          setActivityStarted(false)
        },
      },
    )
  }

  const handleChangeSelectedTeam = (team: Team) => {
    const index = selectedTeams.findIndex((t) => t.id === team.id)

    if (index === -1) {
      setSelectedTeams([...selectedTeams, team])
    } else {
      setSelectedTeams(selectedTeams.filter((t) => t.id !== team.id))
    }
  }

  const handleSelectTeam = (team: Team) => {
    if (selectedTeam?.id === team.id) {
      setSelectedTeam(null)
      setLockSelectedTeam(false)
    } else {
      setSelectedTeam(team)
      setLockSelectedTeam(true)
    }
  }

  const filteredTeamsWithOutScore = teams.teams.filter(
    (t) => activity.scores.find((s) => s.teamId === t.id) === undefined,
  )

  const filteredTeamsWithScore = activity.scores.filter((s) => s.value > 0)

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">Atividade: {activity.title}</h1>
          <Separator orientation="horizontal" />

          {!activityStarted && (
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">Selecione uma das equipes</h2>
              <Button
                className="flex items-center justify-between"
                disabled={selectedTeams.length !== 2}
                onClick={() => setActivityStarted(true)}
              >
                Iniciar atividade <ArrowRight />
              </Button>
              <div className="flex w-full flex-col gap-4">
                {filteredTeamsWithOutScore.map((t) => (
                  <Button
                    key={t.id}
                    variant="outline"
                    className="flex items-center justify-between data-[checked=true]:border-green-500"
                    data-checked={selectedTeams.some((st) => st.id === t.id)}
                    disabled={
                      selectedTeams.length === 2 &&
                      !selectedTeams.some((st) => st.id === t.id)
                    }
                    onClick={() => {
                      handleChangeSelectedTeam(t)
                    }}
                  >
                    <Checkbox
                      checked={selectedTeams.some((st) => st.id === t.id)}
                      className="data-[state=checked]:border-green-700 data-[state=checked]:bg-green-700 data-[state=checked]:text-zinc-50 dark:data-[state=checked]:border-green-500 dark:data-[state=checked]:bg-green-500 dark:data-[state=checked]:text-zinc-900"
                    />
                    <h3>{t.name}</h3>
                    <span />
                  </Button>
                ))}
              </div>
              <Separator orientation="horizontal" />
              <h2 className="text-lg">Equipes que já participaram</h2>
              <div className="flex w-full flex-col gap-4">
                {filteredTeamsWithScore.map(
                  ({ scoresWithMultipleTeams, teamId, id }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between p-2"
                    >
                      <div className="flex flex-1 justify-center border border-green-500 p-2">
                        <h3 className="font-bold text-green-600">
                          {
                            scoresWithMultipleTeams.find((t) => t.id === teamId)
                              ?.name
                          }
                        </h3>
                      </div>
                      <div className="flex flex-1 justify-center border p-2">
                        <h3>
                          {
                            scoresWithMultipleTeams.find((t) => t.id !== teamId)
                              ?.name
                          }
                        </h3>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {activityStarted && (
            <>
              <div>
                <h2 className="text-lg">Equipes selecionadas:</h2>
                {selectedTeams.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between border p-2"
                  >
                    <h3>{t.name}</h3>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    setActivityStarted(false)
                  }}
                  disabled={lockSelectedTeam}
                >
                  Selecionar outra equipe
                </Button>
              </div>
              <Separator orientation="horizontal" />

              <div>
                <h2 className="text-lg">Selecione a equipe que ganhou</h2>
                <div className="flex w-full flex-col gap-4">
                  {selectedTeams.map((t) => (
                    <Button
                      key={t.id}
                      variant="outline"
                      className="flex items-center justify-between data-[checked=true]:border-green-500"
                      data-checked={selectedTeam?.id === t.id}
                      disabled={!!selectedTeam && selectedTeam.id !== t.id}
                      onClick={() => {
                        handleSelectTeam(t)
                      }}
                    >
                      <Checkbox
                        checked={selectedTeam?.id === t.id}
                        className="data-[state=checked]:border-green-700 data-[state=checked]:bg-green-700 data-[state=checked]:text-zinc-50 dark:data-[state=checked]:border-green-500 dark:data-[state=checked]:bg-green-500 dark:data-[state=checked]:text-zinc-900"
                      />
                      <h3>{t.name}</h3>
                      <span />
                    </Button>
                  ))}

                  <Separator orientation="horizontal" />

                  <Button onClick={() => handleFinish()}>
                    Cadastrar pontuação
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Screen>
  )
}
