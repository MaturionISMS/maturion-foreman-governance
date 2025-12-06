/**
 * Test Utilities for Dashboard Tests
 * Helper functions and shared test infrastructure
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import type { Project } from '../../types/project'

/**
 * Load a test fixture from the fixtures directory
 */
export function loadFixture(filename: string): Project {
  const fixturePath = join(__dirname, '../fixtures/dashboard', filename)
  const fixtureData = readFileSync(fixturePath, 'utf-8')
  return JSON.parse(fixtureData) as Project
}

/**
 * Assert helper for test comparisons
 */
export function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`)
  }
}

/**
 * Deep equality check for objects
 */
export function deepEqual<T>(actual: T, expected: T, message?: string): void {
  const actualStr = JSON.stringify(actual, null, 2)
  const expectedStr = JSON.stringify(expected, null, 2)
  
  if (actualStr !== expectedStr) {
    throw new Error(
      `${message || 'Deep equality check failed'}\n` +
      `Expected: ${expectedStr}\n` +
      `Actual: ${actualStr}`
    )
  }
}

/**
 * Check if value is within expected range
 */
export function assertInRange(
  value: number,
  min: number,
  max: number,
  message?: string
): void {
  if (value < min || value > max) {
    throw new Error(
      `${message || 'Range check failed'}: ${value} not in range [${min}, ${max}]`
    )
  }
}

/**
 * Check if array contains specific item
 */
export function assertContains<T>(
  array: T[],
  item: T,
  message?: string
): void {
  if (!array.includes(item)) {
    throw new Error(
      `${message || 'Contains check failed'}: Array does not contain ${JSON.stringify(item)}`
    )
  }
}

/**
 * Verify that a function throws an error
 */
export async function assertThrows(
  fn: () => void | Promise<void>,
  expectedMessage?: string
): Promise<void> {
  let threw = false
  let actualMessage = ''
  
  try {
    await fn()
  } catch (error) {
    threw = true
    actualMessage = error instanceof Error ? error.message : String(error)
  }
  
  if (!threw) {
    throw new Error('Expected function to throw an error, but it did not')
  }
  
  if (expectedMessage && !actualMessage.includes(expectedMessage)) {
    throw new Error(
      `Expected error message to contain "${expectedMessage}", ` +
      `but got "${actualMessage}"`
    )
  }
}
