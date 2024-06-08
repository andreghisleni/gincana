'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, Team } from './columns'
import { TeamForm } from './team-form'

type IProps = {
  teams: Team[]
}

export const TeamsTable: React.FC<IProps> = ({ teams }) => {
  const { data, refetch } = trpc.getTeams.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.teams || teams}
          addComponent={<TeamForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
