import { Activity, MessageCircleWarning, User2, Users } from 'lucide-react'
import { ReactNode } from 'react'

import { Screen } from '@/components/screen'

import { AsideLink } from './aside-link'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Screen>
      <div className="grid grid-cols-10 gap-12 px-8">
        <aside className="col-span-1 -mx-4 space-y-4">
          <h2 className="mx-4 text-2xl font-bold tracking-tight">Settings</h2>

          <nav className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="mb-2 px-4 text-xxs font-semibold uppercase text-muted-foreground">
                General
              </span>
              <AsideLink href="/settings/profile">
                <User2 className="mr-2 size-4" />
                Profile
              </AsideLink>
              <AsideLink href="/settings/users">
                <Users className="mr-2 size-4" />
                Users
              </AsideLink>
              <AsideLink href="/settings/activities">
                <Activity className="mr-2 size-4" />
                Atividades
              </AsideLink>
              <AsideLink href="/settings/teams">
                <Users className="mr-2 size-4" />
                Equipes
              </AsideLink>
              <AsideLink href="/settings/report-motives">
                <MessageCircleWarning className="mr-2 size-4" />
                Denúncias
              </AsideLink>
            </div>
            {/* <div className="flex flex-col gap-1">
              <span className="mb-2 px-4 text-xxs font-semibold uppercase text-muted-foreground">
                Developers
              </span>
              <AsideLink href="/settings/developers">
                <Code2 className="mr-2 size-4" />
                API & Webhooks
              </AsideLink>
              <AsideLink href="/settings/developers/logs">
                <SquareDashedBottomCode className="mr-2 size-4" />
                Webhook Logs
              </AsideLink>
            </div> */}
          </nav>
        </aside>

        <div className="col-span-9">{children}</div>
      </div>
    </Screen>
  )
}
