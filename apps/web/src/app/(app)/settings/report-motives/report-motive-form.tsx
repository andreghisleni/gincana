'use client'

import { reportMotiveSchema } from '@gincana/schema'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

import { ReportMotive } from './columns'

const formName = reportMotiveSchema.description

const values = {}

export function ReportMotiveForm({
  refetch,
  reportMotive,
}: {
  refetch: () => void
  reportMotive?: ReportMotive
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof reportMotiveSchema>>({
    resolver: zodResolver(reportMotiveSchema),
    defaultValues: reportMotive
      ? {
          ...reportMotive,
        }
      : undefined,
  })

  const createReportMotive = trpc.createReportMotive.useMutation({
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

  const updateReportMotive = trpc.updateReportMotive.useMutation({
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

  async function onSubmit(values: z.infer<typeof reportMotiveSchema>) {
    try {
      if (reportMotive) {
        await updateReportMotive.mutateAsync({
          id: reportMotive.id,
          ...values,
        })
      } else {
        await createReportMotive.mutateAsync(values)
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
        <Button variant="outline">
          {reportMotive ? 'Editar' : 'Adicionar'}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {reportMotive ? 'Editar' : 'Cadastrar'} {formName}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <pre>{JSON.stringify(reportMotiveSchema.shape, null, 2)}</pre> */}

            {Object.keys(reportMotiveSchema.shape).map((fieldName) => {
              const fieldSchema = reportMotiveSchema.shape[fieldName]
              const label = fieldSchema._def.description // Obtém a descrição do campo
              const fieldMin =
                fieldSchema._def?.checks?.find((c) => c.kind === 'min')
                  ?.value ||
                fieldSchema._def?.innerType?._def?.checks?.find(
                  (c) => c.kind === 'min',
                )?.value

              if (fieldSchema._def.typeName === 'ZodEnum') {
                const v: { value: string; label: string }[] = values[fieldName]

                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof typeof reportMotiveSchema.shape}
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
                    name={fieldName as keyof typeof reportMotiveSchema.shape}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          {fieldMin === 10 ? (
                            <Textarea placeholder={label} {...field} value={field.value as any /* eslint-disable-line */ } />
                          ) : (
                            <Input
                              placeholder={label}
                              {...field}
                              value={field.value as any /* eslint-disable-line */ }
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }

              if (fieldSchema._def.typeName === 'ZodNullable') {
                if (
                  fieldSchema._def.innerType._def.typeName === 'ZodNumber' ||
                  fieldSchema._def.innerType._def.typeName === 'ZodString'
                ) {
                  return (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof typeof reportMotiveSchema.shape}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            {fieldMin === 10 ? (
                              <Textarea placeholder={label} {...field} value={field.value as any /* eslint-disable-line */ } />
                            ) : (
                              <Input
                                placeholder={label}
                                {...field}
                              value={field.value as any /* eslint-disable-line */ }
                              />
                            )}
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
              ) : reportMotive ? (
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
