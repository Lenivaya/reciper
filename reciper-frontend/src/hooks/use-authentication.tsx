'use client'

import { graphql } from 'gql.tada'
import { useQuery } from 'urql'

const AuthUserQuery = graphql(`
  query AuthUser {
    me {
      id
      username
      profilePictureUrl
    }
  }
`)

export const useAuthUser = () => {
  const [{ data }] = useQuery({
    query: AuthUserQuery
  })

  return {
    data: data?.me
  }
}
