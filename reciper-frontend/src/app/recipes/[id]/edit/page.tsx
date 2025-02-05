import { EditRecipeForm } from '@/components/forms/recipes/edit-recipe/edit-recipe'
import { ScrollText } from 'lucide-react'
import { notFound } from 'next/navigation'

interface EditRecipePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const parsedParams = await params
  if (!parsedParams.id) {
    notFound()
  }

  return (
    <main className='from-background via-background to-background/80 dark:from-background dark:via-background/95 dark:to-background/75 relative container mx-auto flex bg-linear-to-b px-6 pt-20'>
      <div className='flex w-full flex-col items-center p-10'>
        <div className='flex w-full max-w-[1400px] flex-col items-center justify-center gap-4'>
          <h1 className='from-primary/60 to-primary flex items-center gap-2 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent'>
            <span className=''>
              <ScrollText className='dark:text-primary mr-1 h-10 w-10' />
            </span>
            Edit Recipe
          </h1>
        </div>

        <div className='mx-auto mt-10 h-max w-full max-w-[1400px]'>
          <EditRecipeForm recipeId={parsedParams.id} />
        </div>
      </div>
    </main>
  )
}
