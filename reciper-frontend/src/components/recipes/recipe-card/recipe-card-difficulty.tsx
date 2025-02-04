'use client'

import { Badge } from '@/components/ui/badge'
import { DifficultyLevel, getDifficultyColor } from '@/lib/getDifficultyColor'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useQueryStates } from 'nuqs'
import { recipeSearchParamsSchema } from '../recipes-search/recipes-search-params'

export interface RecipeCardDifficultyProps {
  difficultyLevel: DifficultyLevel
  onClick?: (difficultyLevel: DifficultyLevel) => void
  isAlreadySearchWithDifficultyCriteria?: boolean
}

export function RecipeCardDifficulty({
  difficultyLevel,
  onClick,
  isAlreadySearchWithDifficultyCriteria = false
}: RecipeCardDifficultyProps) {
  const [{ difficultyLevels: queryDifficultyLevels }, setSearchParams] =
    useQueryStates(recipeSearchParamsSchema, {
      shallow: false
    })

  const router = useRouter()

  const handleDifficultyLevelClick = (difficultyLevel: DifficultyLevel) => {
    onClick?.(difficultyLevel)

    if (!isAlreadySearchWithDifficultyCriteria) {
      router.push(`/recipes?difficultyLevels=${difficultyLevel}`)
      return
    }

    if (onClick) return

    const isDifficultyLevelAlreadyInQuery =
      queryDifficultyLevels.includes(difficultyLevel)
    if (isDifficultyLevelAlreadyInQuery) {
      setSearchParams((prev) => ({
        ...prev,
        page: '1',
        difficultyLevels: queryDifficultyLevels.filter(
          (level) => level !== difficultyLevel
        )
      }))
    }
    if (!isDifficultyLevelAlreadyInQuery) {
      setSearchParams((prev) => ({
        ...prev,
        page: '1',
        difficultyLevels: [...queryDifficultyLevels, difficultyLevel]
      }))
    }
  }

  return (
    <Badge
      className={cn(
        getDifficultyColor(difficultyLevel),
        'border-none capitalize shadow-none'
      )}
      variant='tag'
      onClick={() => handleDifficultyLevelClick(difficultyLevel)}
    >
      {difficultyLevel.toLowerCase()}
    </Badge>
  )
}
