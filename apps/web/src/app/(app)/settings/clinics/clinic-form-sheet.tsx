'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ClinicForm } from './clinic-form'

export function ClinicFormSheet({
  refetch,
  clinic,
}: {
  refetch: () => void
  clinic?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{clinic ? 'Editar' : 'Adicionar'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{clinic ? 'Editar' : 'Cadastrar'}Procedimento</SheetTitle>
          <SheetDescription>
            {clinic ? 'Editar' : 'Cadastrar'}nova procedimento
          </SheetDescription>
        </SheetHeader>
        <ClinicForm
          {...{
            refetch: () => {
              refetch()
              setIsOpen(false)
            },
            clinic,
            isOpen,
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
