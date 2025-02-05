import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import {
  RecipePageContent,
  RecipePageFragment
} from '../../../components/recipes/recipe-page/recipe-page-content'

interface RecipePageProps {
  params: Promise<{ id: string }>
}

const GetRecipeForPageQuery = graphql(
  `
    query GetRecipeForPage($id: UUID!) {
      recipeById(recipeId: $id) {
        ...RecipePageFragment
      }
    }
  `,
  [RecipePageFragment]
)

export default async function RecipePage({ params }: RecipePageProps) {
  const parsedParams = await params
  const result = await getClient().query(GetRecipeForPageQuery, {
    id: parsedParams.id
  })

  if (result.error) {
    console.error(result.error)
    return <div>Error: {result.error.message}</div>
  }

  if (!result.data?.recipeById) {
    return <div>Recipe not found</div>
  }

  return <RecipePageContent recipe={result.data.recipeById} />
}
