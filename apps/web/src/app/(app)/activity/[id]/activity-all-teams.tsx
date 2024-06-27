'use client'

import { MySelect } from '@/components/my-select'
import { Screen } from '@/components/screen'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'
import { trpc } from '@/lib/trpc/react'

import Loading from './loading'
import { Activity } from './page'

type ActivityAllTeamsProps = {
  activity: Activity
  refetch: () => Promise<void>
}

export function ActivityAllTeams({ activity, refetch }: ActivityAllTeamsProps) {
  const {
    data: teams,
    refetch: refetchTeams,
    isFetching: isFetchingTeams,
  } = trpc.getTeams.useQuery()

  const [firstTeamId, setFirstTeamId] = usePersistentState<string | null>(
    'firstTeamId',
    null,
  )

  const [secondTeamId, setSecondTeamId] = usePersistentState<string | null>(
    'secondTeamId',
    null,
  )

  const [thirdTeamId, setThirdTeamId] = usePersistentState<string | null>(
    'thirdTeamId',
    null,
  )

  const [fourthTeamId, setFourthTeamId] = usePersistentState<string | null>(
    'fourthTeamId',
    null,
  )

  const [fifthTeamId, setFifthTeamId] = usePersistentState<string | null>(
    'fifthTeamId',
    null,
  )

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

  function filteredTeams(otherSelected: (string | null)[]) {
    if (!teams) return []

    return [
      ...teams.teams
        .filter((t) => !otherSelected.includes(t.id))
        .map((t) => ({
          label: t.name,
          value: t.id,
        })),
      { label: 'Nenhuma', value: null },
    ]
  }

  const handleFinish = async () => {
    if (
      !firstTeamId ||
      !secondTeamId ||
      !thirdTeamId ||
      !fourthTeamId ||
      !fifthTeamId
    ) {
      toast({
        title: 'Selecione os 5 primeiros lugares',
        variant: 'destructive',
      })
      return
    }

    const fourFirstTeams = [
      firstTeamId,
      secondTeamId,
      thirdTeamId,
      fourthTeamId,
    ]

    await Promise.all(
      fourFirstTeams.map((teamId, index) =>
        createScore.mutateAsync({
          activityId: activity.id,
          teamId,
          score: 5 - index,
          teamsId: [...fourFirstTeams, fifthTeamId],
        }),
      ),
    )

    await createScore.mutateAsync(
      {
        activityId: activity.id,
        teamId: fifthTeamId,
        score: 1,
        teamsId: [...fourFirstTeams, fifthTeamId],
      },
      {
        onSuccess: () => {
          refetch()
          refetchTeams()
          toast({
            title: 'Pontuação enviada com sucesso',
            description: 'A pontuação foi enviada com sucesso',
          })

          setFirstTeamId(null)
          setSecondTeamId(null)
          setThirdTeamId(null)
          setFourthTeamId(null)
          setFifthTeamId(null)
        },
      },
    )
  }

  return (
    <Screen>
      <div className="flex justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
          <h1 className=" text-xl">Atividade: {activity.title}</h1>
          <Separator orientation="horizontal" />

          {createScore.isPending && (
            <div className="flex flex-col items-center gap-2">
              <Loading />
              <span>Enviando pontuação...</span>
            </div>
          )}

          {!createScore.isPending && activity.scores.length <= 0 && (
            <>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg">Selecione as equipes na ordem</h2>

                <div>
                  <h3>Primeiro lugar</h3>
                  <MySelect
                    value={firstTeamId}
                    onChange={(e) => setFirstTeamId(e as string)}
                    options={filteredTeams([
                      secondTeamId,
                      thirdTeamId,
                      fourthTeamId,
                      fifthTeamId,
                    ])}
                  />
                </div>

                <div>
                  <h3>Segundo lugar</h3>
                  <MySelect
                    value={secondTeamId}
                    onChange={(e) => setSecondTeamId(e as string)}
                    options={filteredTeams([
                      firstTeamId,
                      thirdTeamId,
                      fourthTeamId,
                      fifthTeamId,
                    ])}
                  />
                </div>

                <div>
                  <h3>Terceiro lugar</h3>
                  <MySelect
                    value={thirdTeamId}
                    onChange={(e) => setThirdTeamId(e as string)}
                    options={filteredTeams([
                      firstTeamId,
                      secondTeamId,
                      fourthTeamId,
                      fifthTeamId,
                    ])}
                  />
                </div>

                <div>
                  <h3>Quarto lugar</h3>
                  <MySelect
                    value={fourthTeamId}
                    onChange={(e) => setFourthTeamId(e as string)}
                    options={filteredTeams([
                      firstTeamId,
                      secondTeamId,
                      thirdTeamId,
                      fifthTeamId,
                    ])}
                  />
                </div>

                <div>
                  <h3>Quinto lugar</h3>
                  <MySelect
                    value={fifthTeamId}
                    onChange={(e) => setFifthTeamId(e as string)}
                    options={filteredTeams([
                      firstTeamId,
                      secondTeamId,
                      thirdTeamId,
                      fourthTeamId,
                    ])}
                  />
                </div>

                <Separator orientation="horizontal" />

                <Button onClick={() => handleFinish()}>
                  Cadastrar pontuação
                </Button>
              </div>
            </>
          )}

          {activity.scores.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">Pontuações já cadastradas</h2>

              <div className="flex w-full flex-col gap-4">
                {activity.scores
                  .sort((s1, s2) =>
                    s1.value < s2.value ? 1 : s1.value > s2.value ? -1 : 0,
                  )
                  .map((s) => (
                    <div
                      key={s.teamId}
                      className="flex items-center justify-between border p-2"
                    >
                      <h3>
                        {teams.teams.find((t) => t.id === s.teamId)?.name}
                      </h3>
                      <h3>{s.value}</h3>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  )
}
