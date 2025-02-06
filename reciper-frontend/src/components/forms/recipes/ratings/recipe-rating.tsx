'use client'

import { Button } from '@/components/ui/button'
import Ratings from '@/components/ui/rating'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { Trash2 } from 'lucide-react'
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

const DeleteRecipeRatingMutation = graphql(`
  mutation DeleteRecipeRating($input: DeleteRatingForRecipeInput!) {
    deleteRatingForRecipe(input: $input) {
      rating {
        id
      }
    }
  }
`)

interface RecipeRatingProps {
  recipeId: string
  onSuccess?: () => void
}

export function RecipeRating({ recipeId, onSuccess }: RecipeRatingProps) {
  const { toast } = useToast()

  const queryContext = useMemo(
    () => ({ additionalTypenames: ['RecipeRating'] }),
    []
  )
  const [result, reexecuteQuery] = useQuery({
    query: RecipeRatingQuery,
    requestPolicy: 'network-only',
    variables: { recipeId },
    context: queryContext
  })

  const [{ fetching }, upsertRecipeRating] = useMutation(
    UpsertRecipeRatingMutation
  )
  const [{ fetching: deleteFetching }, deleteRecipeRating] = useMutation(
    DeleteRecipeRatingMutation
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

        reexecuteQuery()
        onSuccess?.()
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update rating'
        })
      }
    },
    [recipeId, toast, upsertRecipeRating, fetching, reexecuteQuery, onSuccess]
  )

  const handleDeleteRating = useCallback(async () => {
    if (deleteFetching) return

    try {
      const result = await deleteRecipeRating({
        input: {
          recipeId
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
        description: 'Rating deleted successfully'
      })

      reexecuteQuery()
      onSuccess?.()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete rating'
      })
    }
  }, [recipeId, toast, deleteRecipeRating, deleteFetching, onSuccess])

  const isLoading = fetching || deleteFetching
  const hasRating = result.data?.recipeRating !== null

  return (
    <div className='flex items-center gap-2'>
      <div className={isLoading ? 'pointer-events-none opacity-50' : ''}>
        <Ratings
          value={result.data?.recipeRating?.value ?? 0}
          onValueChange={handleRatingChange}
          variant='yellow'
          asInput={!result.fetching}
        />
      </div>
      {hasRating && (
        <Button
          variant='ghost'
          size='icon'
          onClick={handleDeleteRating}
          disabled={isLoading}
          className='h-8 w-8'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}
