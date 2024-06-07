'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { twMerge } from 'tailwind-merge'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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

import { ScheduleDay } from './columns'

const formSchema = z.object({
  day: z.coerce.date(),
  times: z.array(z.string()).min(1),
})

export function ScheduleDayForm({
  refetch,
  scheduleDay,
  scheduleId,
}: {
  refetch: () => void
  scheduleDay?: ScheduleDay
  scheduleId: string
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: scheduleDay?.day || new Date(),
      times: scheduleDay?.times || [],
    },
  })

  const { data } = trpc.getSchedule.useQuery({
    id: scheduleId,
  })

  const createScheduleDay = trpc.createScheduleDay.useMutation({
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

  const updateScheduleDay = trpc.updateScheduleDay.useMutation({
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
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (scheduleDay) {
        await updateScheduleDay.mutateAsync({
          id: scheduleDay.id,
          ...values,
        })
      } else {
        await createScheduleDay.mutateAsync({
          day: values.day,
          times: values.times,
          scheduleId,
        })
      }

      console.log('values', values)
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
        <Button variant="outline">
          {scheduleDay ? 'Editar' : 'Adicionar'}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{scheduleDay ? 'Editar' : 'Cadastrar'}Agenda</SheetTitle>
          <SheetDescription>
            {scheduleDay ? 'Editar' : 'Cadastrar'}nova agenda
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dia</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={twMerge(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
              ) : scheduleDay ? (
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
