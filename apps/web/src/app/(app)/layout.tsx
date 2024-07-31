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
      <div className="flex h-screen flex-col overflow-hidden sm:hidden">
        <main className="flex-grow space-y-4 overflow-auto">
          <OtherHeader />
          <Providers>{children}</Providers>
          <div className="h-40" />
        </main>
        <Header
          className="fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-background"
          inverted
        />
      </div>
    </>
  )
}
