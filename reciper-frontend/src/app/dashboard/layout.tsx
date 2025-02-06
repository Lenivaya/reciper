import { AppSidebar } from '@/components/app-sidebar'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='bg-background min-h-[calc(100vh-4rem)]'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='flex-1'>
          <div className='relative h-full overflow-y-auto'>
            <DashboardNav />
            <div className='flex-1 space-y-8 p-8'>{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
