'use client'

import { differenceInMilliseconds, format } from 'date-fns'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function Timer({
  handleFinish,
}: {
  handleFinish: (time: number) => void
}) {
  const [time, setTime] = useState(() => {
    const ft = localStorage.getItem('finishTime')
    if (ft) {
      return Number(ft)
    }
    return 0
  })
  const [startTime, setStartTime] = useState<Date | null>(
    localStorage.getItem('startTime')
      ? new Date(localStorage.getItem('startTime') as string)
      : null,
  )

  const start = () => {
    setStartTime(new Date())
    localStorage.setItem('startTime', new Date().toISOString())
  }

  const finish = () => {
    setStartTime(null)
    localStorage.removeItem('startTime')
    localStorage.setItem('finishTime', time.toString())
  }

  const save = () => {
    handleFinish(time)
    localStorage.removeItem('finishTime')
    setTime(0)
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
        Tempo: <span className="text-2xl">{format(time, 'mm:ss.SSS')}</span>
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
        className="w-full bg-green-500 text-white"
      >
        Salvar
      </Button>
    </div>
  )
}
