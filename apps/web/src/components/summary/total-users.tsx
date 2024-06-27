import { BarChart } from 'lucide-react'
import { unstable_noStore } from 'next/cache'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { serverClient } from '@/lib/trpc/server'
// import { serverClient } from '@/lib/trpc/server'

export async function TotalUsers() {
  unstable_noStore()

  const { totalUsers } = await serverClient.getTotalUsers()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Usuários</CardTitle>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold">
          {String(totalUsers).padStart(4, '0')}
        </span>
        {/* <p className="text-xs text-muted-foreground">
          + {amountLastMonth} in last 30 days
        </p> */}
      </CardContent>
    </Card>
  )
}
