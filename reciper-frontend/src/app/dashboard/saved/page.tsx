'use client'

import {
  RecipeCard,
  RecipeCardFragment
} from '@/components/recipes/recipe-card/recipe-card'
import { RecipeCardSkeleton } from '@/components/recipes/recipe-card/recipe-card-skeleton'
import { RecipesSearch } from '@/components/recipes/recipes-search/recipes-search'
import { recipeSearchParamsSchema } from '@/components/recipes/recipes-search/recipes-search-params'
import { PaginationControls } from '@/components/ui/pagination-controls'
import { graphql } from 'gql.tada'
import { useQueryStates } from 'nuqs'
import { Key, Suspense } from 'react'
import { useQuery } from 'urql'

const DashboardSavedRecipesQuery = graphql(
  `
    query DashboardSavedRecipes(
      $searchCriteria: RecipeSearchCriteriaInput
      $orderBy: RecipeSortInput!
      $skip: Int!
      $take: Int!
    ) {
      mySavedRecipesOffset(
        skip: $skip
        take: $take
        searchCriteria: $searchCriteria
        order: [$orderBy]
      ) {
        items {
          id
          ...RecipeCardFragment
        }

        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  [RecipeCardFragment]
)

const DEFAULT_PAGE_SIZE = 12

function SavedRecipesContent() {
  const [{ search, page, tags, difficultyLevels }, setSearchParams] =
    useQueryStates(recipeSearchParamsSchema)
  const currentPage = Math.max(1, parseInt(page ?? '1'))

  const [result] = useQuery({
    query: DashboardSavedRecipesQuery,
    variables: {
      searchCriteria: {
        matching: search,
        tags,
        // @ts-expect-error idc
        difficultyLevels
      },
      orderBy: { createdAt: 'DESC' },
      skip: (currentPage - 1) * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE
    }
  })

  const totalCount = result.data?.mySavedRecipesOffset?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE)
  const pageInfo = result.data?.mySavedRecipesOffset?.pageInfo

  if (result.error) {
    console.error(result.error)
    console.error(result.error.graphQLErrors)
    console.error(result.error.networkError)
  }

  return (
    <div className=''>
      <div className='flex flex-col space-y-12'>
        <RecipesSearch isClient />
        <div className='h-full space-y-12'>
          <Suspense
            fallback={
              <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <RecipeCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {result.error && <div>Error: {result.error.message}</div>}
              {result.data?.mySavedRecipesOffset?.items?.map((item) => (
                <RecipeCard key={item?.id as Key} data={item} />
              ))}
            </div>
          </Suspense>

          {totalCount > 0 && (
            <div className='mt-8'>
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={pageInfo?.hasNextPage ?? false}
                hasPreviousPage={pageInfo?.hasPreviousPage ?? false}
                params={search ? { search } : {}}
                showFirstLast
                maxVisiblePages={7}
                className='justify-center'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SavedRecipesPage() {
  return (
    <div className=''>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Saved Recipes</h2>
        <p className='text-muted-foreground text-sm'>
          Your collection of saved recipes from other cooks
        </p>
      </div>
      <Suspense
        fallback={
          <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 12 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <SavedRecipesContent />
      </Suspense>
    </div>
  )
}
