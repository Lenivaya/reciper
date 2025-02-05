'use client'

import { RecipeCardTag } from '@/components/recipes/recipe-card/recipe-card-tag'
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
    // requestPolicy: 'network-only',
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
        {value.map((tagId, index) => (
          <div key={tagId} className='group flex items-center gap-1'>
            <RecipeCardTag
              tag={selectedTagsMap[tagId]?.name ?? 'Unknown tag'}
              index={index}
              className='shadow-sm transition-all duration-200 hover:shadow-md'
            />
            <Button
              variant='ghost'
              size='sm'
              className='hover:bg-destructive/10 h-auto p-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
              onClick={() => handleRemove(tagId)}
            >
              <X className='h-3 w-3' />
            </Button>
          </div>
        ))}
      </div>

      <div className='space-y-1.5'>
        <Command className='rounded-lg border shadow-sm' shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={handleSearchChange}
            placeholder='Search tags...'
            className='h-11'
          />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col gap-2 p-4 text-center'>
                <p className='text-muted-foreground text-sm'>
                  No matching tags found for &quot;{search}&quot;
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  className='hover:bg-primary/5 hover:text-primary hover:border-primary/20 mx-auto w-full'
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
              {data?.tagsCursor?.nodes?.map((tag, index) => (
                <CommandItem
                  key={tag.id as string}
                  value={tag.id as string}
                  onSelect={handleSelect}
                  className='cursor-pointer'
                >
                  <RecipeCardTag tag={tag.name as string} index={index} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}
