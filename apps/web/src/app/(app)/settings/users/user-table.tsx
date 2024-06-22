'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, User } from './columns'

type IProps = {
  users: User[]
}

export const UsersTable: React.FC<IProps> = ({ users }) => {
  const { data, refetch } = trpc.getUsers.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns({ refetch })} data={data?.users || users} />
      </CardContent>
    </Card>
  )
}
