import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Descontar pontos',
}

export default async function ScoresPage() {
  unstable_noStore()

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-lg flex-col gap-4 border p-4">
        <h1 className=" text-xl">Denunciar quebra das regras</h1>
        <Separator orientation="horizontal" />
      </div>
    </div>
  )
}
