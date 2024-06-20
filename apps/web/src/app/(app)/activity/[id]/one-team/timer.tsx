'use client'

import { differenceInMilliseconds, format } from 'date-fns'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function Timer({
  handleFinish,
  setLockSelectedTeam,
}: {
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [time, setTime] = useState(0)
  const [startTime, setStartTime] = usePersistentState<Date | null>(
    'startTime',
    null,
  )
  const [finishTime, setFinishTime] = usePersistentState<number | null>(
    'finishTime',
    null,
  )

  const start = () => {
    setStartTime(new Date())
    setLockSelectedTeam(true)
  }

  const finish = () => {
    setStartTime(null)
    setFinishTime(time)
  }

  const save = () => {
    handleFinish(time)
    setStartTime(null)
    setFinishTime(null)
    setTime(0)
    setLockSelectedTeam(false)
  }

  const cancel = () => {
    setStartTime(null)
    setFinishTime(null)
    setTime(0)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTime(differenceInMilliseconds(new Date(), startTime))
      }, 10)

      return () => clearInterval(interval)
    }
  }, [startTime])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">
        Tempo:{' '}
        <span className="text-2xl">
          {finishTime
            ? format(finishTime, 'mm:ss.SSS')
            : format(time, 'mm:ss.SSS')}
        </span>
      </h3>

      {!startTime ? (
        <Button
          onClick={() => {
            start()
          }}
          disabled={!!startTime || !!time}
        >
          Iniciar
        </Button>
      ) : (
        <Button
          onClick={() => {
            finish()
          }}
          disabled={!startTime}
        >
          Finalizar
        </Button>
      )}

      <Button
        onClick={() => {
          save()
        }}
        disabled={!(!!time && startTime === null)}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          cancel()
        }}
        disabled={!(!!time && startTime === null)}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
