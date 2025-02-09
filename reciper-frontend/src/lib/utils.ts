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

export function isEmptyOrWhitespace(value: string) {
  return value === '' || value === null || value === undefined
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: 'accurate' | 'normal'
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytes')
      : (sizes[i] ?? 'Bytes')
  }`
}
