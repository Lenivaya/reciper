import { recipeSearchParamsSchema } from '@/components/recipes/recipes-search/recipes-search-params'
import { useRouter } from 'next/navigation'
import { useQueryStates } from 'nuqs'

export const useCookCardRecipesRedirect = (
  cookId: string,
  isOnTheCriteriasPage: boolean
) => {
  const router = useRouter()
  const [{ authorId: queryAuthorId }, setSearchParams] = useQueryStates(
    recipeSearchParamsSchema,
    {
      shallow: false
    }
  )

  const handleRedirect = () => {
    if (isOnTheCriteriasPage) {
      setSearchParams((prev) => ({
        ...prev,
        authorId: cookId,
        page: '1'
      }))
      return
    }

    router.push(`/recipes?authorId=${cookId}&page=1`)
  }

  return { handleRedirect }
}
