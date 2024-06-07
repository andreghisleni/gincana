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
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl">Gincana</h1>

          <Separator orientation="vertical" className="h-6" />

          <nav className="hidden items-center space-x-2 md:flex lg:space-x-3">
            <MenuLink href="/dashboard">Dashboard</MenuLink>
          </nav>
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </div>
  )
}
