#!/usr/bin/env tsx

/**
 * Suppression Detection Script
 * 
 * Scans the codebase for QA suppressions and reports them.
 * Part of the Constitutional Guardrail system (CS1).
 * 
 * Usage:
 *   npm run guardrail:scan-suppressions
 *   tsx scripts/scan-suppressions.ts [directory]
 */

import { scanForSuppressions } from '../lib/foreman/guardrails/path-protection'

const targetDir = process.argv[2] || 'lib'

console.log('=== Suppression Detection Scan ===\n')
console.log(`Scanning directory: ${targetDir}\n`)

try {
  const results = scanForSuppressions(targetDir, true)
  
  console.log(`Scanned ${results.totalFiles} files`)
  console.log(`Files with suppressions: ${results.filesWithSuppressions}`)
  console.log(`Total suppressions found: ${results.suppressions.length}\n`)
  
  if (results.suppressions.length === 0) {
    console.log('✅ No suppressions found - Zero-Warning Policy maintained!\n')
    process.exit(0)
  }
  
  // Group by type
  const byType = new Map<string, number>()
  const byFile = new Map<string, Array<{ line: number; type: string; pattern: string }>>()
  
  for (const suppression of results.suppressions) {
    // Count by type
    byType.set(suppression.type, (byType.get(suppression.type) || 0) + 1)
    
    // Group by file
    if (!byFile.has(suppression.file)) {
      byFile.set(suppression.file, [])
    }
    byFile.get(suppression.file)!.push({
      line: suppression.line,
      type: suppression.type,
      pattern: suppression.pattern
    })
  }
  
  console.log('⚠️  SUPPRESSIONS BY TYPE:\n')
  for (const [type, count] of Array.from(byType.entries()).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type.padEnd(20)} ${count} occurrence(s)`)
  }
  
  console.log('\n⚠️  SUPPRESSIONS BY FILE:\n')
  
  let fileCount = 0
  for (const [file, suppressions] of Array.from(byFile.entries()).sort((a, b) => b[1].length - a[1].length)) {
    fileCount++
    console.log(`  ${fileCount}. ${file} (${suppressions.length} suppression(s))`)
    
    for (const suppression of suppressions.slice(0, 5)) { // Show max 5 per file
      console.log(`     Line ${suppression.line}: ${suppression.type}`)
      console.log(`       ${suppression.pattern}`)
    }
    
    if (suppressions.length > 5) {
      console.log(`     ... and ${suppressions.length - 5} more`)
    }
    
    console.log()
  }
  
  console.log('═'.repeat(60))
  console.log('⚠️  ACTION REQUIRED')
  console.log('═'.repeat(60))
  console.log()
  console.log('Suppressions detected. According to CS1 (Constitutional Guardrails):')
  console.log()
  console.log('1. Review each suppression to understand why it was added')
  console.log('2. Create a Parking Station entry for each legitimate tech debt item')
  console.log('3. Get approval before keeping any suppression')
  console.log('4. Consider alternatives:')
  console.log('   - Fix the root cause instead of suppressing')
  console.log('   - Upgrade dependencies to resolve deprecated warnings')
  console.log('   - Refactor code to eliminate the need for suppression')
  console.log()
  console.log('Foreman must NEVER add suppressions autonomously.')
  console.log()
  
  // Exit with warning code but not failure (suppressions may be approved)
  process.exit(0)
  
} catch (error) {
  console.error('\n❌ Failed to scan for suppressions:')
  console.error(error)
  process.exit(1)
}
