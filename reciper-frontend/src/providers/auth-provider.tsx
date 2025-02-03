'use client'

import { isNone } from '@/lib/utils'
import * as gqlTada from 'gql.tada'
import react from 'react'
import { useQuery } from 'urql'
import { useIsAuthTokenPresent } from '../hooks/use-auth-token'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  error: Error | null
}

const AuthContext = react.createContext<AuthContextType | undefined>(undefined)

const AuthUserFragment = gqlTada.graphql(`
  fragment AuthUserFragment on User {
    id
    username
    profilePictureUrl
  }
`)
export type AuthUser = gqlTada.ResultOf<typeof AuthUserFragment>

const AuthUserQuery = gqlTada.graphql(
  `
    query AuthUser {
      me {
        ...AuthUserFragment
      }
    }
  `,
  [AuthUserFragment]
)

export function AuthProvider({ children }: { children: react.ReactNode }) {
  const isAuthTokenPresent = useIsAuthTokenPresent()

  const [{ data, fetching, error }] = useQuery({
    pause: !isAuthTokenPresent,
    requestPolicy: 'cache-first',
    query: AuthUserQuery
  })

  const value: AuthContextType = react.useMemo(() => {
    if (isNone(data)) return { user: null, isLoading: fetching, error: null }

    const user = gqlTada.readFragment(AuthUserFragment, data.me)

    return {
      user: user ?? null,
      isLoading: fetching,
      error: error ?? null
    }
  }, [data, fetching, error])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthUser() {
  const context = react.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthUser must be used within an AuthProvider')
  }
  return context
}
