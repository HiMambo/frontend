import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format } from "date-fns"
import { type SearchParams } from "@/context/SearchContext"
import { type APISearchParams } from "@/lib/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts SearchParams to API-friendly format
export function convertSearchParamsToAPI(searchParams: SearchParams): APISearchParams {
  const apiParams: APISearchParams = {}

  // Convert search query
  if (searchParams.searchQuery.trim()) {
    apiParams.searchQuery = searchParams.searchQuery.trim()
  }
    
  // Convert destination query (Just for poc)
  if (searchParams.searchQuery.trim()) {
    apiParams.destination = searchParams.searchQuery.trim()
  }

  // Convert date range to API format
  if (searchParams.date?.from) {
    apiParams.date_from = format(searchParams.date.from, 'yyyy-MM-dd')
  }
  if (searchParams.date?.to) {
    apiParams.date_to = format(searchParams.date.to, 'yyyy-MM-dd')
  }

  // Convert travellers
  if (searchParams.travellers > 1) {
    apiParams.travellers = searchParams.travellers
  }

  // Convert experience type
  if (searchParams.experienceType && searchParams.experienceType !== "Any") {
    apiParams.experience_type = searchParams.experienceType
  }

  return apiParams
}
