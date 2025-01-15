import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

export function NavbarUserUnauthenticated() {
  return (
    <div
      suppressHydrationWarning
      className='flex items-center gap-2 rounded-full bg-gradient-to-r from-background to-background px-4 py-2 transition-all duration-300 hover:from-primary/5 hover:to-secondary/5'
    >
      <Link suppressHydrationWarning href='/auth/sign-in' passHref>
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <LogIn className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
            Sign in
          </span>
        </Button>
      </Link>
      <span className='text-xs text-muted-foreground'>or</span>
      <Link href='/auth/sign-up' passHref>
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <UserPlus className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
            Sign up
          </span>
        </Button>
      </Link>
    </div>
  )
}
