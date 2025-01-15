import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardRecipes } from '@/components/dashboard/dashboard-recipes'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />

      <div className='space-y-4'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Your Recipes
          </h2>
          <p className='text-sm text-muted-foreground'>
            Manage and track your created recipes
          </p>
        </div>
        <DashboardRecipes />
      </div>
    </>
  )
}
