import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import { Key } from 'react'
import { CookCard, CookCardFragment } from '../cook'
import { cookSearchParamsCache } from './cooks-search-params'
import { PaginationControls } from '@/components/ui/pagination-controls'

const CooksListQuery = graphql(
  `
    query CooksList(
      $searchCriteria: UserSearchCriteriaInput
      $orderBy: UserSortInput!
      $skip: Int!
      $take: Int!
    ) {
      usersOffset(
        skip: $skip
        take: $take
        searchCriteria: $searchCriteria
        order: [$orderBy]
      ) {
        items {
          id
          ...CookCardFragment
        }

        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  [CookCardFragment]
)

const DEFAULT_PAGE_SIZE = 12

export async function CooksSearchList() {
  const { search, page } = cookSearchParamsCache.all()
  const currentPage = Math.max(1, parseInt(page ?? '1'))

  const result = await getClient().query(CooksListQuery, {
    searchCriteria: {
      matching: search
    },
    orderBy: {
      createdAt: 'DESC'
    },
    skip: (currentPage - 1) * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE
  })

  const totalCount = result.data?.usersOffset?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE)
  const pageInfo = result.data?.usersOffset?.pageInfo

  return (
    <div className='h-full space-y-12'>
      <div className='container mx-auto grid grid-cols-1 place-items-center gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {result.error && <div>Error: {result.error.message}</div>}
        {result.data?.usersOffset?.items?.map((item) => (
          <CookCard key={item?.id as Key} data={item} />
        ))}
      </div>

      {totalCount > 0 && (
        <div className="mt-8">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={pageInfo?.hasNextPage ?? false}
            hasPreviousPage={pageInfo?.hasPreviousPage ?? false}
            params={search ? { search } : {}}
            showFirstLast
            maxVisiblePages={7}
            className="justify-center"
          />
        </div>
      )}
    </div>
  )
}
