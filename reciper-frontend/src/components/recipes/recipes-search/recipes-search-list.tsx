import { PaginationControls } from '@/components/ui/pagination-controls'
import type { DifficultyLevel } from '@/lib/getDifficultyColor'
import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import type { Key } from 'react'
import { RecipeCard, RecipeCardFragment } from '../recipe-card/recipe-card'
import { recipeSearchParamsCache } from './recipes-search-params'

const RecipesListQuery = graphql(
  `
    query RecipesList(
      $searchCriteria: RecipeSearchCriteriaInput
      $orderBy: RecipeSortInput!
      $skip: Int!
      $take: Int!
    ) {
      recipesOffset(
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

export async function RecipesSearchList() {
  const { search, page, tags, difficultyLevels } = recipeSearchParamsCache.all()
  const currentPage = Math.max(1, Number.parseInt(page ?? '1'))

  const result = await getClient().query(RecipesListQuery, {
    searchCriteria: {
      matching: search,
      tags,
      difficultyLevels: difficultyLevels as DifficultyLevel[]
    },
    orderBy: {
      createdAt: 'DESC'
    },
    skip: (currentPage - 1) * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE
  })

  const totalCount = result.data?.recipesOffset?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE)
  const pageInfo = result.data?.recipesOffset?.pageInfo

  if (result.error) {
    console.error(result.error)
    console.error(result.error.graphQLErrors)
    console.error(result.error.networkError)
  }

  return (
    <div className='h-full space-y-12'>
      <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {result.error && <div>Error: {result.error.message}</div>}
        {result.data?.recipesOffset?.items?.map((item) => (
          <RecipeCard key={item?.id as Key} data={item} />
        ))}
      </div>

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
  )
}
