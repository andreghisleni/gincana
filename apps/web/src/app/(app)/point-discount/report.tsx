'use client'

import { reportSchema } from '@gincana/schema'
import { RouterOutput } from '@gincana/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

type Team = {
  id: string
  name: string
}

type Motive = RouterOutput['getReportMotives']['reportMotives'][0]

type ReportProps = {
  teams: Team[]
  motives: Motive[]
}

export function Report({ teams, motives }: ReportProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {},
  })

  const createReport = trpc.createReport.useMutation({
    onSuccess: () => {
      form.reset()
      toast({
        title: 'Denuncia enviada com sucesso',
        description: 'A denuncia foi enviada com sucesso',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao enviar denuncia',
        variant: 'destructive',
        description: error.message,
      })
    },
  })
  async function onSubmit(values: z.infer<typeof reportSchema>) {
    try {
      await createReport.mutateAsync(values)
      console.log('values', values)
    } catch (error) {}
  }
  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-xl">Denunciar</h1>

          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Selecione a equipe que cometeu ou de qual equipe é o
                  integrante
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

          <FormField
            control={form.control}
            name="motiveId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecione o motivo da denúncia</FormLabel>
                <FormControl>
                  <MySelect
                    {...field}
                    options={motives.map((motive) => ({
                      value: motive.id,
                      label: motive.name,
                    }))}
                  />
                </FormControl>
                <FormMessage />
                {field.value && (
                  <span className="text-justify text-sm font-medium text-gray-400">
                    {
                      motives.find((motive) => motive.id === field.value)
                        ?.description
                    }
                  </span>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descrição adicional da denúncia (opcional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descrição da denúncia, Ex.: Nome do membro que está executando o ato, Joãozinho..."
                    {...field}
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
              'Cadastrar'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
