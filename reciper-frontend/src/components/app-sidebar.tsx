'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar'
import { dashboardConfig } from '@/config/dashboard'
import { cn } from '@/lib/utils'
import { ChefHat } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className='border-b px-4'>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 font-semibold transition-colors hover:text-primary'
        >
          <ChefHat className='h-5 w-5' />
          <span className='text-sm'>Dashboard</span>
        </Link>
      </SidebarHeader>
      <ScrollArea className='flex-1 py-2'>
        <div className='space-y-1 px-2'>
          {dashboardConfig.sidebarNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2 text-sm',
                  isActive && 'bg-secondary font-medium'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className='h-4 w-4' />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </Sidebar>
  )
}
