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
    <div className="transform transition-all duration-300 hover:-translate-y-1">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 transition-transform duration-300 hover:scale-110">
              <AvatarImage src={cook.profilePictureUrl ?? ''} />
              <AvatarFallback>{cook.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold hover:text-primary transition-colors duration-300">
                {cook.username}
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Joined {format(new Date(cook.createdAt), 'MMMM yyyy')}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {cook.bio && (
            <p className="text-sm text-muted-foreground italic">
              "{cook.bio}"
            </p>
          )}

          <div className="flex gap-4">
            <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300">
              <Utensils className="h-4 w-4" />
              <span className="text-sm font-medium">
                {cook.recipes.length} recipes
              </span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {cook.subscribers.length} subscribers
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full group transition-all duration-300 hover:shadow-md"
          >
            View Recipes
            <Utensils className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
