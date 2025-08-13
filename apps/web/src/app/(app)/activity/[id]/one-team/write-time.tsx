'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function WriteTime({
  handleFinish,
  setLockSelectedTeam,
}: {
  handleFinish: (value: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [timeMinutes, setTimeMinutes] = usePersistentState<string | null>(
    'timeMinutes',
    null,
  )
  const [timeSeconds, setTimeSeconds] = usePersistentState<string | null>(
    'timeSeconds',
    null,
  )

  const { toast } = useToast()

  const hasTime = timeMinutes !== null || timeSeconds !== null

  const save = () => {
    if (!hasTime) {
      toast({
        title: 'Erro',
        description: 'Número de segundos inválido',
      })
      return
    }

    handleFinish((Number(timeMinutes) * 60 + Number(timeSeconds)) * 1000) // in milliseconds
    
    setTimeMinutes(null)
    setTimeSeconds(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (timeMinutes !== null || timeSeconds !== null) {
      setLockSelectedTeam(true)
    }
  }, [timeMinutes, timeSeconds])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-gray-700 dark:text-gray-300">
          Tempo: (minutos : segundos)
        </label>
        <div className='flex items-center gap-2'>
          <Input
            type="number"
            value={timeMinutes ?? ''}
            onChange={(e) => setTimeMinutes(e.target.value)}
            placeholder="00"
          />
          :
          <Input
            type="number"
            value={timeSeconds ?? ''}
            onChange={(e) => setTimeSeconds(e.target.value)}
            placeholder="00"
          />
        </div>
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={!hasTime}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setTimeMinutes(null)
          setTimeSeconds(null)
          setLockSelectedTeam(false)
        }}
        disabled={!hasTime}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
