'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarUser } from './navbar-user/navbar-user'

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className='fixed top-5 z-40 flex w-full justify-center px-4 pt-4'>
      <header className='relative w-full rounded-full border border-border/40 bg-background/95 shadow-xs shadow-primary/5 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 supports-backdrop-filter:bg-background/60 md:w-[90%] lg:w-[80%] xl:w-[60%]'>
        <div className='absolute inset-0 rounded-full bg-linear-to-r from-primary/10 via-secondary/5 to-primary/10 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100' />

        <div className='relative flex h-16 items-center justify-between px-8'>
          <div className='flex items-center gap-8'>
            <Link
              href='/'
              className='group flex items-center gap-2.5 transition-all duration-300 hover:scale-105'
            >
              <span className='bg-linear-to-r from-rose-500 via-amber-500 to-rose-500 bg-clip-text text-xl font-black tracking-tight text-transparent'>
                Reciper
              </span>
              <span className='text-xl opacity-90 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
                🍳
              </span>
            </Link>

            <div className='h-7 w-[1px] bg-linear-to-b from-border/5 via-border/40 to-border/5' />

            <nav className='flex items-center space-x-8'>
              <Link
                href='/recipes'
                className={cn(
                  'group flex items-center gap-2 text-sm font-medium transition-all duration-300',
                  pathname.startsWith('/recipes')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <span>Recipes</span>
                <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
                  📝
                </span>
              </Link>
              <Link
                href='/cooks'
                className={cn(
                  'group flex items-center gap-2 text-sm font-medium transition-all duration-300',
                  pathname.startsWith('/cooks')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <span>Cooks</span>
                <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
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
