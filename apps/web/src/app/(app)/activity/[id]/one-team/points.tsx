'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function Points({
  handleFinish,
  setLockSelectedTeam,
}: {
  handleFinish: (value: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [numberOfPoints, setNumberOfPoints] = usePersistentState<string | null>(
    'numberOfPoints',
    null,
  )

  const { toast } = useToast()

  const save = () => {
    if (!numberOfPoints) {
      toast({
        title: 'Erro',
        description: 'Número de pontos inválido',
      })
      return
    }

    handleFinish(Number(numberOfPoints))
    setNumberOfPoints(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (numberOfPoints !== null) {
      setLockSelectedTeam(true)
    }
  }, [numberOfPoints])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Numero de pontos:
        </label>
        <Input
          type="number"
          value={numberOfPoints ?? ''}
          onChange={(e) => setNumberOfPoints(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={numberOfPoints === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setNumberOfPoints(null)
        }}
        disabled={numberOfPoints === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
