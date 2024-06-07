import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { FormControl } from './ui/form'

export function MyDatePicker(field: ControllerRenderProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          {/* <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          > */}
          {/* {field.value ? (
              format(field.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )} */}
          <input type="text" className="w-full bg-transparent" />
          {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button> */}
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
