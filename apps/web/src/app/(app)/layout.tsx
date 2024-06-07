import { Header } from '@/components/header'

import { Providers } from './providers'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="mt-4 flex max-h-[calc(100vh-56px-16px)] flex-1 flex-col gap-4">
        <Providers>{children}</Providers>
      </main>
    </div>
  )
}
