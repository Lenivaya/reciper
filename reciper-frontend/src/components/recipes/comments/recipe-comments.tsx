'use client'

import { useQuery } from '@urql/next'
import { graphql, readFragment } from 'gql.tada'
import { Key, useMemo } from 'react'
import { RecipeComment, RecipeCommentFragment } from './recipe-comment'

const RecipeCommentsQuery = graphql(
  `
    query RecipeComments($recipeId: UUID!) {
      commentsCursor(recipeId: $recipeId, order: { createdAt: DESC }) {
        nodes {
          ...RecipeCommentFragment
        }
      }
    }
  `,
  [RecipeCommentFragment]
)

interface RecipeCommentsProps {
  recipeId: string
}

export const RecipeComments = ({ recipeId }: RecipeCommentsProps) => {
  const queryContext = useMemo(
    () => ({ additionalTypenames: ['RecipeComment'] }),
    []
  )
  const [result] = useQuery({
    query: RecipeCommentsQuery,
    requestPolicy: 'cache-and-network',
    variables: {
      recipeId
    },
    context: queryContext
  })

  return (
    <div>
      {result.data?.commentsCursor?.nodes?.map((comment) => {
        const data = readFragment(RecipeCommentFragment, comment)
        return <RecipeComment key={data.id as Key} comment={comment} />
      })}
    </div>
  )
}
