'use client'

import { settingSchema } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

export function Settings() {
  const { data: settings, refetch } = trpc.getSettings.useQuery()

  const { mutateAsync } = trpc.updateSettings.useMutation({
    onSuccess: () => {
      toast({
        title: 'Settings updated',
      })

      refetch()
    },
    onError: (error) => {
      toast({
        title: 'Failed to update settings',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      saveReport: settings?.saveReport ?? false,
      saveScore: settings?.saveScore ?? false,
      saveVote: settings?.saveVote ?? false,
    },
    values: {
      saveReport: settings?.saveReport ?? false,
      saveScore: settings?.saveScore ?? false,
      saveVote: settings?.saveVote ?? false,
    },
  })

  async function onSubmit(data: z.infer<typeof settingSchema>) {
    await mutateAsync(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="saveScore"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">
                  Cadastrar Pontuações
                </FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saveReport"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">Cadastrar Denúncias</FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saveVote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">Cadastrar Votos</FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
