import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import { CookCard, CookCardFragment } from '../cook'
import { cookSearchParamsCache } from './cooks-search-params'

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

// type SearchCriteria = ReturnType<
//   typeof graphql.scalar<'UserSearchCriteriaInput'>
// >

export async function CooksSearchList() {
  const { search, page } = cookSearchParamsCache.all()
  const currentPage = Math.max(1, parseInt(page))

  // const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({})

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

  return (
    <div className='h-full space-y-12'>
      <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-4'>
        {result.error && <div>Error: {result.error.message}</div>}
        {result.data?.usersOffset?.items?.map((item) => (
          <CookCard key={item?.id} data={item} />
        ))}
      </div>
    </div>
  )
}
