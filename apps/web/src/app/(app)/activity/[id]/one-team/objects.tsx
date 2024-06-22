'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

import { TimerInvert } from './timer-invert'

export function Objects({
  handleFinish,
  setLockSelectedTeam,
}: {
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [numberOfObjects, setNumberOfObjects] = usePersistentState<
    number | null
  >('numberOfObjects', null)

  const { toast } = useToast()

  const save = () => {
    if (!numberOfObjects) {
      toast({
        title: 'Erro',
        description: 'Número de objetos inválido',
      })
      return
    }

    handleFinish(numberOfObjects)
    setNumberOfObjects(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (numberOfObjects !== null) {
      setLockSelectedTeam(true)
    }
  }, [numberOfObjects])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Número de objetos
        </label>
        <Input
          type="number"
          value={numberOfObjects ?? ''}
          onChange={(e) => setNumberOfObjects(Number(e.target.value))}
          placeholder="0"
        />
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={numberOfObjects === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setNumberOfObjects(null)
        }}
        disabled={numberOfObjects === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>

      <Separator />

      <h2 className="text-lg">Timer:</h2>
      <TimerInvert setLockSelectedTeam={setLockSelectedTeam} />
    </div>
  )
}
