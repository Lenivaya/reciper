import { env } from '@/env'
import { persistedExchange } from '@urql/exchange-persisted'
import { retryExchange, RetryExchangeOptions } from '@urql/exchange-retry'
import { registerUrql } from '@urql/next/rsc'
import { cacheExchange, createClient, fetchExchange } from 'urql'

// import {
//   cacheExchange as normalizedCacheExchange,
// } from '@urql/exchange-graphcache'

const retryOptions: RetryExchangeOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: 2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  retryIf: (err, _) => (err && err.networkError ? true : false)
}

export const makeClient = () => {
  return createClient({
    url: env.API_URL,
    exchanges: [
      cacheExchange,
      // normalizedCacheExchange({}),
      persistedExchange({
        preferGetForPersistedQueries: true
      }),
      retryExchange(retryOptions),
      fetchExchange
    ]
  })
}

export const { getClient } = registerUrql(makeClient)
