'use client'

import { Input } from '@/components/ui/input'
import { useQueryStates } from 'nuqs'
import React, { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebouncedCallback } from 'use-debounce'
import { cookSearchParamsSchema } from './cooks-search-params'

interface CooksSearchProps {
  isAutoFocusable?: boolean
}

export const CooksSearch = ({ isAutoFocusable = false }: CooksSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [{ search: paramsSearch }, setSearchParams] = useQueryStates(
    cookSearchParamsSchema,
    {
      shallow: false
    }
  )

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

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSetSearchParams(e.target.value)
  }

  return (
    <Input
      ref={inputRef}
      name='query'
      placeholder='Search for a cook on reciper...'
      value={search ?? ''}
      onChange={handleSearchChange}
      className='max-w-xl text-center'
    />
  )
}
