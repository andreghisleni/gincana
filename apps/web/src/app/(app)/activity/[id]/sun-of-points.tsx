'use client'

import { Minus, Plus } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

export function SunOfPoints({
  numbers,
  handleFinish,
  setLockSelectedTeam,
}: {
  numbers: number[]
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {
  const [points, setPoints] = usePersistentState<{
    [key: string]: number
  } | null>('points', null)

  const { toast } = useToast()

  useEffect(() => {
    if (points !== null) {
      setLockSelectedTeam(true)
    }
  }, [points])

  function changePoints(key: string, value: number) {
    if (!points) {
      setPoints({ [key]: value })
    } else {
      setPoints({ ...points, [key]: value })
    }
  }

  function incrementPoint(key: string) {
    if (!points) {
      setPoints({ [key]: 1 })
    } else {
      setPoints({ ...points, [key]: (points[key] || 0) + 1 })
    }
  }

  function decrementPoint(key: string) {
    if (!points) {
      setPoints({ [key]: 0 })
    } else {
      setPoints({ ...points, [key]: Math.max(0, (points[key] || 0) - 1) })
    }
  }

  const totalPoints = points
    ? Object.values(points).reduce((sun, value, index) => {
        const numericKey = parseInt(Object.keys(points)[index], 10)

        return sun + value * numericKey
      }, 0)
    : 0

  const save = () => {
    if (!points) {
      toast({
        title: 'Erro',
        description: 'Número de objetos inválido',
      })
      return
    }

    handleFinish(totalPoints)
    setPoints(null)
    setLockSelectedTeam(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Pontuação</h2>
      {numbers?.map((number) => (
        <div key={number} className="flex gap-4">
          <label className="text-gray-700 dark:text-gray-300">
            {number} pontos:
          </label>
          <div className="flex">
            <Button
              variant="outline"
              onClick={() => decrementPoint(String(number))}
            >
              <Minus />
            </Button>
            <Input
              type="number"
              value={points ? points[number] : ''}
              placeholder="0"
              onChange={(e) => changePoints(number.toString(), +e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => incrementPoint(String(number))}
            >
              <Plus />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex">
        <label className="text-gray-700 dark:text-gray-300">
          Total de pontos:
        </label>
        <Input type="number" value={totalPoints} placeholder="0" disabled />
      </div>

      <Button
        onClick={() => {
          save()
        }}
        disabled={points === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setPoints(null)
        }}
        disabled={points === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
