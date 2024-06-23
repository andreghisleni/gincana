import { auth } from '@gincana/auth'

import { cn } from '@/lib/utils'

import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { routes } from './routes'
import { ThemeSwitcher } from './theme-switcher'
import { UserProfileButton } from './user-profile-button'

export async function Header({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  const session = await auth()

  if (!session) {
    return null
  }

  const parsedRoutes = routes({ activityId: session.user.activityId })

  return (
    <div className={cn('border-b', className)}>
      <div className="hidden h-[3.5rem] items-center  justify-between px-8 sm:flex ">
        <div className="flex w-auto items-center gap-4 space-x-4 overflow-x-auto sm:gap-0">
          <h1 className="text-xl">Gincana</h1>

          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <Separator orientation="horizontal" className="sm:hidden" />

          {/* {session.user.type === 'ADMIN' && (
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
          )} */}

          <nav className="flex flex-col items-center space-x-2 sm:flex-row lg:space-x-3">
            {parsedRoutes[session.user.type]?.map((route) => (
              <MenuLink
                key={route.href}
                href={route.href}
                data-invert={inverted}
                shouldMatchExact={route.shouldMatchExact}
              >
                {route.title}
              </MenuLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center space-x-4 sm:flex">
          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>

      <nav className="flex items-center justify-between px-4 sm:hidden">
        {parsedRoutes[session.user.type]?.map((route) => (
          <MenuLink
            key={route.href}
            href={route.href}
            data-invert={inverted}
            shouldMatchExact={route.shouldMatchExact}
          >
            {route.title}
          </MenuLink>
        ))}
      </nav>
    </div>
  )
}
