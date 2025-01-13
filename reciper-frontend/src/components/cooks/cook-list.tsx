'use client'

import { useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { CookCard, CookCardFragment } from './cook-card'

const CooksListQuery = graphql(
  `
    query CooksList {
      usersCursor(first: 10) {
        edges {
          node {
            id
            ...CookCardFragment
          }
        }
      }
    }
  `,
  [CookCardFragment]
)

export const CookList = () => {
  const [result] = useQuery({
    query: CooksListQuery
  })

  return (
    <div className='h-full space-y-12'>
      <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-4'>
        {result.fetching && <div>Loading...</div>}
        {result.error && <div>Error: {result.error.message}</div>}
        {result.data?.usersCursor?.edges?.map((edge) => (
          <CookCard key={edge?.node?.id} data={edge?.node} />
        ))}
      </div>
    </div>
  )
}
