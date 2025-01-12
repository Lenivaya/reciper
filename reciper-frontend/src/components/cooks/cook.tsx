import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import React, { FC } from 'react'

export const CookCardFragment = graphql(`
  fragment CookCardFragment on User {
    id
    username
    bio
  }
`)

interface Props {
  data: FragmentOf<typeof CookCardFragment>
}

export const CookCard: FC<Props> = ({ data }) => {
  const cook = readFragment(CookCardFragment, data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cook.username}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{cook.bio}</p>
      </CardContent>
      <CardFooter>
        <Button>View Recipes</Button>
      </CardFooter>
    </Card>
  )
}
