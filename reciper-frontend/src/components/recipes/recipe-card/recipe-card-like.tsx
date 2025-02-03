'use client'

import { useIsAuthTokenPresent } from '@/hooks/use-auth-token'
import { useToast } from '@/hooks/use-toast'
import { cn, isSome } from '@/lib/utils'
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { Heart } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export const RecipeLikeFragment = graphql(`
  fragment RecipeLikeFragment on RecipeLike {
    id
  }
`)

export const GetRecipeLikeQuery = graphql(
  `
    query GetRecipeLikeQuery($recipeId: UUID!) {
      myRecipeLike(recipeId: $recipeId) {
        ...RecipeLikeFragment
      }
    }
  `,
  [RecipeLikeFragment]
)

export const LikeRecipeMutation = graphql(
  `
    mutation LikeRecipe($recipeId: UUID!) {
      likeRecipe(input: { recipeId: $recipeId }) {
        recipeLike {
          ...RecipeLikeFragment
        }
      }
    }
  `,
  [RecipeLikeFragment]
)

export const UnLikeRecipeMutation = graphql(
  `
    mutation UnLikeRecipe($recipeId: UUID!) {
      unlikeRecipe(input: { recipeId: $recipeId }) {
        recipeLike {
          ...RecipeLikeFragment
        }
      }
    }
  `,
  [RecipeLikeFragment]
)

interface Props {
  totalRecipeLikes?: number
  recipeId: string
}

export const RecipeCardLike = ({ totalRecipeLikes = 0, recipeId }: Props) => {
  const [likes, setLikes] = useState(totalRecipeLikes)

  const isAuthTokenPresent = useIsAuthTokenPresent()
  const { toast } = useToast()

  const context = useMemo(() => ({ additionalTypenames: ['RecipeLike'] }), [])
  const [result] = useQuery({
    query: GetRecipeLikeQuery,
    context,
    variables: { recipeId },
    pause: !isAuthTokenPresent
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_likeResult, like] = useMutation(LikeRecipeMutation)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unlikeResult, unlike] = useMutation(UnLikeRecipeMutation)

  const recipeLike = result.data?.myRecipeLike
  const isLiked = isSome(recipeLike)

  const handleLike = useCallback(async () => {
    const result = await like({ recipeId })
    if (result.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while liking the recipe'
      })
      console.error(result.error)
    }
    setLikes((likes) => likes + 1)
    console.log('Liked recipe with id', recipeId)
  }, [like, recipeId, toast])

  const handleUnLike = useCallback(async () => {
    const result = await unlike({ recipeId })
    if (result.error) {
      console.error(result.error)
      toast({
        title: 'Error',
        description: 'An error occurred while unliking the recipe'
      })
    }
    setLikes((likes) => Math.max(likes - 1, 0))
    console.log('Unliked recipe with id', recipeId)
  }, [unlike, recipeId, toast])

  const handleToggleLike = useCallback(() => {
    if (!isAuthTokenPresent) {
      toast({
        description: 'You must be logged in to 🩷 a recipe'
      })
      return
    }

    if (isLiked) {
      handleUnLike()
    } else {
      handleLike()
    }
  }, [isLiked, handleLike, handleUnLike, isAuthTokenPresent, toast])

  return (
    <div
      className='group flex cursor-pointer items-center gap-1.5'
      onClick={handleToggleLike}
    >
      <Heart
        className={cn(
          'h-4 w-4 shrink-0 transition-all duration-200',
          'group-active:scale-95 hover:scale-150',
          isLiked
            ? 'fill-primary stroke-primary'
            : 'stroke-muted-foreground group-hover:stroke-primary'
        )}
      />
      <span
        className={cn(
          'text-sm font-medium transition-colors duration-200',
          'text-muted-foreground group-hover:text-primary'
        )}
      >
        {likes}
      </span>
    </div>
  )
}
