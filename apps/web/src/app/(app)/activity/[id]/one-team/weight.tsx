'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function Weight({
  exactNumber,
  handleFinish,
  setLockSelectedTeam,
}: {
  exactNumber: number
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [numberOfWeight, setNumberOfWeight] = usePersistentState<string | null>(
    'numberOfWeight',
    null,
  )

  const { toast } = useToast()

  const weightDifference = Math.abs(exactNumber - (Number(numberOfWeight) ?? 0))

  const save = () => {
    if (!numberOfWeight) {
      toast({
        title: 'Erro',
        description: 'Número de peso inválido',
      })
      return
    }

    handleFinish(weightDifference)
    setNumberOfWeight(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (numberOfWeight !== null) {
      setLockSelectedTeam(true)
    }
  }, [numberOfWeight])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Qual foi o peso marcado na balança?
        </label>
        <Input
          type="number"
          value={numberOfWeight ?? ''}
          onChange={(e) => setNumberOfWeight(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Diferença de peso
        </label>
        <Input type="number" value={weightDifference} disabled />
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={numberOfWeight === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setNumberOfWeight(null)
        }}
        disabled={numberOfWeight === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
