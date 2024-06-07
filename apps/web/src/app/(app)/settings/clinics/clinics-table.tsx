'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { ClinicFormSheet } from './clinic-form-sheet'
import { Clinic, columns } from './columns'

type IProps = {
  clinics: Clinic[]
}

export const ClinicsTable: React.FC<IProps> = ({ clinics }) => {
  const { data, refetch } = trpc.getClinics.useQuery({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suas Clinicas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.clinics || clinics}
          addComponent={<ClinicFormSheet refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
