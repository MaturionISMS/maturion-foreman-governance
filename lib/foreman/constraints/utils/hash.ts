/**
 * Hash Utilities for Architecture Constraint Engine
 * 
 * Provides deterministic hashing for architecture signatures.
 */

import * as crypto from 'crypto';

/**
 * Generate SHA-256 hash of a string
 */
export function sha256(content: string): string {
  return crypto
    .createHash('sha256')
    .update(content)
    .digest('hex');
}

/**
 * Generate deterministic hash of an object
 * 
 * Keys are sorted recursively to ensure determinism.
 * The 'excludeHashField' parameter controls whether to exclude 'hash' fields.
 * 
 * Note: Uses 'any' type for maximum flexibility in Wave 3A.
 * Future waves may add stricter type constraints.
 */
export function hashObject(obj: any, excludeHashField: boolean = false): string {
  const normalized = normalizeForHashing(obj, excludeHashField);
  const content = JSON.stringify(normalized);
  return sha256(content);
}

/**
 * Normalize object for deterministic hashing
 * 
 * - Sorts all object keys alphabetically
 * - Recursively processes nested objects
 * - Handles arrays properly
 * - Optionally excludes 'hash' field at top level only
 */
function normalizeForHashing(obj: any, excludeHashField: boolean = false, depth: number = 0): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeForHashing(item, false, depth + 1));
  }

  if (typeof obj === 'object') {
    const sorted: any = {};
    const keys = Object.keys(obj).sort();
    
    for (const key of keys) {
      // Only exclude 'hash' field at the top level (depth 0) if excludeHashField is true
      if (key === 'hash' && excludeHashField && depth === 0) {
        continue;
      }
      sorted[key] = normalizeForHashing(obj[key], false, depth + 1);
    }
    
    return sorted;
  }

  return obj;
}
