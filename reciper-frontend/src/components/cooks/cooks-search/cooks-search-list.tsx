import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import { Key } from 'react'
import { CookCard, CookCardFragment } from '../cook'
import { cookSearchParamsCache } from './cooks-search-params'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

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

const DEFAULT_PAGE_SIZE = 10
const MAX_VISIBLE_PAGES = 5

interface PaginationProps {
  currentPage: number
  totalPages: number
  search?: string
}

function PaginationControls({ currentPage, totalPages, search }: PaginationProps) {
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    params.set('page', String(pageNum))
    return `?${params.toString()}`
  }

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = []
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2))
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1)

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('ellipsis')
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

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

  return (
    <div className='h-full space-y-12'>
      <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-4'>
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
            search={search}
          />
        </div>
      )}
    </div>
  )
}
