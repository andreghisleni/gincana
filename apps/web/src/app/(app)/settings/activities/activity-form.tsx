'use client'

import { activitySchema, ScoreOrdination, ScoreType } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ReactSelect } from '@/components/Select'
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

import { Activity } from './columns'

const formName = activitySchema.description

const values = {
  scoreType: Object.keys(ScoreType).map((v) => ({
    value: v,
    label: ScoreType[v] || v,
  })),

  scoreOrdination: Object.keys(ScoreOrdination).map((v) => ({
    value: v,
    label: ScoreOrdination[v] || v,
  })),
}

export function ActivityForm({
  refetch,
  activity,
}: {
  refetch: () => void
  activity?: Activity
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
  })

  const createActivity = trpc.createActivity.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: `${formName} cadastrado com sucesso`,
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: `Erro ao cadastrar o ${formName}`,
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  const updateActivity = trpc.updateActivity.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: `${formName} atualizado com sucesso`,
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: `Erro ao atualizar o ${formName}`,
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof activitySchema>) {
    try {
      if (activity) {
        await updateActivity.mutateAsync({
          id: activity.id,
          ...values,
        })
      } else {
        await createActivity.mutateAsync(values)
      }

      console.log('values', values)
    } catch (error) { } // eslint-disable-line
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{activity ? 'Editar' : 'Adicionar'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {activity ? 'Editar' : 'Cadastrar'} {formName}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <pre>
              {JSON.stringify(Object.keys(activitySchema.shape), null, 2)}
            </pre> */}

            {Object.keys(activitySchema.shape).map((fieldName) => {
              const fieldSchema = activitySchema.shape[fieldName]
              const label = fieldSchema._def.description // Obtém a descrição do campo

              if (fieldSchema._def.typeName === 'ZodEnum') {
                const v: { value: string; label: string }[] = values[fieldName]

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof typeof activitySchema.shape}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <ReactSelect
                            defaultValue={v.filter(
                              (value) => value.value === field.value,
                            )}
                            value={v.filter(
                              (value) => value.value === field.value,
                            )}
                onChange={(value: any) => { // eslint-disable-line
                              field.onChange(value.value)
                            }}
                            options={v}
                            isDisabled={field.disabled}
                            closeMenuOnSelect
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }

              if (
                fieldSchema._def.typeName === 'ZodNumber' ||
                fieldSchema._def.typeName === 'ZodString'
              ) {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof typeof activitySchema.shape}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input placeholder={label} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }

              if (fieldSchema._def.typeName === 'ZodOptional') {
                if (
                  fieldSchema._def.innerType._def.typeName === 'ZodNumber' ||
                  fieldSchema._def.innerType._def.typeName === 'ZodString'
                ) {
                  return (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof typeof activitySchema.shape}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input placeholder={label} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                }
              }

              return null
            })}

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : activity ? (
                'Editar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
