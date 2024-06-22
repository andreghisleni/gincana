'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, ReportMotive } from './columns'
import { ReportMotiveForm } from './report-motive-form'

type IProps = {
  reportMotives: ReportMotive[]
}

export const ReportMotivesTable: React.FC<IProps> = ({ reportMotives }) => {
  const { data, refetch } = trpc.getReportMotives.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motivo da denuncia</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.reportMotives || reportMotives}
          addComponent={<ReportMotiveForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
