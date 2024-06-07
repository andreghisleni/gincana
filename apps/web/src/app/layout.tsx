import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { Toaster as T2 } from '@/components/ui/toaster'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    template: '%s | Gincana aniversario GE Xapecó',
    absolute: 'Gincana aniversario GE Xapecó',
  },
  description: 'Gincana aniversario GE Xapecó.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={inter.variable} suppressHydrationWarning>
      <body className="overflow-y-hidden antialiased">
        <Providers>
          {children}

          <Toaster />
          <T2 />
        </Providers>
      </body>
    </html>
  )
}
