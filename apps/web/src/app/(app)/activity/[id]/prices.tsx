'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { usePersistentState } from '@/hooks/use-percistent-state'

type Product = {
  id: string
  name: string
  price: number
}

type TeamPrices = {
  id: string
  price: string
}

function convertDiferenceToPoints(diference: number) {
  if (diference <= 0.5) {
    return 5
  }
  if (diference <= 1) {
    return 4
  }
  if (diference <= 1.5) {
    return 3
  }
  if (diference <= 2) {
    return 2
  }
  if (diference <= 2.5) {
    return 1
  }
  return 0
}

export function Prices({
  handleFinish,
  setLockSelectedTeam,
  products,
}: {
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
  products: Product[]
}) {
  const [teamPrices, setTeamPrices] = usePersistentState<TeamPrices[] | null>(
    'teamPrices',
    null,
  )

  const { toast } = useToast()

  const productsWithPrices = products.map((product) => {
    const storageTeamPrices = teamPrices?.find(
      (teamPrice) => teamPrice.id === product.id,
    )

    return {
      ...product,
      teamPrice: Number(storageTeamPrices?.price) || null,
    }
  })

  const productsWithPriceDiference = productsWithPrices.map((product) => {
    return {
      ...product,
      priceDifference: product.teamPrice
        ? Math.abs(product.price - (Number(product.teamPrice) ?? 0))
        : null,
    }
  })

  const productsWithPriceDiferencePoints = productsWithPriceDiference.map(
    (product) => {
      return {
        ...product,
        points: product.priceDifference
          ? convertDiferenceToPoints(product.priceDifference)
          : 0,
      }
    },
  )

  const totalPoints = productsWithPriceDiferencePoints.reduce(
    (acc, product) => acc + product.points,
    0,
  )

  const save = () => {
    if (!teamPrices) {
      toast({
        title: 'Erro',
        description: 'É necessário preencher os preços dos produtos',
      })
      return
    }

    handleFinish(totalPoints)
    setTeamPrices(null)
    setLockSelectedTeam(false)
  }

  useEffect(() => {
    if (teamPrices !== null) {
      setLockSelectedTeam(true)
    }
  }, [teamPrices])

  function changeTeamPrice(id: string, price: string) {
    const filteredTeamPrices = teamPrices?.filter(
      (teamPrice) => teamPrice.id !== id,
    )

    if (!filteredTeamPrices) {
      setTeamPrices([{ id, price }])
      return
    }

    setTeamPrices([...filteredTeamPrices, { id, price }])
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => {
        const storageTeamPrices = teamPrices?.find(
          (teamPrice) => teamPrice.id === product.id,
        )

        return (
          <div key={product.id} className="flex items-center gap-4">
            <label
              className="w-24 text-gray-700 dark:text-gray-300"
              htmlFor={`${product.id}-team-price`}
            >
              {product.name}
            </label>
            <Input
              type="number"
              value={storageTeamPrices?.price ?? ''}
              onChange={(e) => changeTeamPrice(product.id, e.target.value)}
              placeholder="0"
              id={`${product.id}-team-price`}
              className="w-auto"
            />
            <Input
              type="number"
              value={product.price ?? ''}
              placeholder="0"
              className="w-24"
              disabled
            />
          </div>
        )
      })}

      <h2 className="text-lg">Pontos: {totalPoints}</h2>

      <Button
        onClick={() => {
          save()
        }}
        disabled={teamPrices === null}
        className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
      >
        Salvar
      </Button>

      <Button
        onClick={() => {
          setTeamPrices(null)
        }}
        disabled={teamPrices === null}
        className="w-full bg-red-500 text-white dark:bg-red-500 dark:text-white"
      >
        Cancelar
      </Button>
    </div>
  )
}
