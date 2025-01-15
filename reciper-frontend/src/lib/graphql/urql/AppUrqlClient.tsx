'use client'

import { env } from '@/env'
import { initializeAuthState, logout } from '@/lib/auth/auth'
import { authExchange } from '@urql/exchange-auth'
import { persistedExchange } from '@urql/exchange-persisted'
import { retryExchange, RetryExchangeOptions } from '@urql/exchange-retry'
import {
  cacheExchange,
  createClient,
  fetchExchange,
  mapExchange,
  ssrExchange,
  UrqlProvider
} from '@urql/next'

const retryOptions: RetryExchangeOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: 2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  retryIf: (err, _) => (err && err.networkError ? true : false)
}

const ssr = ssrExchange({})
const client = createClient({
  url: env.NEXT_PUBLIC_API_URL,
  exchanges: [
    cacheExchange,
    retryExchange(retryOptions),
    mapExchange({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onError(error, _operation) {
        const isAuthError = error.graphQLErrors.some(
          (e) => e.extensions?.code === 'FORBIDDEN'
        )
        if (isAuthError) {
          logout()
        }
      }
    }),
    ssr,
    persistedExchange({
      preferGetForPersistedQueries: true
    }),
    authExchange(async (utils) => {
      const { token } = initializeAuthState()
      return {
        addAuthToOperation(operation) {
          if (!token) return operation
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        didAuthError(error, _operation) {
          return (
            error.graphQLErrors.some(
              (e) => e.extensions?.code === 'FORBIDDEN'
            ) ||
            (error.networkError as unknown as { status: number })?.status ===
              401
          )
        },
        async refreshAuth() {
          logout()
        }
      }
    }),
    fetchExchange
  ],
  fetchOptions: () => {
    const { token } = initializeAuthState()
    return {
      headers: { Authorization: 'Bearer ' + token }
    }
  },
  suspense: true
})

export function AppUrqlClient({ children }: React.PropsWithChildren) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
