import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

export function NavbarUserUnauthenticated() {
  return (
    <div
      suppressHydrationWarning
      className='from-background to-background hover:from-primary/5 hover:to-secondary/5 flex items-center gap-2 rounded-full bg-linear-to-r px-4 py-2 transition-all duration-300'
    >
      <Link suppressHydrationWarning href='/auth/sign-in' passHref>
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <LogIn className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'>
            Sign in
          </span>
        </Button>
      </Link>
      <span className='text-muted-foreground text-xs'>or</span>
      <Link href='/auth/sign-up' passHref>
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <UserPlus className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'>
            Sign up
          </span>
        </Button>
      </Link>
    </div>
  )
}
