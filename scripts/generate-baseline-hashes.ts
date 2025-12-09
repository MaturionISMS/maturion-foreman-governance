#!/usr/bin/env tsx

/**
 * Generate Baseline Constitutional Hashes
 * 
 * This script calculates SHA-256 hashes of all constitutional files
 * and stores them as a baseline for integrity verification.
 * 
 * Usage:
 *   npm run guardrail:baseline
 *   tsx scripts/generate-baseline-hashes.ts
 */

import { calculateConstitutionalHashes, storeBaselineHashes } from '../lib/foreman/guardrails/hash-checker'

console.log('=== Generating Constitutional Baseline Hashes ===\n')

try {
  // Calculate hashes
  const hashes = calculateConstitutionalHashes()
  
  console.log(`Calculated hashes for ${hashes.length} constitutional files:\n`)
  
  for (const hash of hashes) {
    console.log(`  ✓ ${hash.path}`)
    console.log(`    Hash: ${hash.hash}`)
    console.log(`    Size: ${hash.size} bytes`)
    console.log(`    Time: ${hash.timestamp.toISOString()}\n`)
  }
  
  // Store to file
  storeBaselineHashes(hashes)
  
  console.log('\n✅ Baseline hashes generated and stored successfully!')
  console.log('   Location: foreman/constitution/baseline-hashes.json')
  console.log('\n⚠️  Important: Commit this file to version control to track constitutional integrity')
  
  process.exit(0)
} catch (error) {
  console.error('\n❌ Failed to generate baseline hashes:')
  console.error(error)
  process.exit(1)
}
