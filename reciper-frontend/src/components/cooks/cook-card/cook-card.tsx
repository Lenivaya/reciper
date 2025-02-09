import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { format } from 'date-fns'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { CalendarDays, Utensils } from 'lucide-react'
import { FC } from 'react'
import { ZoomableImage } from '../../ui/zoomable-image'
import { CookCardRecipesButton } from './cook-card-recipes-button'
import { CookCardSubscribers } from './cook-card-subscribers'

export const CookCardFragment = graphql(`
  fragment CookCardFragment on User {
    id
    username
    bio
    profilePictureUrl
    createdAt
    recipesCount
    subscribersCount
  }
`)

interface Props {
  data: FragmentOf<typeof CookCardFragment>
}

export const CookCard: FC<Props> = ({ data }) => {
  const cook = readFragment(CookCardFragment, data)

  return (
    <div className='group transform transition-all duration-300 hover:-translate-y-1'>
      <div className='absolute inset-0 -z-10 h-[300px] w-[300px] rounded-xl bg-linear-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
      <Card className='border-border/40 bg-background/80 hover:border-border/60 relative flex w-[300px] flex-col overflow-hidden backdrop-blur-xs transition-all duration-300 hover:shadow-lg'>
        <div className='absolute inset-0 bg-linear-to-r from-rose-500/5 via-amber-500/5 to-rose-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        <CardHeader className='relative space-y-4'>
          <div className='flex items-center space-x-4'>
            <ZoomableImage src={cook.profilePictureUrl ?? ''}>
              <Avatar className='ring-border/40 group-hover:ring-border/60 h-12 w-12 shrink-0 ring-2 transition-all duration-300 group-hover:scale-110'>
                <AvatarImage src={cook.profilePictureUrl ?? ''} />
                <AvatarFallback className='bg-linear-to-r from-rose-500/10 to-amber-500/10'>
                  {cook.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </ZoomableImage>

            <div className='min-w-0'>
              <CardTitle className='group-hover:text-primary truncate text-lg font-bold transition-colors duration-300'>
                {cook.username}
              </CardTitle>
              <p className='text-muted-foreground flex items-center gap-1 text-sm'>
                <CalendarDays className='h-4 w-4 shrink-0' />
                <span className='truncate'>
                  Joined{' '}
                  {format(new Date(cook.createdAt as string), 'MMMM yyyy')}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className='relative min-h-[100px] flex-1 space-y-4'>
          {cook.bio && (
            <p className='text-muted-foreground/90 group-hover:text-muted-foreground line-clamp-3 text-sm italic transition-colors duration-300'>
              &ldquo;{cook.bio}&rdquo;
            </p>
          )}

          <div className='flex justify-center gap-6'>
            <div className='hover:text-primary flex items-center gap-1.5 transition-colors duration-300'>
              <Utensils className='h-4 w-4 shrink-0' />
              <span className='text-sm font-medium'>
                {cook.recipesCount} recipes
              </span>
            </div>
            <CookCardSubscribers
              subscribersCount={cook.subscribersCount}
              cookId={cook.id as string}
            />
          </div>
        </CardContent>

        <CardFooter className='relative'>
          <CookCardRecipesButton cookId={cook.id as string} />
        </CardFooter>
      </Card>
    </div>
  )
}
