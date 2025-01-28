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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { Plus, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const IngredientsQuery = graphql(`
  query IngredientsSearch($search: String!, $alreadySelected: [UUID!]!) {
    ingredientsCursor(
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

const AddIngredientMutation = graphql(`
  mutation AddIngredient($name: String!) {
    addIngredient(input: { createDto: { name: $name } }) {
      ingredient {
        id
        name
      }
    }
  }
`)

interface Ingredient {
  ingredientId: string
  amount: string
}

interface IngredientSelectorProps {
  value: Ingredient[]
  onChange: (value: Ingredient[]) => void
  initialIngredients?: { id: string; name: string }[]
}

const commonUnits = [
  'g',
  'kg',
  'ml',
  'l',
  'cup',
  'tbsp',
  'tsp',
  'piece',
  'to taste'
] as const

interface IngredientDetails {
  id: string
  name: string
}

export function IngredientSelector({
  value,
  onChange,
  initialIngredients = []
}: IngredientSelectorProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [tempAmount, setTempAmount] = useState('')
  const [tempUnit, setTempUnit] = useState<string>('g')
  const [selectedIngredient, setSelectedIngredient] = useState<{
    id: string
    name: string
  } | null>(null)
  const [selectedIngredientsMap, setSelectedIngredientsMap] = useState<
    Record<string, IngredientDetails>
  >(() => {
    return initialIngredients.reduce(
      (acc, ingredient) => {
        acc[ingredient.id] = { id: ingredient.id, name: ingredient.name }
        return acc
      },
      {} as Record<string, IngredientDetails>
    )
  })

  const [{ data }] = useQuery({
    query: IngredientsQuery,
    requestPolicy: 'cache-and-network',
    variables: {
      search: debouncedSearch,
      alreadySelected: value.map((item) => item.ingredientId)
    }
  })

  const [{ fetching: isAddingIngredient }, addIngredient] = useMutation(
    AddIngredientMutation
  )

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
  }, 150)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedSetSearch(value)
  }

  const handleSelect = useCallback(
    (ingredientId: string, ingredientName: string) => {
      if (!value.some((item) => item.ingredientId === ingredientId)) {
        setSelectedIngredientsMap((prev) => ({
          ...prev,
          [ingredientId]: { id: ingredientId, name: ingredientName }
        }))
        setSelectedIngredient({ id: ingredientId, name: ingredientName })
        setSearch('')
      }
    },
    [value]
  )

  const handleAddIngredient = useCallback(() => {
    if (selectedIngredient && tempAmount) {
      const amount =
        tempUnit === 'to taste' ? 'to taste' : `${tempAmount} ${tempUnit}`
      onChange([...value, { ingredientId: selectedIngredient.id, amount }])
      setTempAmount('')
      setSelectedIngredient(null)
      setTempUnit('g')
    }
  }, [onChange, selectedIngredient, tempAmount, tempUnit, value])

  const handleRemove = useCallback(
    (ingredientId: string) => {
      onChange(value.filter((item) => item.ingredientId !== ingredientId))
    },
    [value, onChange]
  )

  const handleAmountChange = useCallback(
    (ingredientId: string, newAmount: string) => {
      onChange(
        value.map((item) =>
          item.ingredientId === ingredientId
            ? { ...item, amount: newAmount }
            : item
        )
      )
    },
    [value, onChange]
  )

  const handleCreateIngredient = useCallback(async () => {
    if (!search.trim()) return

    const result = await addIngredient({
      name: search.trim()
    })

    if (result.data?.addIngredient?.ingredient) {
      const newIngredient = result.data.addIngredient.ingredient
      handleSelect(newIngredient.id as string, newIngredient.name as string)
    }
  }, [search, addIngredient, handleSelect])

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {value.map((item) => (
          <Badge
            key={item.ingredientId}
            variant='secondary'
            className='group flex items-center gap-2 p-2 pr-1 transition-colors hover:bg-secondary/80'
          >
            <span className='font-medium'>
              {selectedIngredientsMap[item.ingredientId]?.name ??
                'Unknown ingredient'}
            </span>
            <span className='text-muted-foreground'>•</span>
            <div className='flex items-center gap-1'>
              <Input
                type='text'
                value={item.amount.split(' ')[0]}
                onChange={(e) => {
                  const unit = item.amount.split(' ')[1] || 'g'
                  handleAmountChange(
                    item.ingredientId,
                    `${e.target.value} ${unit}`
                  )
                }}
                className='h-6 w-16 border-none bg-transparent p-0 text-center focus-visible:ring-1'
              />
              <Select
                value={item.amount.split(' ')[1] || 'g'}
                onValueChange={(unit) => {
                  const amount = item.amount.split(' ')[0]
                  handleAmountChange(item.ingredientId, `${amount} ${unit}`)
                }}
              >
                <SelectTrigger className='h-6 w-[70px] border-none bg-transparent px-1 focus:ring-1'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {commonUnits.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='ml-1 h-6 w-6 p-0 opacity-50 hover:bg-destructive/10 hover:opacity-100 group-hover:opacity-75'
              onClick={() => handleRemove(item.ingredientId)}
            >
              <X className='h-3 w-3' />
            </Button>
          </Badge>
        ))}
      </div>

      <div className='space-y-2'>
        {selectedIngredient ? (
          <div className='flex items-center gap-2'>
            <Badge variant='outline' className='h-9 px-3'>
              {selectedIngredient.name}
            </Badge>
            <Input
              type='text'
              value={tempAmount}
              onChange={(e) => setTempAmount(e.target.value)}
              className='w-24'
              placeholder='Amount'
              disabled={tempUnit === 'to taste'}
            />
            <Select value={tempUnit} onValueChange={setTempUnit}>
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder='Unit' />
              </SelectTrigger>
              <SelectContent>
                {commonUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type='button'
              variant='secondary'
              onClick={handleAddIngredient}
              disabled={!tempAmount && tempUnit !== 'to taste'}
            >
              Add
            </Button>
            <Button
              type='button'
              variant='ghost'
              onClick={() => setSelectedIngredient(null)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className='space-y-1.5'>
            <p className='text-sm text-muted-foreground'>
              Search for an ingredient to add
            </p>
            <Command className='rounded-md border' shouldFilter={false}>
              <CommandInput
                value={search}
                onValueChange={handleSearchChange}
                placeholder='Search ingredients...'
              />
              <CommandList>
                <CommandEmpty>
                  <div className='flex flex-col gap-2 p-4 text-center'>
                    <p className='text-sm text-muted-foreground'>
                      No matching ingredients found for &quot;{search}&quot;
                    </p>
                    <Button
                      variant='outline'
                      size='sm'
                      className='mx-auto w-full'
                      disabled={!search.trim() || isAddingIngredient}
                      onClick={handleCreateIngredient}
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      {isAddingIngredient ? (
                        <>
                          <span className='mr-2'>Creating ingredient...</span>
                          <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                        </>
                      ) : (
                        `Create "${search}" ingredient`
                      )}
                    </Button>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {data?.ingredientsCursor?.nodes?.map((ingredient) => (
                    <CommandItem
                      key={ingredient.id as string}
                      value={ingredient.id as string}
                      onSelect={() =>
                        handleSelect(
                          ingredient.id as string,
                          ingredient.name as string
                        )
                      }
                    >
                      {ingredient.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  )
}
