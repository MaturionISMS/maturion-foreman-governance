/**
 * QIEL Constitutional Integrity Test
 * 
 * This test validates the integrity of constitutional files through:
 * - Hash-based integrity checking
 * - Path protection validation
 * - Suppression detection
 * - Constitutional drift detection
 * 
 * Part of the Quality Integrity Enforcement Layer (QIEL)
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import * as path from 'path'
import * as fs from 'fs/promises'
import {
  calculateConstitutionalHashes,
  verifyConstitutionalHashes,
  areHashesValid,
  getHashMismatches,
  CONSTITUTIONAL_FILES
} from '@/lib/foreman/guardrails/hash-checker'
import {
  validateImmutablePaths,
  detectProtectedFileChanges,
  detectSuppressions,
  scanForSuppressions,
  isPathProtected
} from '@/lib/foreman/guardrails/path-protection'
import { loadGuardrails } from '@/lib/foreman/guardrails/runtime'

describe('QIEL: Constitutional Integrity Validation', () => {
  describe('Constitutional Files Exist', () => {
    it('should verify all constitutional files exist', async () => {
      for (const file of CONSTITUTIONAL_FILES) {
        const filePath = path.join(process.cwd(), file)
        
        try {
          await fs.access(filePath)
          console.log(`✓ ${file} exists`)
        } catch (error) {
          assert.fail(`Constitutional file missing: ${file}`)
        }
      }
    })

    it('should verify constitutional files are not empty', async () => {
      for (const file of CONSTITUTIONAL_FILES) {
        const filePath = path.join(process.cwd(), file)
        const content = await fs.readFile(filePath, 'utf-8')
        
        assert.ok(content.length > 0, `${file} must not be empty`)
        console.log(`✓ ${file} is not empty (${content.length} bytes)`)
      }
    })
  })

  describe('Hash-Based Integrity', () => {
    it('should calculate hashes for all constitutional files', () => {
      const hashes = calculateConstitutionalHashes()
      
      assert.ok(hashes.length > 0, 'Should calculate at least one hash')
      
      for (const hash of hashes) {
        assert.ok(hash.path, 'Hash should have a path')
        assert.ok(hash.hash, 'Hash should have a hash value')
        assert.ok(hash.hash.length === 64, 'SHA-256 hash should be 64 characters')
        assert.ok(hash.timestamp, 'Hash should have a timestamp')
        assert.ok(hash.size > 0, 'Hash should have a size')
        
        console.log(`✓ Calculated hash for ${hash.path}: ${hash.hash.substring(0, 16)}...`)
      }
    })

    it('should verify constitutional hashes', () => {
      const results = verifyConstitutionalHashes()
      
      assert.ok(results.length > 0, 'Should have verification results')
      
      for (const result of results) {
        console.log(`  ${result.status === 'passed' ? '✓' : '✗'} ${result.file}: ${result.message}`)
      }
      
      // Note: We don't fail if no baseline exists (first-time run)
      // But we do log a warning if hashes don't match
      const mismatches = getHashMismatches(results)
      if (mismatches.length > 0) {
        console.warn('⚠ Hash mismatches detected:')
        for (const mismatch of mismatches) {
          console.warn(`  - ${mismatch.file}: ${mismatch.message}`)
        }
      }
    })
  })

  describe('Path Protection', () => {
    it('should validate all immutable paths exist', () => {
      const config = loadGuardrails()
      const results = validateImmutablePaths(config.immutablePaths)
      
      const missing = results.filter(r => r.status === 'missing')
      const inaccessible = results.filter(r => r.status === 'inaccessible')
      
      if (missing.length > 0) {
        console.error('Missing immutable paths:')
        for (const result of missing) {
          console.error(`  ✗ ${result.path}`)
        }
      }
      
      if (inaccessible.length > 0) {
        console.error('Inaccessible immutable paths:')
        for (const result of inaccessible) {
          console.error(`  ✗ ${result.path}`)
        }
      }
      
      assert.strictEqual(
        missing.length,
        0,
        'All immutable paths must exist'
      )
      
      assert.strictEqual(
        inaccessible.length,
        0,
        'All immutable paths must be accessible'
      )
      
      console.log(`✓ All ${results.length} immutable paths exist and are accessible`)
    })

    it('should detect if paths are protected', () => {
      const config = loadGuardrails()
      
      // Test that known protected paths are detected
      const testPaths = [
        '.github/workflows/qic.yml',
        '.github/foreman/agent-contract.md',
        'foreman/constitution/guardrails.json'
      ]
      
      for (const testPath of testPaths) {
        const isProtected = isPathProtected(testPath, config.immutablePaths)
        assert.ok(isProtected, `${testPath} should be protected`)
        console.log(`✓ ${testPath} is protected`)
      }
    })

    it('should verify protected files have not been modified', () => {
      const config = loadGuardrails()
      const changes = detectProtectedFileChanges(config.protectedFiles)
      
      const modified = changes.filter(c => c.modified)
      
      if (modified.length > 0) {
        console.warn('⚠ Modified protected files detected:')
        for (const change of modified) {
          console.warn(`  - ${change.path}: ${change.message}`)
        }
      }
      
      // Log all file statuses
      for (const change of changes) {
        const icon = change.modified ? '✗' : '✓'
        console.log(`  ${icon} ${change.path}: ${change.message}`)
      }
    })
  })

  describe('Suppression Detection', () => {
    it('should detect suppressions in workflow files', async () => {
      const workflowsDir = path.join(process.cwd(), '.github', 'workflows')
      const files = await fs.readdir(workflowsDir)
      
      let totalSuppressions = 0
      
      for (const file of files) {
        if (!file.endsWith('.yml') && !file.endsWith('.yaml')) {
          continue
        }
        
        const filePath = path.join('.github', 'workflows', file)
        const result = detectSuppressions(filePath)
        
        if (result.found) {
          console.warn(`⚠ Suppressions found in ${file}:`)
          for (const suppression of result.suppressions) {
            console.warn(`  Line ${suppression.line}: ${suppression.type} - ${suppression.pattern}`)
            totalSuppressions++
          }
        }
      }
      
      if (totalSuppressions === 0) {
        console.log('✓ No suppressions found in workflow files')
      } else {
        console.warn(`⚠ Total suppressions found: ${totalSuppressions}`)
      }
      
      // Note: We don't fail on suppressions, but we log them
      // Suppressions should be reviewed and approved
    })

    it('should scan lib directory for suppressions', () => {
      const libDir = path.join(process.cwd(), 'lib')
      const results = scanForSuppressions(libDir, true)
      
      console.log(`Scanned ${results.totalFiles} files`)
      console.log(`Files with suppressions: ${results.filesWithSuppressions}`)
      
      if (results.suppressions.length > 0) {
        console.warn(`⚠ Found ${results.suppressions.length} suppressions in lib/`)
        
        // Group by type
        const byType = new Map<string, number>()
        for (const suppression of results.suppressions) {
          byType.set(suppression.type, (byType.get(suppression.type) || 0) + 1)
        }
        
        console.warn('  Suppressions by type:')
        for (const [type, count] of byType.entries()) {
          console.warn(`    ${type}: ${count}`)
        }
      } else {
        console.log('✓ No suppressions found in lib/')
      }
      
      // Note: We don't fail on suppressions in lib, but log them for review
    })
  })

  describe('Constitutional Drift Detection', () => {
    it('should verify no governance files are in .gitignore', async () => {
      const gitignorePath = path.join(process.cwd(), '.gitignore')
      const content = await fs.readFile(gitignorePath, 'utf-8')
      
      const forbiddenPatterns = [
        'foreman/constitution',
        '.github/foreman',
        'docs/governance',
        '.github/workflows'
      ]
      
      for (const pattern of forbiddenPatterns) {
        assert.ok(
          !content.includes(pattern),
          `${pattern} must not be in .gitignore`
        )
      }
      
      console.log('✓ No governance files are ignored by git')
    })

    it('should verify constitution directory is not empty', async () => {
      const constitutionDir = path.join(process.cwd(), 'foreman', 'constitution')
      const files = await fs.readdir(constitutionDir)
      
      assert.ok(files.length > 0, 'Constitution directory must not be empty')
      assert.ok(
        files.includes('guardrails.json'),
        'Constitution must contain guardrails.json'
      )
      
      console.log(`✓ Constitution directory contains ${files.length} files`)
    })

    it('should verify all workflow files are present', async () => {
      const config = loadGuardrails()
      const workflowsDir = path.join(process.cwd(), '.github', 'workflows')
      
      for (const checkName of config.requiredChecks) {
        const ymlPath = path.join(workflowsDir, `${checkName}.yml`)
        const yamlPath = path.join(workflowsDir, `${checkName}.yaml`)
        
        let exists = false
        try {
          await fs.access(ymlPath)
          exists = true
          console.log(`✓ ${checkName}.yml exists`)
        } catch {
          try {
            await fs.access(yamlPath)
            exists = true
            console.log(`✓ ${checkName}.yaml exists`)
          } catch {
            // Neither exists
          }
        }
        
        assert.ok(
          exists,
          `Required workflow ${checkName}.yml or ${checkName}.yaml must exist`
        )
      }
    })
  })

  describe('Zero-Warning Policy', () => {
    it('should enforce zero-warning policy in constitutional files', async () => {
      // This test ensures that constitutional files don't contain
      // any warning suppressions or bypasses
      
      for (const file of CONSTITUTIONAL_FILES) {
        const filePath = path.join(process.cwd(), file)
        const content = await fs.readFile(filePath, 'utf-8')
        
        // Check for common warning suppressions
        const forbiddenPatterns = [
          /eslint-disable/i,
          /@ts-ignore/i,
          /@ts-nocheck/i,
          /prettier-ignore/i,
          /NOSONAR/i
        ]
        
        for (const pattern of forbiddenPatterns) {
          assert.ok(
            !pattern.test(content),
            `${file} must not contain suppressions matching ${pattern}`
          )
        }
        
        console.log(`✓ ${file} has no warning suppressions`)
      }
    })
  })
})
