'use client'

import { env } from '@/env'
import { persistedExchange } from '@urql/exchange-persisted'
import { retryExchange, RetryExchangeOptions } from '@urql/exchange-retry'
import {
  cacheExchange,
  createClient,
  fetchExchange,
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
    persistedExchange({
      preferGetForPersistedQueries: true
    }),
    retryExchange(retryOptions),
    ssr,
    fetchExchange
  ],
  suspense: true
})

export function UrqlClient({ children }: React.PropsWithChildren) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
