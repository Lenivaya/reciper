import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDays, Users, Utensils } from 'lucide-react'
import { format } from 'date-fns'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { FC } from 'react'

export const CookCardFragment = graphql(`
  fragment CookCardFragment on User {
    id
    username
    bio
    profilePictureUrl
    createdAt
    recipes {
      id
    }
    subscribers {
      id
    }
  }
`)

interface Props {
  data: FragmentOf<typeof CookCardFragment>
}

export const CookCard: FC<Props> = ({ data }) => {
  const cook = readFragment(CookCardFragment, data)

  return (
    <div className="group transform transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 -z-10 h-[300px] w-[300px] rounded-xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <Card className="relative flex w-[300px] flex-col overflow-hidden border-border/40 bg-background/80 backdrop-blur-sm hover:border-border/60 hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-amber-500/5 to-rose-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardHeader className="relative space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 shrink-0 ring-2 ring-border/40 transition-all duration-300 group-hover:ring-border/60 group-hover:scale-110">
              <AvatarImage src={cook.profilePictureUrl ?? ''} />
              <AvatarFallback className="bg-gradient-to-r from-rose-500/10 to-amber-500/10">
                {cook.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="truncate text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                {cook.username}
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  Joined {format(new Date(cook.createdAt as string), 'MMMM yyyy')}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative flex-1 min-h-[100px] space-y-4">
          {cook.bio && (
            <p className="text-sm text-muted-foreground/90 italic line-clamp-3 transition-colors duration-300 group-hover:text-muted-foreground">
              &ldquo;{cook.bio}&rdquo;
            </p>
          )}

          <div className="flex gap-6 justify-center">
            <div className="flex items-center gap-1.5 transition-colors duration-300 hover:text-primary">
              <Utensils className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">
                {cook.recipes.length} recipes
              </span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors duration-300 hover:text-primary">
              <Users className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">
                {cook.subscribers.length} subscribers
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative">
          <Button
            className="w-full group/btn bg-gradient-to-r from-rose-500 to-amber-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            View Recipes
            <Utensils className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
