'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

type IProps = {
  id: string
  isActive: boolean
  refetch: () => void
}

export function UpdateActiveButton({ id, isActive, refetch }: IProps) {
  const { toast } = useToast()
  const { mutateAsync: updateUserActive, isPending: isPendingUserActive } =
    trpc.updateUserActive.useMutation({
      onSuccess: () => {
        toast({
          title: 'Sucesso',
          description: 'Usuário atualizado com sucesso',
        })
        refetch()
      },
      onError: (error) => {
        toast({
          title: 'Erro',
          description: error.message,
          variant: 'destructive',
        })
      },
    })

  async function handleUpdateUserActive() {
    await updateUserActive({
      userId: id,
    })
  }

  return (
    <Button disabled={isPendingUserActive} onClick={handleUpdateUserActive}>
      {isActive ? 'Bloquear' : 'Liberar'}
    </Button>
  )
}
