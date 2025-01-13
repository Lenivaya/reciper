import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Option } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSome<T>(value: Option<T>): value is T {
  return value !== null && value !== undefined
}

export function isNone<T>(value: Option<T>): value is null | undefined {
  return value === null || value === undefined
}
