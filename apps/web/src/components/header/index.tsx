import { auth } from '@gincana/auth'

import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { ThemeSwitcher } from './theme-switcher'
import { UserProfileButton } from './user-profile-button'

export async function Header() {
  const session = await auth()

  if (!session) {
    return null
  }

  return (
    <div className="border-b">
      <div className="flex items-center justify-center px-8 sm:h-[4.25rem] sm:justify-between ">
        <div className="flex flex-col items-center gap-4 space-x-4 sm:flex-row sm:gap-0">
          <h1 className="text-xl">Gincana</h1>

          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <Separator orientation="horizontal" className="sm:hidden" />

          {session.user.type === 'ADMIN' && (
            <nav className="flex flex-col items-center space-x-2 sm:flex-row lg:space-x-3">
              <MenuLink href="/dashboard">Dashboard</MenuLink>
              <MenuLink href="/scores" shouldMatchExact>
                Scores
              </MenuLink>
              <MenuLink href="/scores/all">Scores all</MenuLink>
              <MenuLink href="/scores/one-two">Scores one-two</MenuLink>
            </nav>
          )}
          {session.user.type === 'ACTIVITY' && (
            <nav className="flex flex-col items-center space-x-2 sm:flex-row lg:space-x-3">
              <MenuLink href={`/activity/${session.user.activityId}`}>
                Atividade
              </MenuLink>
              <MenuLink href="/point-discount">Denunciar</MenuLink>
            </nav>
          )}
        </div>

        <div className="hidden items-center space-x-4 sm:flex">
          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </div>
  )
}
