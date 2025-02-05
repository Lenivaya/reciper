import { AddRecipeDialog } from '@/components/forms/recipes/add-recipe/add-recipe-dialog'
import { RecipeCardSkeleton } from '@/components/recipes/recipe-card/recipe-card-skeleton'
import { RecipesSearch } from '@/components/recipes/recipes-search/recipes-search'
import { RecipesSearchList } from '@/components/recipes/recipes-search/recipes-search-list'
import { recipeSearchParamsCache } from '@/components/recipes/recipes-search/recipes-search-params'
import { ScrollText } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

interface RecipesPageProps {
  searchParams: Promise<SearchParams>
}

function RecipesContent() {
  return (
    <div className='flex w-full flex-col items-center p-10'>
      <div className='flex w-full max-w-[1400px] flex-col items-center justify-center gap-4'>
        <h1 className='from-primary/60 to-primary flex items-center gap-2 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent'>
          <span className=''>
            <ScrollText className='dark:text-primary mr-1 h-10 w-10' />
          </span>
          Recipes
        </h1>
        <div className='w-full max-w-xl'>
          <RecipesSearch />
        </div>
      </div>

      <div className='mx-auto mt-10 h-max w-full max-w-[1400px]'>
        <Suspense
          fallback={
            <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {Array.from({ length: 12 }).map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <RecipesSearchList />
        </Suspense>
      </div>
    </div>
  )
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  await recipeSearchParamsCache.parse(searchParams)

  return (
    <main className='from-background via-background to-background/80 dark:from-background dark:via-background/95 dark:to-background/75 relative container mx-auto flex bg-linear-to-b px-6 pt-20'>
      <Suspense>
        <RecipesContent />
      </Suspense>
      <Suspense>
        <AddRecipeDialog />
      </Suspense>
    </main>
  )
}
