'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className='fixed top-0 z-[40] flex w-full justify-center px-4 pt-6'>
      <header className='relative w-full rounded-full border border-border/40 bg-background/95 shadow-lg shadow-primary/5 backdrop-blur-md transition-all duration-300 hover:shadow-primary/10 supports-[backdrop-filter]:bg-background/60 md:w-[90%] lg:w-[80%] xl:w-[60%]'>
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 transition-opacity duration-300 hover:opacity-100' />

        <div className='relative flex h-14 items-center justify-between px-6'>
          <div className='flex items-center gap-6'>
            <Link
              href='/'
              className='group flex items-center gap-2.5 transition-all duration-300 hover:scale-105'
            >
              <span className='bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 bg-clip-text text-xl font-black tracking-tight text-transparent'>
                Reciper
              </span>
              <span className='text-xl opacity-90 transition-transform duration-300 group-hover:rotate-12'>
                🍳
              </span>
            </Link>

            <div className='h-6 w-[1px] bg-gradient-to-b from-border/5 via-border/40 to-border/5' />

            <nav className='flex items-center space-x-6'>
              <Link
                href='/recipes'
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-primary',
                  pathname.startsWith('/recipes')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105'
                )}
              >
                <span>Recipes</span>
                <span className='transition-transform duration-300 hover:rotate-12'>
                  📝
                </span>
              </Link>
              <Link
                href='/cooks'
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-primary',
                  pathname.startsWith('/cooks')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105'
                )}
              >
                <span>Cooks</span>
                <span className='transition-transform duration-300 hover:rotate-12'>
                  👨‍🍳
                </span>
              </Link>
            </nav>
          </div>

          <div className='flex items-center'>
            <Button
              variant='ghost'
              size='icon'
              className='group h-9 w-9 rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10'
              asChild
            >
              <span className='transition-transform duration-300 group-hover:rotate-12'>
                🥑
              </span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
