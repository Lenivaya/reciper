import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { User } from 'lucide-react'

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

interface RecipeCommentProps {
  comment: FragmentOf<typeof RecipeCommentFragment>
}

export const RecipeComment = ({ comment }: RecipeCommentProps) => {
  const data = readFragment(RecipeCommentFragment, comment)
  const timeAgo = formatDistanceToNow(new Date(data.createdAt as string), {
    addSuffix: true
  })
  const isEdited = data.createdAt !== data.updatedAt

  return (
    <Card className='mb-4'>
      <CardHeader className='flex flex-row items-center gap-4 space-y-0 pb-2'>
        <Avatar className='h-8 w-8'>
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-semibold'>{data.user.username}</span>
          <span className='text-muted-foreground text-sm'>{timeAgo}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm'>{data.content}</p>
      </CardContent>
      {isEdited && (
        <CardFooter>
          <span className='text-muted-foreground text-xs'>Edited</span>
        </CardFooter>
      )}
    </Card>
  )
}
