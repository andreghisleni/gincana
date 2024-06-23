import { Header } from '@/components/header'
import { OtherHeader } from '@/components/header/other'

import { Providers } from './providers'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="hidden h-screen flex-col overflow-hidden sm:flex ">
        <Header />
        <main className="flex max-h-[calc(100vh-56px-16px)] flex-1 flex-col gap-4 overflow-auto p-4 sm:mt-4">
          <Providers>{children}</Providers>
        </main>
      </div>
      <div className="h-screen overflow-hidden sm:hidden">
        <main className="flex h-full max-h-[calc(100vh-57px)] flex-1 flex-col gap-4 overflow-auto p-4 sm:mt-4">
          <OtherHeader />
          <Providers>{children}</Providers>
        </main>{' '}
        <Header className="bottom-0 border-b-0 border-t" inverted />
      </div>
    </>
  )
}
