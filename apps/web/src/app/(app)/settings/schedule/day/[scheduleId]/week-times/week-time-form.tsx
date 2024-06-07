'use client'

import { scheduleDefaultWeekTimeToCreateSchema } from '@gincana/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'
import { times } from '@/utils/times'

import { WeekTime } from './columns'

// const daysOfWeek = [
//   { label: 'Domingo', value: 'SUNDAY' },
//   { label: 'Segunda', value: 'MONDAY' },
//   { label: 'Terça', value: 'TUESDAY' },
//   { label: 'Quarta', value: 'WEDNESDAY' },
//   { label: 'Quinta', value: 'THURSDAY' },
//   { label: 'Sexta', value: 'FRIDAY' },
//   { label: 'Sábado', value: 'SATURDAY' },
// ]

export enum DayOfWeek {
  SUNDAY = 'Domingo',
  MONDAY = 'Segunda',
  TUESDAY = 'Terça',
  WEDNESDAY = 'Quarta',
  THURSDAY = 'Quinta',
  FRIDAY = 'Sexta',
  SATURDAY = 'Sábado',
}

const daysOfWeek = Object.entries(DayOfWeek).map(([value, label]) => ({
  label,
  value,
}))

export function WeekTimeForm({
  refetch,
  weekTime,
  scheduleId,
  usedWeekTimes,
}: {
  refetch: () => void
  weekTime?: WeekTime
  scheduleId: string
  usedWeekTimes?: string[]
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof scheduleDefaultWeekTimeToCreateSchema>>({
    resolver: zodResolver(scheduleDefaultWeekTimeToCreateSchema),
    defaultValues: {
      dayOfWeek: weekTime?.dayOfWeek || undefined,
      times: weekTime?.times || [],
      scheduleId,
    },
  })

  const { data } = trpc.getSchedule.useQuery({
    id: scheduleId,
  })

  const createWeekTime = trpc.createScheduleDefaultWeekTime.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: 'Agenda cadastrado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao cadastrar o agenda',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  const updateWeekTime = trpc.updateScheduleDefaultWeekTime.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: 'Agenda atualizado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao atualizar o agenda',
        description: error as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(
    values: z.infer<typeof scheduleDefaultWeekTimeToCreateSchema>,
  ) {
    try {
      console.log('values', values)
      if (weekTime) {
        await updateWeekTime.mutateAsync({
          id: weekTime.id,
          times: values.times,
        })
      } else {
        await createWeekTime.mutateAsync({
          dayOfWeek: values.dayOfWeek,
          times: values.times,
          scheduleId,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  const parsedTimes = useMemo(() => {
    const startTime = data?.schedule?.startTime || '00:00'
    const endTime = data?.schedule?.endTime || '23:00'

    const start = times.indexOf(startTime)
    const end = times.indexOf(endTime)

    return times.slice(start, end + 1)
  }, [data])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{weekTime ? 'Editar' : 'Adicionar'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{weekTime ? 'Editar' : 'Cadastrar'}Agenda</SheetTitle>
          <SheetDescription>
            {weekTime ? 'Editar' : 'Cadastrar'}nova agenda
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
            <input type="hidden" {...form.register('scheduleId')} />
            <FormField
              control={form.control}
              name="dayOfWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia da semana</FormLabel>
                  <FormControl>
                    <ReactSelect
                      defaultValue={daysOfWeek.filter(
                        ({ value }) => field.value === value,
                      )}
                      value={daysOfWeek.filter(
                        ({ value }) => field.value === value,
                      )}
                      onChange={(value: any) => { // eslint-disable-line 
                        console.log(value) // eslint-disable-line no-console
                        field.onChange(value.value) // eslint-disable-line @typescript-eslint/no-explicit-any
                      }}
                      options={daysOfWeek.filter(
                        (d) => !usedWeekTimes?.includes(d.value),
                      )}
                      isDisabled={field.disabled || !!weekTime}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="times"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horários</FormLabel>
                  <FormControl>
                    <ReactSelect
                      isMulti
                      defaultValue={parsedTimes
                        .filter((time) => field.value?.includes(time))
                        .map((time) => ({ label: time, value: time }))}
                      value={parsedTimes
                        .filter((time) => field.value?.includes(time))
                        .map((time) => ({ label: time, value: time }))}
                      onChange={(value: any) => { // eslint-disable-line 
                        console.log(value) // eslint-disable-line no-console
                        field.onChange(value.map((v: any) => v.value)) // eslint-disable-line @typescript-eslint/no-explicit-any
                      }}
                      options={parsedTimes.map((time) => ({
                        label: time,
                        value: time,
                      }))}
                      isDisabled={field.disabled}
                      closeMenuOnSelect={false}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : weekTime ? (
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
