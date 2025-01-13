import {
  createSearchParamsCache,
  inferParserType,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

export const cookSearchParamsSchema = {
  search: parseAsString.withDefault(''),
  page: parseAsString.withDefault('1'),
  tags: parseAsArrayOf(parseAsString).withDefault([])
}

export const cookSearchParamsCache = createSearchParamsCache(
  cookSearchParamsSchema
)

export type CookSearchParams = inferParserType<typeof cookSearchParamsCache>
