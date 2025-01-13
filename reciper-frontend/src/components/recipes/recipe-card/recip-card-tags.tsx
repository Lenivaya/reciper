'use client'

import { useQueryStates } from 'nuqs'
import { recipeSearchParamsSchema } from '../recipes-search/recipes-search-params'
import { RecipeCardTag } from './recipe-card-tag'

export const RecipeCardTags = ({
  tags,
  maxTags = 10
}: {
  tags: string[]
  maxTags?: number
}) => {
  const [{ tags: queryTags }, setSearchParams] = useQueryStates(
    recipeSearchParamsSchema,
    {
      shallow: false
    }
  )

  const handleTagClick = (tag: string) => {
    const isTagAlreadyInQuery = queryTags.includes(tag)
    if (isTagAlreadyInQuery) {
      setSearchParams((prev) => ({
        ...prev,
        page: '1',
        tags: queryTags.filter((t) => t !== tag)
      }))
    }
    if (!isTagAlreadyInQuery) {
      setSearchParams((prev) => ({
        ...prev,
        page: '1',
        tags: [...queryTags, tag]
      }))
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {tags.slice(0, maxTags).map((tag, index) => (
        <RecipeCardTag
          tag={tag}
          onClick={handleTagClick}
          key={tag}
          index={index}
        />
      ))}

      {tags.length > maxTags && (
        <span className='text-xs text-muted-foreground'>
          +{tags.length - maxTags} more
        </span>
      )}
    </div>
  )
}
