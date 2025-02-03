'use client'

import Ratings from '@/components/ui/rating'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { useCallback, useMemo } from 'react'

const RecipeRatingQuery = graphql(`
  query GetRecipeRating($recipeId: UUID!) {
    recipeRating(recipeId: $recipeId) {
      id
      value
    }
  }
`)

const UpsertRecipeRatingMutation = graphql(`
  mutation UpsertRecipeRating($input: UpsertRecipeRatingInput!) {
    upsertRecipeRating(input: $input) {
      rating {
        id
        value
      }
    }
  }
`)

interface RecipeRatingProps {
  recipeId: string
}

export function RecipeRating({ recipeId }: RecipeRatingProps) {
  const { toast } = useToast()

  const queryContext = useMemo(
    () => ({ additionalTypenames: ['RecipeRating'] }),
    []
  )
  const [result] = useQuery({
    query: RecipeRatingQuery,
    requestPolicy: 'cache-and-network',
    variables: { recipeId },
    context: queryContext
  })

  console.log('reciper', result)

  const [{ fetching }, upsertRecipeRating] = useMutation(
    UpsertRecipeRatingMutation
  )

  const handleRatingChange = useCallback(
    async (value: number) => {
      if (fetching) return

      try {
        const result = await upsertRecipeRating({
          input: {
            createDto: {
              recipeId,
              value
            }
          }
        })

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error.message
          })
          return
        }

        toast({
          title: 'Success',
          description: 'Rating updated successfully'
        })
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update rating'
        })
      }
    },
    [recipeId, toast, upsertRecipeRating, fetching]
  )

  return (
    <div className={fetching ? 'pointer-events-none opacity-50' : ''}>
      <Ratings
        value={result.data?.recipeRating?.value ?? 0}
        onValueChange={handleRatingChange}
        variant='yellow'
        asInput={!result.fetching}
      />
    </div>
  )
}
