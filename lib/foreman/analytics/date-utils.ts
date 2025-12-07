/**
 * Date Utilities
 * Shared date handling utilities for analytics modules
 */

import { MemoryEntry } from '@/types/memory'

/**
 * Safely get a valid date from a MemoryEntry's createdAt field
 * Returns null if the date is invalid or missing
 */
export function getValidCreatedDate(entry: MemoryEntry): Date | null {
  if (!entry.metadata?.createdAt) {
    return null
  }
  
  const date = new Date(entry.metadata.createdAt)
  if (isNaN(date.getTime())) {
    return null
  }
  
  return date
}

/**
 * Safely get age in days from a MemoryEntry
 * Returns 0 if the date is invalid or missing
 */
export function getEntryAgeInDays(entry: MemoryEntry): number {
  const createdDate = getValidCreatedDate(entry)
  if (!createdDate) {
    return 0
  }
  
  const ageMs = Date.now() - createdDate.getTime()
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  
  return ageDays >= 0 ? ageDays : 0
}

/**
 * Safely get ISO date string from a MemoryEntry's createdAt field
 * Returns null if the date is invalid or missing
 */
export function getEntryDateString(entry: MemoryEntry): string | null {
  const date = getValidCreatedDate(entry)
  if (!date) {
    return null
  }
  
  return date.toISOString().split('T')[0]
}
