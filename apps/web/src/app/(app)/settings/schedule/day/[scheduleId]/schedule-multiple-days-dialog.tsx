'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { WeekTime } from '@/utils/generate-days-with-times'

import {
  Schedule,
  ScheduleMultipleDaysForm,
} from './schedule-multiple-days-form'

interface ScheduleMultipleDaysFormDialogProps {
  refetch: () => void
  disabled?: boolean
  schedule: Schedule
  defaultWeekTimes: WeekTime[]
}

export function ScheduleMultipleDaysFormDialog({
  refetch,
  disabled,
  schedule,
  defaultWeekTimes,
}: ScheduleMultipleDaysFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {disabled ? 'Visualizar' : 'Adicionar Muitos'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{disabled ? 'Visualizar' : 'Cadastrar'}</DialogTitle>
        </DialogHeader>

        <ScheduleMultipleDaysForm
          {...{
            refetch,
            isOpen,
            setIsOpen,
            schedule,
            disabled,
            defaultWeekTimes,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
