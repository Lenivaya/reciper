'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarUser } from './navbar-user/navbar-user'

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className='fixed top-5 z-40 flex w-full justify-center px-4 pt-4'>
      <header className='border-border/40 bg-background/95 shadow-primary/5 hover:shadow-primary/10 supports-backdrop-filter:bg-background/60 relative w-full rounded-full border shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-lg md:w-[90%] lg:w-[80%] xl:w-[60%]'>
        <div className='from-primary/10 via-secondary/5 to-primary/10 absolute inset-0 rounded-full bg-linear-to-r opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100' />

        <div className='relative flex h-16 items-center justify-between px-8'>
          <div className='flex items-center gap-8'>
            <Link
              href='/'
              className='group flex items-center gap-2.5 transition-all duration-300 hover:scale-105'
            >
              <span className='bg-linear-to-r from-rose-500 via-amber-500 to-rose-500 bg-clip-text text-xl font-black tracking-tight text-transparent'>
                Reciper
              </span>
              <span className='text-xl opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'>
                🍳
              </span>
            </Link>

            <div className='from-border/5 via-border/40 to-border/5 h-7 w-[1px] bg-linear-to-b' />

            <nav className='flex items-center space-x-8'>
              <Link
                href='/recipes'
                className={cn(
                  'group flex items-center gap-2 text-sm font-medium transition-all duration-300',
                  pathname.startsWith('/recipes')
                    ? 'text-primary scale-105'
                    : 'text-muted-foreground hover:text-primary hover:scale-105'
                )}
              >
                <span>Recipes</span>
                <span className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'>
                  📝
                </span>
              </Link>
              <Link
                href='/cooks'
                className={cn(
                  'group flex items-center gap-2 text-sm font-medium transition-all duration-300',
                  pathname.startsWith('/cooks')
                    ? 'text-primary scale-105'
                    : 'text-muted-foreground hover:text-primary hover:scale-105'
                )}
              >
                <span>Cooks</span>
                <span className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12'>
                  👨‍🍳
                </span>
              </Link>
            </nav>
          </div>

          <NavbarUser />
        </div>
      </header>
    </div>
  )
}
