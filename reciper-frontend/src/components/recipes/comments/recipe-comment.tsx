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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAuthUser } from '@/providers/auth-provider'
import { formatDistanceToNow } from 'date-fns'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { Trash2, User } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMutation } from 'urql'

export const RecipeCommentFragment = graphql(`
  fragment RecipeCommentFragment on Comment {
    id
    content
    createdAt
    updatedAt
    user {
      id
      username
    }
  }
`)

export const DeleteRecipeCommentMutation = graphql(`
  mutation DeleteRecipeCommentMutation($input: DeleteCommentByIdInput!) {
    deleteCommentById(input: $input) {
      comment {
        id
      }
    }
  }
`)

interface RecipeCommentProps {
  comment: FragmentOf<typeof RecipeCommentFragment>
}

export const RecipeComment = ({ comment }: RecipeCommentProps) => {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const data = readFragment(RecipeCommentFragment, comment)
  const timeAgo = formatDistanceToNow(new Date(data.createdAt as string), {
    addSuffix: true
  })
  const isEdited = data.createdAt !== data.updatedAt

  const { user } = useAuthUser()
  const isAuthor = user?.id === data.user.id

  const [_deleteResult, deleteComment] = useMutation(
    DeleteRecipeCommentMutation
  )

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true)
      const result = await deleteComment({
        input: {
          commentId: data.id as string
        }
      })

      if (result.error) {
        toast({
          title: 'Error',
          description: 'Failed to delete comment',
          variant: 'destructive'
        })
        return
      }

      toast({
        title: 'Success',
        description: 'Comment deleted successfully'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
    }
  }, [data.id, deleteComment, toast])

  return (
    <Card className='mb-4'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center space-x-2'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>
              <User className='h-4 w-4' />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {data.user.username}
            </p>
            <p className='text-muted-foreground text-xs'>
              {timeAgo}
              {isEdited && (
                <span className='text-muted-foreground ml-1 text-xs'>
                  (edited)
                </span>
              )}
            </p>
          </div>
        </div>
        {isAuthor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-destructive'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this comment? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardHeader>
      <CardContent>
        <p className='text-sm'>{data.content}</p>
      </CardContent>
    </Card>
  )
}
