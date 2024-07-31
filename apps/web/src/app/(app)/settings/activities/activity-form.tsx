'use client'

import { activitySchema, ScoreOrdination, ScoreType } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'
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
    defaultValues: activity
      ? {
          ...activity,
          defaultScore: activity.defaultScore || undefined,
          scoreDescription: activity.scoreDescription || undefined,
          exactValue: activity.exactValue || undefined,
        }
      : undefined,
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

  function pasted(event: React.ClipboardEvent) {
    const clipboardData = event.clipboardData
    const pastedData = clipboardData?.getData('Text')

    if (pastedData) {
      const data = pastedData.split('	')

      if (data.length === 5) {
        const [title, description, scoreDescription, numberOfTeams, score] =
          data

        form.setValue('title', title)
        form.setValue('description', description)
        form.setValue('scoreDescription', scoreDescription)
        form.setValue(
          'numberOfTeams',
          numberOfTeams === 'todas' ? 0 : Number(numberOfTeams),
        )
        const scoreOptions = [
          'maior tempo',
          'x de pontos',
          'menor tempo',
          'somatoria de pontos',
        ]

        if (scoreOptions.includes(score)) {
          switch (score) {
            case 'maior tempo':
              form.setValue('scoreType', 'TIME')
              form.setValue('scoreOrdination', 'BIGGER')
              break
            case 'menor tempo':
              form.setValue('scoreType', 'TIME')
              form.setValue('scoreOrdination', 'SMALLER')
              break
            case 'x de pontos':
              form.setValue('scoreType', 'POINTS')
              form.setValue('scoreOrdination', 'NONE')
              form.setValue('defaultScore', 10)
              break
            case 'somatoria de pontos':
              form.setValue('scoreType', 'NUMBER')
              form.setValue('scoreOrdination', 'BIGGER')
              break
          }
        }

        //
      }

      // console.log(data)
    }
  }

  // form.watch('title') && console.log(form.watch('title').split(''))

  const zodArrays = Object.keys(activitySchema.shape).filter((fieldName) => {
    const fieldSchema = activitySchema.shape[fieldName]

    return fieldSchema._def.innerType?._def.typeName === 'ZodArray'
  })

  const zodArraysForm = zodArrays
    .map((fieldName) => ({
      [fieldName]: useFieldArray({ // eslint-disable-line
        control: form.control,
        name: fieldName as never,
      }),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            onPaste={pasted}
          >
            <pre>{JSON.stringify({ zodArraysForm }, null, 2)}</pre>

            {Object.keys(activitySchema.shape).map((fieldName) => {
              const fieldSchema = activitySchema.shape[fieldName]
              const label = fieldSchema._def.description // Obtém a descrição do campo
              const fieldMin = fieldSchema._def?.checks?.find(
                (c) => c.kind === 'min',
              )?.value // Obtém o valor mínimo do campo (se houver)

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
                          {fieldMin === 10 ? (
                            <Textarea placeholder={label} {...field} />
                          ) : (
                            <Input placeholder={label} {...field} />
                          )}
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
                            {fieldMin === 10 ? (
                              <Textarea placeholder={label} {...field} />
                            ) : (
                              <Input placeholder={label} {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                }

                if (fieldSchema._def.innerType._def.typeName === 'ZodArray') {
                  const { append, fields, remove } = zodArraysForm[fieldName]
                  return (
                    <>
                      <Button type="button" onClick={() => append(0)}>
                        Adicionar {label}
                      </Button>
                      {form.formState.errors[fieldName] && (
                        <FormMessage>
                          {form.formState.errors[fieldName].message}
                        </FormMessage>
                      )}

                      {fields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={
                            `${fieldName}.${index}` as unknown as keyof typeof activitySchema.shape
                          }
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {label} {index + 1}
                              </FormLabel>
                              <FormControl>
                                <div className="flex gap-4">
                                  <Input placeholder={label} {...field} />
                                  <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                  >
                                    Remover
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </>
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
