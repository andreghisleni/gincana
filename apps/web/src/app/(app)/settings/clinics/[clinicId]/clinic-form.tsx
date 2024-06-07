'use client'

import { clinicUpdateFormSchema } from '@gincana/schema'
import { RouterOutput } from '@gincana/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Row } from '@/components/Row'
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

type Clinic = RouterOutput['getClinic']['clinic']

export function ClinicForm({
  clinic,
  refetch,
}: {
  clinic: Clinic
  refetch: () => void
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof clinicUpdateFormSchema>>({
    resolver: zodResolver(clinicUpdateFormSchema),
    defaultValues: {
      name: clinic?.name || '',
      description: clinic?.description || '',
      doctorName: clinic?.doctorName || '',
      address: clinic?.address || '',
      slug: clinic?.slug || '',
      evolutionApiUrl: clinic?.evolutionApiUrl || '',
      evolutionApiKey: clinic?.evolutionApiKey || '',
    },
  })

  const updateClinic = trpc.updateClinic.useMutation({
    onSuccess: () => {
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

  async function onSubmit(values: z.infer<typeof clinicUpdateFormSchema>) {
    try {
      if (clinic) {
        await updateClinic.mutateAsync({
          id: clinic.id,
          ...values,
        })
      }

      console.log('values', values)
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
    }
  }

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

        <FormField
          control={form.control}
          name="doctorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do médico</FormLabel>
              <FormControl>
                <Input placeholder="Nome do médico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (nome na url)</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Row>
          <FormField
            control={form.control}
            name="evolutionApiUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da API do Evolution</FormLabel>
                <FormControl>
                  <Input placeholder="URL da API do Evolution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evolutionApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chave da API do Evolution</FormLabel>
                <FormControl>
                  <Input placeholder="Chave da API do Evolution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

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
