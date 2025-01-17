import { AddRecipeDialog } from '@/components/forms/recipes/add-recipe/add-recipe-dialog'
import { RecipesSearch } from '@/components/recipes/recipes-search/recipes-search'
import { RecipesSearchList } from '@/components/recipes/recipes-search/recipes-search-list'
import { recipeSearchParamsCache } from '@/components/recipes/recipes-search/recipes-search-params'
import { ScrollText } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

interface RecipesPageProps {
  searchParams: Promise<SearchParams>
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  await recipeSearchParamsCache.parse(searchParams)

  return (
    <main className='container relative mx-auto flex bg-gradient-to-b from-background via-background to-background/80 px-6 pt-20 dark:from-background dark:via-background/95 dark:to-background/75'>
      <div className='flex w-full flex-col items-center p-10'>
        <div className='flex w-full max-w-[1400px] flex-col items-center justify-center gap-4'>
          <h1 className='flex items-center gap-2 bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-4xl font-bold text-transparent'>
            <span className=''>
              <ScrollText className='mr-1 h-10 w-10 dark:text-primary' />
            </span>
            Recipes
          </h1>
          <div className='w-full max-w-xl'>
            <Suspense>
              <RecipesSearch />
            </Suspense>
          </div>
        </div>

        <div className='mx-auto mt-10 h-max w-full max-w-[1400px]'>
          <Suspense
            fallback={
              <div className='flex flex-wrap justify-center gap-6'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className='h-[400px] w-[300px] animate-pulse rounded-lg bg-muted/20'
                  />
                ))}
              </div>
            }
          >
            <RecipesSearchList />
          </Suspense>
        </div>
      </div>

      <AddRecipeDialog />
    </main>
  )
}
