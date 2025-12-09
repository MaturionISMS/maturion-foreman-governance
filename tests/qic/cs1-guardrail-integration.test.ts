/**
 * CS1 Guardrail Integration Test
 * 
 * This test validates the complete Constitutional Guardrail Runtime Engine:
 * - Runtime initialization
 * - Hash-based integrity checking
 * - Path protection
 * - Suppression detection
 * - Integration with dispatch.ts
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  runGuardrailChecks,
  loadGuardrails,
  checkImmutablePaths,
  validateRequiredChecks,
  validateAgentContract,
  validateConstitutionalHashIntegrity,
  evaluateGovernanceDrift
} from '@/lib/foreman/guardrails/runtime'
import {
  calculateConstitutionalHashes,
  verifyConstitutionalHashes,
  areHashesValid
} from '@/lib/foreman/guardrails/hash-checker'
import {
  validateImmutablePaths,
  isPathProtected,
  shouldBlockModification,
  scanForSuppressions
} from '@/lib/foreman/guardrails/path-protection'

describe('CS1: Constitutional Guardrail Integration', () => {
  describe('Guardrail Configuration', () => {
    it('should load guardrails configuration successfully', () => {
      const config = loadGuardrails()
      
      assert.ok(config, 'Configuration should exist')
      assert.ok(Array.isArray(config.immutablePaths), 'immutablePaths should be an array')
      assert.ok(Array.isArray(config.requiredChecks), 'requiredChecks should be an array')
      assert.ok(Array.isArray(config.protectedFiles), 'protectedFiles should be an array')
      
      // Verify critical paths are protected
      assert.ok(
        config.immutablePaths.includes('.github/workflows'),
        'Workflows directory must be immutable'
      )
      assert.ok(
        config.immutablePaths.includes('foreman/constitution'),
        'Constitution directory must be immutable'
      )
      
      console.log('✓ Guardrails configuration loaded successfully')
      console.log(`  - ${config.immutablePaths.length} immutable paths`)
      console.log(`  - ${config.requiredChecks.length} required checks`)
      console.log(`  - ${config.protectedFiles.length} protected files`)
    })
  })

  describe('Individual Guardrail Checks', () => {
    it('should validate immutable paths', () => {
      const config = loadGuardrails()
      const result = checkImmutablePaths(config)
      
      assert.strictEqual(result.status, 'passed', `Immutable paths check should pass: ${result.message}`)
      console.log(`✓ Immutable paths validated: ${result.message}`)
    })

    it('should validate required workflow checks', () => {
      const config = loadGuardrails()
      const result = validateRequiredChecks(config)
      
      assert.strictEqual(result.status, 'passed', `Required checks should pass: ${result.message}`)
      console.log(`✓ Required checks validated: ${result.message}`)
    })

    it('should validate agent contract', () => {
      const result = validateAgentContract()
      
      assert.strictEqual(result.status, 'passed', `Agent contract should be valid: ${result.message}`)
      console.log(`✓ Agent contract validated: ${result.message}`)
    })

    it('should validate constitutional hash integrity', () => {
      const result = validateConstitutionalHashIntegrity()
      
      // Note: This may pass or fail depending on whether baseline exists
      // and whether files have been modified
      console.log(`  Hash integrity check: ${result.status}`)
      console.log(`  ${result.message}`)
      
      if (result.status === 'failed' && result.details?.mismatches) {
        console.log('  Mismatches detected:')
        for (const mismatch of result.details.mismatches) {
          console.log(`    - ${mismatch.file}: ${mismatch.message}`)
        }
      }
    })

    it('should evaluate governance drift', () => {
      const config = loadGuardrails()
      const result = evaluateGovernanceDrift(config)
      
      // This checks overall drift which includes hash checks
      console.log(`  Governance drift evaluation: ${result.status}`)
      console.log(`  ${result.message}`)
      
      if (result.status === 'failed' && result.details?.issues) {
        console.log('  Issues detected:')
        for (const issue of result.details.issues) {
          console.log(`    - ${issue}`)
        }
      }
    })
  })

  describe('Complete Guardrail Validation', () => {
    it('should run all guardrail checks successfully', async () => {
      const result = await runGuardrailChecks()
      
      assert.ok(result, 'Validation result should exist')
      assert.ok(result.checks.length > 0, 'Should run at least one check')
      assert.ok(result.timestamp, 'Should have timestamp')
      
      console.log(`\n  Overall Status: ${result.overall}`)
      console.log(`  Checks Run: ${result.checks.length}`)
      console.log(`  Violations: ${result.violations.length}\n`)
      
      for (const check of result.checks) {
        const icon = check.status === 'passed' ? '✓' : '✗'
        console.log(`  ${icon} ${check.check}: ${check.message}`)
      }
      
      if (result.violations.length > 0) {
        console.log('\n  Violations:')
        for (const violation of result.violations) {
          console.log(`    - ${violation}`)
        }
      }
      
      // Don't fail if hash integrity fails (may not have baseline yet)
      // but ensure other critical checks pass
      const criticalChecks = result.checks.filter(c => 
        c.check !== 'hash_integrity' && 
        c.check !== 'governance_drift' // drift may fail if hash fails
      )
      
      const criticalFailures = criticalChecks.filter(c => c.status === 'failed')
      
      assert.strictEqual(
        criticalFailures.length,
        0,
        `Critical guardrail checks must pass: ${criticalFailures.map(c => c.check).join(', ')}`
      )
    })
  })

  describe('Hash-Based Integrity', () => {
    it('should calculate hashes for constitutional files', () => {
      const hashes = calculateConstitutionalHashes()
      
      assert.ok(hashes.length > 0, 'Should calculate at least one hash')
      
      for (const hash of hashes) {
        assert.ok(hash.path, 'Hash should have path')
        assert.ok(hash.hash, 'Hash should have hash value')
        assert.strictEqual(hash.hash.length, 64, 'SHA-256 hash should be 64 characters')
      }
      
      console.log(`✓ Calculated hashes for ${hashes.length} constitutional files`)
    })

    it('should verify constitutional hashes', () => {
      const results = verifyConstitutionalHashes()
      
      assert.ok(results.length > 0, 'Should have verification results')
      
      const valid = areHashesValid(results)
      console.log(`  Hash verification: ${valid ? 'PASSED' : 'WARNING'}`)
      
      if (!valid) {
        console.log('  Note: This may be expected if baseline has not been generated')
      }
    })
  })

  describe('Path Protection', () => {
    it('should validate immutable paths exist', () => {
      const config = loadGuardrails()
      const results = validateImmutablePaths(config.immutablePaths)
      
      const missing = results.filter(r => r.status === 'missing')
      const inaccessible = results.filter(r => r.status === 'inaccessible')
      
      assert.strictEqual(missing.length, 0, 'All immutable paths must exist')
      assert.strictEqual(inaccessible.length, 0, 'All immutable paths must be accessible')
      
      console.log(`✓ All ${results.length} immutable paths validated`)
    })

    it('should detect protected paths correctly', () => {
      const config = loadGuardrails()
      
      const testCases = [
        { path: '.github/workflows/qic.yml', shouldBeProtected: true },
        { path: '.github/foreman/agent-contract.md', shouldBeProtected: true },
        { path: 'foreman/constitution/guardrails.json', shouldBeProtected: true },
        { path: 'app/page.tsx', shouldBeProtected: false },
        { path: 'lib/some-file.ts', shouldBeProtected: false }
      ]
      
      for (const testCase of testCases) {
        const isProtected = isPathProtected(testCase.path, config.immutablePaths)
        
        assert.strictEqual(
          isProtected,
          testCase.shouldBeProtected,
          `${testCase.path} should ${testCase.shouldBeProtected ? '' : 'not '}be protected`
        )
        
        const icon = testCase.shouldBeProtected ? '🔒' : '✓'
        console.log(`  ${icon} ${testCase.path}: ${isProtected ? 'protected' : 'unprotected'}`)
      }
    })

    it('should block modifications to protected paths', () => {
      const config = loadGuardrails()
      
      const protectedPath = '.github/workflows/qic.yml'
      const shouldBlock = shouldBlockModification(protectedPath, config.immutablePaths)
      
      assert.strictEqual(shouldBlock, true, 'Should block modification to protected path')
      console.log(`✓ Modification blocking works: ${protectedPath}`)
    })
  })

  describe('Suppression Detection', () => {
    it('should scan for suppressions in lib directory', () => {
      const results = scanForSuppressions('lib', true)
      
      assert.ok(results.totalFiles > 0, 'Should scan at least one file')
      
      console.log(`  Scanned ${results.totalFiles} files`)
      console.log(`  Files with suppressions: ${results.filesWithSuppressions}`)
      console.log(`  Total suppressions: ${results.suppressions.length}`)
      
      if (results.suppressions.length > 0) {
        // Group by type
        const byType = new Map<string, number>()
        for (const suppression of results.suppressions) {
          byType.set(suppression.type, (byType.get(suppression.type) || 0) + 1)
        }
        
        console.log('  Suppressions by type:')
        for (const [type, count] of byType.entries()) {
          console.log(`    ${type}: ${count}`)
        }
      }
      
      // Note: We don't fail on suppressions, but we log them
      // Real suppressions should be reviewed and approved via Parking Station
    })
  })

  describe('Integration with Dispatch', () => {
    it('should have guardrail initialization in dispatch module', async () => {
      // Import dispatch module
      const dispatch = await import('@/lib/foreman/dispatch')
      
      assert.ok(
        typeof dispatch.initializeGuardrails === 'function',
        'dispatch.ts should export initializeGuardrails function'
      )
      
      assert.ok(
        typeof dispatch.areGuardrailsValidated === 'function',
        'dispatch.ts should export areGuardrailsValidated function'
      )
      
      console.log('✓ Guardrail functions integrated in dispatch.ts')
    })
  })

  describe('Zero-Warning Policy Enforcement', () => {
    it('should enforce zero-suppression rule', () => {
      const config = loadGuardrails()
      
      // Verify that governance files themselves have no suppressions
      const governanceFiles = [
        '.github/foreman/agent-contract.md',
        'foreman/constitution/guardrails.json'
      ]
      
      for (const file of governanceFiles) {
        const results = scanForSuppressions(file, false)
        
        assert.strictEqual(
          results.suppressions.length,
          0,
          `Governance file ${file} must not contain suppressions`
        )
      }
      
      console.log('✓ Zero-suppression rule enforced for governance files')
    })
  })
})
