import { graphql } from 'gql.tada'

export type DifficultyLevel = ReturnType<
  typeof graphql.scalar<'DifficultyLevel'>
>

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  BEGINNER: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  EASY: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
  INTERMEDIATE: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
  ADVANCED: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  EXPERT: 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
} as const

export function getDifficultyColor(difficultyLevel: DifficultyLevel): string {
  return DIFFICULTY_COLORS[difficultyLevel]
}
