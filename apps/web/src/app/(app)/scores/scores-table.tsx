'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Activity, columns, Team } from './columns'

type IProps = {
  teams: Team[]
  activities: Activity[]
}

export const ScoresTable: React.FC<IProps> = ({ teams, activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({
            activities,
          })}
          data={teams}
        />
      </CardContent>
    </Card>
  )
}
