'use client'

import { RouterOutput } from '@gincana/trpc'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { ClinicForm } from './clinic-form'
import { LogoInput } from './logo-input'

type Clinic = RouterOutput['getClinic']['clinic']

export function Clinic({
  clinicId,
  clinic,
}: {
  clinicId: string
  clinic: Clinic
}) {
  const { data, refetch } = trpc.getClinic.useQuery({
    id: clinicId,
  })

  const c = data?.clinic || clinic

  if (!c) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinica</CardTitle>
        <CardDescription>Editar clinica</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-8">
        <div className="w-96">
          <LogoInput
            clinicId={c.id}
            logo_url={c.logo ? `/api/clinic/${c.id}/logo` : undefined}
          />
        </div>

        <div className="w-full">
          <ClinicForm clinic={c} refetch={refetch} />
        </div>
      </CardContent>
    </Card>
  )
}
