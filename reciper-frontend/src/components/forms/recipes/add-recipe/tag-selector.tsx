'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const TagsQuery = graphql(`
  query TagsSearch($search: String!, $alreadySelected: [UUID!]!) {
    tagsCursor(
      searchCriteria: { overallMatching: $search }
      where: { and: [{ id: { nin: $alreadySelected } }] }
    ) {
      nodes {
        id
        name
      }
    }
  }
`)

interface TagSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
}

interface TagDetails {
  id: string
  name: string
}

export function TagSelector({ value, onChange }: TagSelectorProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedTagsMap, setSelectedTagsMap] = useState<
    Record<string, TagDetails>
  >({})

  const [{ data }] = useQuery({
    query: TagsQuery,
    variables: {
      search: debouncedSearch,
      alreadySelected: value
    }
  })

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
  }, 150)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedSetSearch(value)
  }

  const handleSelect = useCallback(
    (tagId: string) => {
      if (!value.includes(tagId)) {
        const tag = data?.tagsCursor?.nodes?.find((t) => t.id === tagId)
        if (tag) {
          setSelectedTagsMap((prev) => ({
            ...prev,
            [tagId]: { id: tagId, name: tag.name as string }
          }))
          onChange([...value, tagId])
        }
      }
      setSearch('')
    },
    [value, onChange, data?.tagsCursor?.nodes]
  )

  const handleRemove = useCallback(
    (tagId: string) => {
      onChange(value.filter((id) => id !== tagId))
    },
    [value, onChange]
  )

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {value.map((tagId) => (
          <Badge key={tagId} variant='secondary'>
            {selectedTagsMap[tagId]?.name ?? 'Unknown tag'}
            <Button
              variant='ghost'
              size='sm'
              className='ml-1 h-auto p-0 hover:bg-destructive/10'
              onClick={() => handleRemove(tagId)}
            >
              <X className='h-3 w-3' />
            </Button>
          </Badge>
        ))}
      </div>

      <div className='space-y-1.5'>
        <p className='text-sm text-muted-foreground'>Search for tags to add</p>
        <Command className='rounded-md border' shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={handleSearchChange}
            placeholder='Search tags...'
          />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {data?.tagsCursor?.nodes?.map((tag) => (
                <CommandItem
                  key={tag.id as string}
                  value={tag.id as string}
                  onSelect={handleSelect}
                >
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}
