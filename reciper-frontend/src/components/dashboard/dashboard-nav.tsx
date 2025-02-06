'use client'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { dashboardConfig } from '@/config/dashboard'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean)

  const currentRoute = dashboardConfig.sidebarNav.find(
    (item) => item.href === pathname
  )

  const otherRoutes = dashboardConfig.sidebarNav.filter(
    (item) => item.href !== pathname && item.href !== '/dashboard'
  )

  return (
    <header className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-sm'>
      <SidebarTrigger className='-ml-2 h-9 w-9'>
        <Menu className='h-4 w-4' />
      </SidebarTrigger>
      <Separator orientation='vertical' className='h-6' />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard' asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {otherRoutes.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-1'>
                    <BreadcrumbEllipsis className='h-4 w-4' />
                    <span className='sr-only'>Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='start'>
                    {otherRoutes.map((route) => (
                      <DropdownMenuItem
                        key={route.href}
                        onClick={() => router.push(route.href)}
                      >
                        {route.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}
          {segments.length > 1 && currentRoute && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentRoute.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
