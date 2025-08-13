'use client'

import { differenceInMilliseconds, format } from 'date-fns'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { usePersistentState } from '@/hooks/use-percistent-state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Timer } from './timer'
import { WriteTime } from './write-time'

export function Time({
  handleFinish,
  setLockSelectedTeam,
}: {
  handleFinish: (time: number) => void
  setLockSelectedTeam: (value: boolean) => void
}) {

  return (
    <Tabs defaultValue="timer">
      <TabsList>
        <TabsTrigger value="timer">Timer</TabsTrigger>
        <TabsTrigger value="Digitar">Digitar</TabsTrigger>
      </TabsList>
      <TabsContent value="timer">
        <Timer {...{
          handleFinish,
          setLockSelectedTeam
        }} />
      </TabsContent>
      <TabsContent value="Digitar">
        <WriteTime {...{
          handleFinish,
          setLockSelectedTeam
        }} />
      </TabsContent>
    </Tabs>
  )
}