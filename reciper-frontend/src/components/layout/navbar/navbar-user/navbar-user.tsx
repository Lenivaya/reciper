'use client'

import { useIsAuthTokenPresent } from '@/hooks/use-auth-token'
import { isNone, isSome } from '@/lib/utils'
import { graphql } from 'gql.tada'
import { useMemo } from 'react'
import { useQuery } from 'urql'
import {
  NavbarUserAuthenticated,
  NavbarUserAuthenticatedFragment
} from './navbar-user-authenticated'
import { NavbarUserUnauthenticated } from './navbar-user-unauthenticated'

const NavbarUserQuery = graphql(
  `
    query NavbarUser {
      me {
        ...NavbarUserAuthenticated
      }
    }
  `,
  [NavbarUserAuthenticatedFragment]
)

export function NavbarUser() {
  const isAuthTokenPresent = useIsAuthTokenPresent()

  const [{ data, error, fetching }] = useQuery({
    query: NavbarUserQuery,
    context: useMemo(() => ({ additionalTypenames: ['User'] }), []),
    pause: !isAuthTokenPresent
  })

  if (fetching) return null

  if (error) {
    console.error(error)
  }

  const isQueryValid = isSome(data?.me) && isNone(error)

  return isQueryValid ? (
    <NavbarUserAuthenticated data={data.me!} />
  ) : (
    <NavbarUserUnauthenticated />
  )
}
