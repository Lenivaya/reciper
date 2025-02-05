'use client'

import { DashboardRecipes } from '@/components/dashboard/dashboard-recipes'
import { Suspense } from 'react'

export default function RecipesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>My Recipes</h2>
        <p className='text-muted-foreground text-sm'>
          Manage and organize your created recipes
        </p>
      </div>
      <Suspense>
        <DashboardRecipes />
      </Suspense>
    </div>
  )
}
