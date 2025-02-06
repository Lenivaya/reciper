import {
  createSearchParamsCache,
  inferParserType,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

export const recipeSearchParamsSchema = {
  search: parseAsString.withDefault(''),
  page: parseAsString.withDefault('1'),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  difficultyLevels: parseAsArrayOf(parseAsString).withDefault([]),
  authorId: parseAsString.withDefault('')
}

export const recipeSearchParamsCache = createSearchParamsCache(
  recipeSearchParamsSchema
)

export type RecipeSearchParams = inferParserType<typeof recipeSearchParamsCache>
