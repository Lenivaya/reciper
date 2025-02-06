'use client'

import { AddRecipeCommentForm } from '@/components/forms/recipes/comments/add-recipe-comment'
import { RecipeComments } from '@/components/recipes/comments/recipe-comments'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface RecipeCommentsProps {
  recipeId: string
}

export function RecipeCommentsSection({ recipeId }: RecipeCommentsProps) {
  const [activeTab, setActiveTab] = useState('comments')

  return (
    <div className='mt-16'>
      <Separator className='mb-12' />
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h2 className='mb-2 text-3xl font-semibold tracking-tight'>
              Discussion
            </h2>
            <p className='text-muted-foreground text-sm'>
              Join the conversation and share your experience with this recipe
            </p>
          </div>
          <TabsList className='grid w-full max-w-[400px] grid-cols-2'>
            <TabsTrigger value='comments' className='flex items-center gap-2'>
              <MessageCircle className='h-4 w-4' />
              Comments
            </TabsTrigger>
            <TabsTrigger value='write' className='flex items-center gap-2'>
              Write a Comment
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='comments' className='space-y-8'>
          <Card>
            <CardContent className='p-6'>
              <RecipeComments recipeId={recipeId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='write'>
          <Card>
            <CardHeader>
              <CardTitle>Write a Comment</CardTitle>
              <CardDescription>
                Share your thoughts, tips, or variations of this recipe with
                others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddRecipeCommentForm
                recipeId={recipeId}
                onSuccess={() => {
                  setActiveTab('comments')
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
