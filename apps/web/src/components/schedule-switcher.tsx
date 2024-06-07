import { RouterOutput } from '@gincana/trpc'
import { CaretSortIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon, Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type ScheduleSwitcherProps = {
  schedules: RouterOutput['getSchedules']['schedules']
  url: string
}

export default function ScheduleSwitcher({
  schedules,
  url,
}: ScheduleSwitcherProps) {
  const router = useRouter()
  const { scheduleId } = useParams<{ scheduleId?: string }>()

  const [isPendingFilterTransition, startTransition] = useTransition()

  const [open, setOpen] = useState(false)

  const selectSchedule = useCallback(
    (id: string) => {
      startTransition(() => {
        router.push(`${url}/${id}`)
      })
      setOpen(false)
    },
    [router, startTransition, url],
  )

  const selectedSchedule = useMemo(() => {
    return schedules.find((schedule) => schedule.id === scheduleId)
  }, [schedules, scheduleId])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a schedule"
          className={cn('w-[200px] justify-between')}
        >
          {isPendingFilterTransition && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {!isPendingFilterTransition &&
            (selectedSchedule?.name ?? 'Select a schedule')}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search schedule..." />
            <CommandEmpty>No schedule found.</CommandEmpty>
            {schedules.map((schedule) => (
              <CommandItem
                key={schedule.id}
                onSelect={() => selectSchedule(schedule.id)}
                className="text-sm"
              >
                {schedule.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedSchedule?.id === schedule.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push('/settings/schedule')
                }}
              >
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Create Schedule
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
