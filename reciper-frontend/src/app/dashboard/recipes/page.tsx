'use client'

import { DashboardRecipes } from '@/components/dashboard/dashboard-recipes'

export default function RecipesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>My Recipes</h2>
        <p className='text-sm text-muted-foreground'>
          Manage and organize your created recipes
        </p>
      </div>
      <DashboardRecipes />
    </div>
  )
}
