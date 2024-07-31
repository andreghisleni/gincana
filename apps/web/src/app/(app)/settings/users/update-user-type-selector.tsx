'use client'

import { MySelect } from '@/components/my-select'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

type IProps = {
  id: string
  type: 'ADMIN' | 'DEFAULT' | 'ACTIVITY'
  refetch: () => void
}

export function UpdateUserTypeSelector({ id, type, refetch }: IProps) {
  const { toast } = useToast()
  const { mutateAsync, isPending } = trpc.updateUserType.useMutation({
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

  async function handleUpdateUserActive(t: 'ADMIN' | 'DEFAULT') {
    await mutateAsync({
      userId: id,
      type: t,
    })
  }

  return (
    <MySelect
      value={type}
      onChange={(value) => handleUpdateUserActive(value as 'ADMIN' | 'DEFAULT')}
      options={[
        { value: 'ADMIN', label: 'Admin' },
        { value: 'DEFAULT', label: 'Default' },
        { value: 'ACTIVITY', label: 'Activity', disabled: true },
      ]}
      disabled={isPending || type === 'ACTIVITY'}
      className="w-40"
    />
  )
}
