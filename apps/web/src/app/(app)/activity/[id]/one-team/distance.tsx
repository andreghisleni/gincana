'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function Distance({
  exactNumber,
  handleFinish,
  setLockSelectedTeam,
}: {
  exactNumber: number
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [numberOfDistance, setNumberOfDistance] = usePersistentState<
    string | null
  >('numberOfDistance', null)

  const { toast } = useToast()

  const distanceDifference = Math.abs(
    exactNumber - (Number(numberOfDistance) ?? 0),
  )

  const save = () => {
    if (!numberOfDistance) {
      toast({
        title: 'Erro',
        description: 'Distancia invalida',
      })
      return
    }

    handleFinish(distanceDifference)
    setNumberOfDistance(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (numberOfDistance !== null) {
      setLockSelectedTeam(true)
    }
  }, [numberOfDistance])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Qual foi a distancia que os jovens concluíram que é?
        </label>
        <Input
          type="number"
          value={numberOfDistance ?? ''}
          onChange={(e) => setNumberOfDistance(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Diferença de distancia
        </label>
        <Input type="number" value={distanceDifference} disabled />
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={numberOfDistance === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setNumberOfDistance(null)
          setLockSelectedTeam(false)
        }}
        disabled={numberOfDistance === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
