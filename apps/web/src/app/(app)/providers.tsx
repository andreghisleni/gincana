'use client'

import { trpc } from '@/lib/trpc/react'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const updateUserLastOnline = trpc.updateUserLastOnline.useMutation()

  useEffect(() => {
    const timer = setInterval(() => {
      updateUserLastOnline.mutate();
    }, 30000);

    return () => clearInterval(timer);
  }, [])

  return <>{children}</>
}
