'use client'

import { voteFormSchema } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { MySelect } from '@/components/my-select'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

type Team = {
  id: string
  name: string
}

type VoteProps = {
  teams: Team[]
  type: 'ANIMATED' | 'ORGANIZED'
}

export function VoteForm({ teams, type }: VoteProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof voteFormSchema>>({
    resolver: zodResolver(voteFormSchema),
    defaultValues: {},
  })

  const router = useRouter()

  const createVote = trpc.createVote.useMutation({
    onSuccess: () => {
      form.reset()
      toast({
        title: 'Voto cadastrado com sucesso',
        description: 'O voto foi enviada com sucesso',
      })
      router.push(`/vote?t=${new Date().getTime()}`)
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar denuncia',
        variant: 'destructive',
        description: error.message,
      })
    },
  })
  async function onSubmit(values: z.infer<typeof voteFormSchema>) {
    try {
      await createVote.mutateAsync({
        type,
        teamId: values.teamId,
      })
      console.log('values', values)
    } catch (error) {}
  }
  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-xl">Votar</h1>

          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Selecione a equipe:{' '}
                  <span className="font-bold">
                    {type === 'ANIMATED' ? 'MAIS ANIMADA' : 'MAIS ORGANIZADA'}
                  </span>
                </FormLabel>
                <FormControl>
                  <MySelect
                    {...field}
                    options={teams.map((team) => ({
                      value: team.id,
                      label: team.name,
                    }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Votar'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
