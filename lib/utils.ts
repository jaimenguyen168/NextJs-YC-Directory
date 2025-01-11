import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatViews(views: number) {
  return `${views} ${views === 1 ? 'view' : 'views'}`;
}

export function parseJSONResponse<T>(res: T) {
  return JSON.parse(JSON.stringify(res))
}