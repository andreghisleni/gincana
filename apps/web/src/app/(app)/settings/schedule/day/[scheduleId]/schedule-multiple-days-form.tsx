'use client'

import { RouterOutput } from '@gincana/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import z from 'zod'

import { Row } from '@/components/Row'
import { ReactSelect } from '@/components/Select'
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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'
import {
  generateDaysWithTimes,
  WeekTime,
} from '@/utils/generate-days-with-times'
import { times } from '@/utils/times'

const scheduleMultipleDaysSchema = z.object({
  generateDays: z.array(z.string()),
  month: z.coerce.number(),
  year: z.coerce.number(),
  days: z.array(
    z.object({
      day: z.coerce.date(),
      times: z.array(z.string()),
    }),
  ),
})

export type Schedule = RouterOutput['getSchedule']['schedule']

export type ScheduleMultipleDaysData = z.infer<
  typeof scheduleMultipleDaysSchema
>
type ClientUseFormProps = UseFormReturn<ScheduleMultipleDaysData>

interface ButtonsProps {
  form: ClientUseFormProps
}

const months = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

const days = [
  { value: 'SUNDAY', label: 'Domingo' },
  { value: 'MONDAY', label: 'Segunda' },
  { value: 'TUESDAY', label: 'Terça' },
  { value: 'WEDNESDAY', label: 'Quarta' },
  { value: 'THURSDAY', label: 'Quinta' },
  { value: 'FRIDAY', label: 'Sexta' },
  { value: 'SATURDAY', label: 'Sábado' },
]

export function ScheduleMultipleDaysForm({
  refetch,
  isOpen,
  setIsOpen,
  buttons,
  disabled,
  schedule,
  defaultWeekTimes,
}: {
  refetch: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  buttons?: (b: ButtonsProps) => React.ReactNode
  disabled?: boolean
  schedule: Schedule
  defaultWeekTimes: WeekTime[]
}) {
  const { toast } = useToast()
  const form = useForm<ScheduleMultipleDaysData>({
    disabled,
    resolver: zodResolver(scheduleMultipleDaysSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      days: [],
      generateDays: [...defaultWeekTimes.map(({ dayOfWeek }) => dayOfWeek)],
    },
  })

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: 'days',
    rules: {
      required: 'Campo obrigatório',
      minLength: 1,
    },
  })

  const createManyScheduleDays = trpc.createManyScheduleDays.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

      toast({
        title: 'Paciente cadastrado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao cadastrar o paciente',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: ScheduleMultipleDaysData) {
    console.log(values)
    try {
      await createManyScheduleDays.mutateAsync({
        scheduleId: schedule.id,
        days: values.days.map(({ day, times }) => ({
          day,
          times,
        })),
      })

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

  function generateDays() {
    console.log('generateDays')

    const generatedDaysWithTimes = generateDaysWithTimes({
      year: form.getValues('year'),
      month: form.getValues('month'),
      defaultWeekTimes,
    })

    form.setValue(
      'days',
      generatedDaysWithTimes
        .filter((day) => form.getValues('generateDays').includes(day.weekDay))
        .map((day) => ({
          day: parseISO(day.date),
          times: day.times,
        })),
    )
  }

  const parsedTimes = useMemo(() => {
    const startTime = schedule?.startTime || '00:00'
    const endTime = schedule?.endTime || '23:00'

    const start = times.indexOf(startTime)
    const end = times.indexOf(endTime)

    return times.slice(start, end + 1)
  }, [schedule?.startTime, schedule?.endTime])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Row>
          <FormField
            control={form.control}
            name="generateDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias da semana</FormLabel>
                <FormControl>
                  <ReactSelect
                    isMulti
                    defaultValue={days.filter((day) =>
                      field.value.includes(day.value),
                    )}
                    value={days.filter((day) =>
                      field.value.includes(day.value),
                    )}
                    onChange={(value: any) => { // eslint-disable-line 
                      console.log(value) // eslint-disable-line no-console
                      field.onChange(value.map((v: any) => v.value)) // eslint-disable-line @typescript-eslint/no-explicit-any
                    }}
                    options={days}
                    isDisabled={field.disabled}
                    closeMenuOnSelect={false}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </Row>
        <Row>
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input placeholder="Ano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia da semana</FormLabel>
                <FormControl>
                  <ReactSelect
                    defaultValue={months.filter(
                      ({ value }) => field.value === value,
                    )}
                    value={months.filter(({ value }) => field.value === value)}
                    onChange={(value: any) => { // eslint-disable-line 
                      console.log(value) // eslint-disable-line no-console
                      field.onChange(value.value) // eslint-disable-line @typescript-eslint/no-explicit-any
                    }}
                    options={months}
                    isDisabled={field.disabled}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto">
            <Button onClick={generateDays} className="w-96" type="button">
              Gerar dias
            </Button>
          </div>
        </Row>

        <Row className="items-center">
          <Button
            type="button"
            onClick={() =>
              append({
                day: new Date(),
                times: [],
              })
            }
          >
            Adicionar dias
          </Button>
          {form.formState.errors.days && (
            <FormMessage>{form.formState.errors.days.message}</FormMessage>
          )}
        </Row>

        {/* <Row>
          <pre>{JSON.stringify(fields, null, 2)}</pre>
        </Row> */}

        {fields.map((field, index) => (
          <Row key={field.id}>
            <FormField
              control={form.control}
              name={`days.${index}.day`}
              render={({ field }) => (
                <FormItem className="mt-auto flex w-[28rem] flex-col">
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
                            format(field.value, 'PPP - iiii', { locale: ptBR })
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
                        disableNavigation
                        fromMonth={
                          new Date(
                            form.getValues('year'),
                            form.getValues('month') - 1,
                          )
                        }
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`days.${index}.times`}
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

            <Button
              type="button"
              onClick={() => remove(index)}
              className="mt-auto"
            >
              Remover
            </Button>
          </Row>
        ))}

        {!buttons && !disabled && (
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        )}
        {buttons && buttons({ form })}

        {fields.length < 1 && <div className="h-[300px]"></div>}
      </form>
    </Form>
  )
}
