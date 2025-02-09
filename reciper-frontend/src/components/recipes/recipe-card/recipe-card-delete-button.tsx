'use client'

import { ShowOnlyForUser } from '@/components/layout/show-only-for-user'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRefreshWithSearchParams } from '@/hooks/use-refresh-with-search-params'
import { useToast } from '@/hooks/use-toast'
import { graphql } from 'gql.tada'
import { Trash } from 'lucide-react'
import { useCallback } from 'react'
import { useMutation } from 'urql'

export const DeleteRecipeMutation = graphql(`
  mutation DeleteRecipe($recipeId: UUID!) {
    deleteRecipeById(input: { recipeId: $recipeId }) {
      errors {
        ... on ReciperError {
          message
        }
      }
      recipe {
        id
      }
    }
  }
`)

interface Props {
  recipeId: string
  recipeName: string
  recipeAuthorId: string
}

export function RecipeCardDeleteButton({
  recipeId,
  recipeName,
  recipeAuthorId
}: Props) {
  const { toast } = useToast()
  const [, deleteRecipe] = useMutation(DeleteRecipeMutation)
  const refreshWithSearchParams = useRefreshWithSearchParams()

  const handleDeleteRecipe = useCallback(async () => {
    const result = await deleteRecipe({ recipeId })

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error.message
      })
      return
    }

    const errors = result.data?.deleteRecipeById.errors
    if (errors) {
      toast({
        title: 'Error',
        description: errors.map((error) => error.message).join(', ')
      })
      return
    }

    toast({
      title: 'Recipe deleted',
      description: `The recipe "${recipeName}" has been deleted.`
    })

    refreshWithSearchParams()
  }, [deleteRecipe, recipeId, recipeName, toast, refreshWithSearchParams])

  return (
    <ShowOnlyForUser userIdToCheckAuth={recipeAuthorId}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 p-0 text-red-600 opacity-90 shadow-xs backdrop-blur-xs hover:bg-red-100 hover:text-red-700'
          >
            <Trash className='h-4 w-4' />
            <span className='sr-only'>Delete recipe</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{recipeName}&quot;. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRecipe}
              className='bg-red-600 text-white hover:bg-red-700'
            >
              Delete Recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ShowOnlyForUser>
  )
}
