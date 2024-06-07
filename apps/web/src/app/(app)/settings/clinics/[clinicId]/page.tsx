import { Metadata } from 'next'
import { z } from 'zod'

import { serverClient } from '@/lib/trpc/server'

import { Clinic } from './clinic'

export const metadata: Metadata = {
  title: 'Profile settings',
}

const clinicSchema = z.object({
  params: z.object({
    clinicId: z.string(),
  }),
})

type ClinicProps = z.infer<typeof clinicSchema>

export default async function ClinicPage(props: ClinicProps) {
  const {
    params: { clinicId },
  } = clinicSchema.parse(props)

  const { clinic } = await serverClient.getClinic({ id: clinicId })

  if (!clinic) {
    return <div>Not found</div>
  }

  return (
    <Clinic
      {...{
        clinicId,
        clinic,
      }}
    />
  )
}
