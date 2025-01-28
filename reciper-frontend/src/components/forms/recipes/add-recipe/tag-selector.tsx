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
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { Plus, X } from 'lucide-react'
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

const AddTagMutation = graphql(`
  mutation AddTag($name: String!) {
    addTag(input: { createDto: { name: $name } }) {
      tag {
        id
        name
      }
    }
  }
`)

interface TagSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
  initialTags?: { id: string; name: string }[]
}

interface TagDetails {
  id: string
  name: string
}

export function TagSelector({
  value,
  onChange,
  initialTags = []
}: TagSelectorProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedTagsMap, setSelectedTagsMap] = useState<
    Record<string, TagDetails>
  >(() => {
    return initialTags.reduce(
      (acc, tag) => {
        acc[tag.id] = { id: tag.id, name: tag.name }
        return acc
      },
      {} as Record<string, TagDetails>
    )
  })

  const [{ data }] = useQuery({
    query: TagsQuery,
    requestPolicy: 'cache-and-network',
    variables: {
      search: debouncedSearch,
      alreadySelected: value
    }
  })

  const [{ fetching: isAddingTag }, addTag] = useMutation(AddTagMutation)

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

  const handleCreateTag = useCallback(async () => {
    if (!search.trim()) return

    const result = await addTag({
      name: search.trim()
    })

    if (result.data?.addTag?.tag) {
      const newTag = result.data.addTag.tag
      handleSelect(newTag.id as string)
      setDebouncedSearch('') // Refresh the search results
    }
  }, [search, addTag, handleSelect])

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
            <CommandEmpty>
              <div className='flex flex-col gap-2 p-4 text-center'>
                <p className='text-sm text-muted-foreground'>
                  No matching tags found for &quot;{search}&quot;
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  className='mx-auto w-full'
                  disabled={!search.trim() || isAddingTag}
                  onClick={handleCreateTag}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  {isAddingTag ? (
                    <>
                      <span className='mr-2'>Creating tag...</span>
                      <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    </>
                  ) : (
                    `Create "${search}" tag`
                  )}
                </Button>
              </div>
            </CommandEmpty>
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
