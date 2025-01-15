'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ZoomableImage } from '@/components/ui/zoomable-image'
import { useAuthToken } from '@/hooks/use-auth-token'
import { logout } from '@/lib/auth/auth'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { LogOut, Settings, User } from 'lucide-react'
import { useCallback } from 'react'

const extractUserNameTwoLetters = (username: string) => {
  return username.slice(0, 2)
}

export const NavbarUserAuthenticatedFragment = graphql(`
  fragment NavbarUserAuthenticated on User {
    id
    username
    profilePictureUrl
  }
`)

interface NavbarUserAuthenticatedProps {
  data: FragmentOf<typeof NavbarUserAuthenticatedFragment>
}

export function NavbarUserAuthenticated({
  data
}: NavbarUserAuthenticatedProps) {
  const user = readFragment(NavbarUserAuthenticatedFragment, data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_token, _setAuthToken, removeValue] = useAuthToken()

  const handleLogout = useCallback(async () => {
    removeValue()
    logout()
  }, [removeValue])

  return (
    <div
      suppressHydrationWarning
      className='group flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-background to-background px-4 py-2 transition-all duration-300 hover:from-primary/5 hover:to-secondary/5'
    >
      <MenuItem handleLogout={handleLogout}>
        <span className='text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary'>
          {user.username}
        </span>
      </MenuItem>
      <Avatar className='h-8 w-8 transition-transform duration-300 group-hover:scale-105'>
        <ZoomableImage src={user.profilePictureUrl ?? ''}>
          <AvatarImage
            src={user.profilePictureUrl ?? ''}
            className='object-cover'
          />
        </ZoomableImage>
        <AvatarFallback className='text-xs'>
          {extractUserNameTwoLetters(user.username)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

function MenuItem({
  children,
  handleLogout
}: {
  children: React.ReactNode
  handleLogout?: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <User className='mr-2 h-4 w-4' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <Settings className='mr-2 h-4 w-4' />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-destructive'
          onClick={handleLogout}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
