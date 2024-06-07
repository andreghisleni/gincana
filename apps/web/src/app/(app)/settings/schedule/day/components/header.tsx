'use client'

import { RouterOutput } from '@gincana/trpc'
import React from 'react'

import ScheduleSwitcher from '@/components/schedule-switcher'

export function Header({
  schedules,
}: {
  schedules: RouterOutput['getSchedules']['schedules']
}) {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Dias de atendimento
        </h1>

        <ScheduleSwitcher schedules={schedules} url="/settings/schedule/day" />
      </div>
    </>
  )
}
