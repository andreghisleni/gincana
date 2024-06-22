'use client'

import { differenceInMilliseconds, format } from 'date-fns' // Use differenceInMilliseconds
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function TimerInvert({
  setLockSelectedTeam,
}: {
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [remainingTime, setRemainingTime] = useState(0) // Time remaining in milliseconds
  const [startTime, setStartTime] = usePersistentState<Date | null>(
    'startTimeInvert',
    null,
  )

  const startCountdown = (minutes: number) => {
    const endTime = new Date(new Date().getTime() + minutes * 60 * 1000)
    setStartTime(endTime)
    setLockSelectedTeam(true)
    setRemainingTime(minutes * 60 * 1000) // Initialize in milliseconds
  }

  const finish = () => {
    setStartTime(null)
  }

  const cancel = () => {
    setStartTime(null)
    setRemainingTime(0)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const msRemaining = differenceInMilliseconds(startTime, new Date())
        if (msRemaining >= 0) {
          setRemainingTime(msRemaining)
        } else {
          clearInterval(interval)
          setRemainingTime(0)
        }
      }, 10) // Update every 10 milliseconds for smoother display

      return () => clearInterval(interval)
    }
  }, [startTime])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">
        Tempo:{' '}
        <span className="text-2xl">{format(remainingTime, 'mm:ss.SSS')}</span>
      </h3>

      {!startTime ? (
        <>
          <Button
            onClick={() => startCountdown(5)}
            disabled={!!startTime || !!remainingTime}
          >
            Iniciar 5 minutos
          </Button>
          <Button
            onClick={() => startCountdown(1)}
            disabled={!!startTime || !!remainingTime}
          >
            Iniciar 1 minuto
          </Button>
        </>
      ) : (
        <Button onClick={finish} disabled={!startTime}>
          Finalizar
        </Button>
      )}

      <Button
        onClick={cancel}
        disabled={!(!!remainingTime && startTime === null)}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
