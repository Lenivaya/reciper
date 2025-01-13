'use client'

import { Input } from '@/components/ui/input'
import { DifficultyLevel } from '@/lib/getDifficultyColor'
import { Search } from 'lucide-react'
import { useQueryStates } from 'nuqs'
import React, { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebouncedCallback } from 'use-debounce'
import { RecipeCardTag } from '../recipe-card/recip-card-tag'
import { RecipeCardDifficulty } from '../recipe-card/recipe-card-difficulty'
import { recipeSearchParamsSchema } from './recipes-search-params'

interface RecipesSearchProps {
  isAutoFocusable?: boolean
}

export const RecipesSearch = ({
  isAutoFocusable = false
}: RecipesSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [
    {
      search: paramsSearch,
      tags: queryTags,
      difficultyLevels: queryDifficultyLevels
    },
    setSearchParams
  ] = useQueryStates(recipeSearchParamsSchema, {
    shallow: false
  })

  const debouncedSetSearchParams = useDebouncedCallback(
    async (value: string) => {
      await setSearchParams({ search: value, page: '1' })
    },
    150
  )

  useHotkeys('ctrl+k', () => inputRef.current?.focus(), {
    preventDefault: true
  })

  useEffect(() => {
    setSearch(paramsSearch)
  }, [paramsSearch])

  useEffect(() => {
    if (isAutoFocusable && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAutoFocusable, search])

  const handleTagClick = (tag: string) => {
    setSearchParams((prev) => ({
      ...prev,
      page: '1',
      tags: queryTags.filter((t) => t !== tag)
    }))
  }

  const handleDifficultyLevelClick = (difficultyLevel: string) => {
    setSearchParams((prev) => ({
      ...prev,
      page: '1',
      difficultyLevels: queryDifficultyLevels.filter(
        (dl) => dl !== difficultyLevel
      )
    }))
  }

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSetSearchParams(e.target.value)
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='group relative mx-auto w-full max-w-xl'>
        <div className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
        <div className='relative flex items-center rounded-lg border border-border/40 bg-background/80 shadow-lg shadow-primary/5 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/60 focus-within:shadow-primary/20 hover:border-border/60 hover:shadow-primary/10'>
          <Search className='ml-3 h-4 w-4 text-muted-foreground/60' />
          <Input
            ref={inputRef}
            name='query'
            placeholder='Search for a recipe on reciper...'
            value={search ?? ''}
            onChange={handleSearchChange}
            className='border-0 bg-transparent text-center shadow-none focus-visible:ring-0'
          />
          {!search && (
            <kbd className='pointer-events-none mr-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      <div className='flex flex-wrap gap-2'>
        {queryDifficultyLevels?.length > 0 && (
          <>
            {queryDifficultyLevels?.map((difficultyLevel) => (
              <RecipeCardDifficulty
                onClick={handleDifficultyLevelClick}
                difficultyLevel={difficultyLevel as DifficultyLevel}
                key={difficultyLevel}
              />
            ))}
          </>
        )}
        {queryTags?.length > 0 && (
          <>
            {queryTags?.map((tag, index) => (
              <RecipeCardTag
                tag={tag}
                index={index}
                onClick={handleTagClick}
                key={tag}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
