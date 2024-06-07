'use client'

import { clinicSchema } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

import { Clinic } from './columns'

export function ClinicForm({
  refetch,
  clinic,
  isOpen,
}: {
  refetch: () => void
  clinic?: Clinic
  isOpen: boolean
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: clinic?.name || '',
      description: clinic?.description || '',
    },
  })

  const createClinic = trpc.createClinic.useMutation({
    onSuccess: () => {
      form.reset()
      refetch()

      toast({
        title: 'Clinica cadastrada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao cadastrar o clinica',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  const updateClinic = trpc.updateClinic.useMutation({
    onSuccess: () => {
      form.reset()
      refetch()

      toast({
        title: 'Clinica atualizada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao atualizar o clinica',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof clinicSchema>) {
    try {
      if (clinic) {
        await updateClinic.mutateAsync({
          id: clinic.id,
          ...values,
        })
      } else {
        await createClinic.mutateAsync(values)
      }

      console.log('values', values)
    } catch (error) { }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da clinica</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : clinic ? (
            'Editar'
          ) : (
            'Cadastrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
