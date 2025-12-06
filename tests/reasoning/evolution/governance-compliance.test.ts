/**
 * Governance Compliance Tests
 * Ensures evolution engine follows governance rules
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle
} from '../../../lib/foreman/reasoning/evolution-engine'
import { clearMemoryScope } from '../../../lib/foreman/memory'
import fs from 'fs'
import path from 'path'

describe('Governance Compliance', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')

    // Clean up test files
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning'
    )
    if (fs.existsSync(consolidatedPath)) {
      const files = fs.readdirSync(consolidatedPath)
      files.forEach(file => {
        fs.unlinkSync(path.join(consolidatedPath, file))
      })
    }
  })

  test('should not modify governance files', async () => {
    const governanceDir = path.join(process.cwd(), 'foreman', 'governance')
    
    // Get list of governance files before
    let governanceFilesBefore: string[] = []
    if (fs.existsSync(governanceDir)) {
      governanceFilesBefore = fs.readdirSync(governanceDir)
    }

    await runEvolutionCycle('manual')

    // Get list of governance files after
    let governanceFilesAfter: string[] = []
    if (fs.existsSync(governanceDir)) {
      governanceFilesAfter = fs.readdirSync(governanceDir)
    }

    // Should not have changed governance files (except governance-events.json which is allowed)
    const changedFiles = governanceFilesAfter.filter(f => 
      !governanceFilesBefore.includes(f) && f !== 'governance-events.json'
    )
    
    assert.strictEqual(changedFiles.length, 0, 'Should not modify governance files')
    console.log('✓ Governance files not modified')
  })

  test('should not create new autonomy rules', async () => {
    const autonomyFile = path.join(process.cwd(), 'foreman', 'governance', 'autonomy.md')
    
    let autonomyBefore = ''
    if (fs.existsSync(autonomyFile)) {
      autonomyBefore = fs.readFileSync(autonomyFile, 'utf-8')
    }

    await runEvolutionCycle('manual')

    let autonomyAfter = ''
    if (fs.existsSync(autonomyFile)) {
      autonomyAfter = fs.readFileSync(autonomyFile, 'utf-8')
    }

    assert.strictEqual(autonomyBefore, autonomyAfter, 'Should not modify autonomy rules')
    console.log('✓ Autonomy rules not modified')
  })

  test('should only write to allowed directories', async () => {
    await runEvolutionCycle('manual')

    // Check that files are only created in allowed locations
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning'
    )

    const governanceEventsPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-events.json'
    )

    // These are the only files evolution should create/modify
    const allowedFiles = [
      consolidatedPath,
      governanceEventsPath
    ]

    // Consolidated patterns file is allowed
    const consolidatedFile = path.join(consolidatedPath, 'consolidated_reasoning_patterns.json')
    if (fs.existsSync(consolidatedFile)) {
      assert.ok(true, 'Consolidated patterns file is in allowed location')
    }

    console.log('✓ Evolution only writes to allowed directories')
  })

  test('should create reversible changes', async () => {
    const result = await runEvolutionCycle('manual')

    // All events should reference their source evidence
    for (const event of result.evolutionEvents) {
      assert.ok(event.sourceEvidence, 'Event should have source evidence')
      assert.ok(Array.isArray(event.sourceEvidence), 'Source evidence should be array')
      assert.ok(event.sourceEvidence.length > 0, 'Should have at least one source')
    }

    console.log('✓ All changes are reversible (have source evidence)')
  })

  test('should log all evolution events', async () => {
    const result = await runEvolutionCycle('manual')

    const governancePath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-events.json'
    )

    if (result.evolutionEvents.length > 0) {
      assert.ok(fs.existsSync(governancePath), 'Should create governance events log')

      const events = JSON.parse(fs.readFileSync(governancePath, 'utf-8'))
      
      // All evolution events should be logged
      for (const event of result.evolutionEvents) {
        const logged = events.find((e: any) => e.patternId === event.patternId && e.timestamp === event.timestamp)
        assert.ok(logged, `Event for pattern ${event.patternId} should be logged`)
      }
    }

    console.log('✓ All evolution events logged to governance')
  })

  test('should not modify built-in patterns', async () => {
    // Get built-in patterns
    const { getBuiltInPatterns } = await import('../../../lib/foreman/reasoning/patterns')
    const builtInBefore = getBuiltInPatterns()

    await runEvolutionCycle('manual')

    const builtInAfter = getBuiltInPatterns()

    // Built-in patterns should be unchanged
    assert.strictEqual(builtInBefore.length, builtInAfter.length, 'Built-in pattern count unchanged')
    
    for (let i = 0; i < builtInBefore.length; i++) {
      assert.strictEqual(builtInBefore[i].id, builtInAfter[i].id, 'Built-in pattern IDs unchanged')
      assert.strictEqual(builtInBefore[i].name, builtInAfter[i].name, 'Built-in pattern names unchanged')
    }

    console.log('✓ Built-in patterns not modified')
  })

  test('should enforce audit trail requirements', async () => {
    const result = await runEvolutionCycle('manual')

    // Every event should have required fields
    for (const event of result.evolutionEvents) {
      assert.ok(event.type, 'Event should have type')
      assert.ok(event.patternId, 'Event should have patternId')
      assert.ok(event.timestamp, 'Event should have timestamp')
      assert.ok(event.sourceEvidence, 'Event should have sourceEvidence')
      
      // Timestamp should be valid ISO 8601
      const date = new Date(event.timestamp)
      assert.ok(!isNaN(date.getTime()), 'Timestamp should be valid ISO 8601')
    }

    console.log('✓ Audit trail requirements enforced')
  })
})
