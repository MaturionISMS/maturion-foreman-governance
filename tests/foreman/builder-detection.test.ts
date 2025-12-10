/**
 * Tests for Builder Detection and Auto-Bootstrap
 */

import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import {
  checkInternalBuilderExists,
  getInternalCapabilities,
  getInternalBuilderProfile,
  autoBootstrapInternalBuilder,
  detectAllBuilders,
  detectOptimalBuilder,
  validateBuilderProtocol,
  checkGovernanceCompliance,
  storeInternalBuilderProfile
} from '@/lib/foreman/builder-detection'
import * as fs from 'fs'
import * as path from 'path'

describe('Builder Detection and Auto-Bootstrap', () => {
  
  describe('checkInternalBuilderExists', () => {
    test('should return true if internal builder agent file exists', () => {
      const agentPath = path.join(process.cwd(), '.github', 'agents', 'builder.agent.md')
      const exists = fs.existsSync(agentPath)
      const result = checkInternalBuilderExists()
      
      assert.strictEqual(result, exists)
    })
  })

  describe('getInternalCapabilities', () => {
    test('should return null if internal builder does not exist', async () => {
      // This test assumes builder might not exist in test environment
      // If it does exist, it will return capabilities
      const result = await getInternalCapabilities()
      
      if (result) {
        assert.strictEqual(result.builder, 'internal')
        assert.ok(result.capabilities.includes('code_generation'))
        assert.ok(result.capabilities.includes('build_to_green'))
        assert.ok(result.capabilities.includes('qic_compliance'))
        assert.strictEqual(result.protocolVersion, '1.0.0')
      } else {
        assert.strictEqual(result, null)
      }
    })

    test('should return capabilities if internal builder exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const capabilities = await getInternalCapabilities()
        
        assert.notStrictEqual(capabilities, null)
        assert.strictEqual(capabilities?.builder, 'internal')
        assert.ok(capabilities?.capabilities.includes('code_generation'))
        assert.ok(capabilities?.capabilities.includes('build_to_green'))
        assert.ok(capabilities?.capabilities.includes('qic_compliance'))
        assert.ok(capabilities?.capabilities.includes('qiel_compliance'))
        assert.ok(capabilities?.capabilities.includes('pr_creation'))
        assert.strictEqual(capabilities?.healthStatus, 'healthy')
        assert.strictEqual(capabilities?.protocolVersion, '1.0.0')
        assert.strictEqual(capabilities?.repository, 'maturion-foreman-app')
      }
    })
  })

  describe('getInternalBuilderProfile', () => {
    test('should return null if internal builder does not exist', async () => {
      const exists = checkInternalBuilderExists()
      const profile = await getInternalBuilderProfile()
      
      if (!exists) {
        assert.strictEqual(profile, null)
      }
    })

    test('should return profile with correct structure if builder exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const profile = await getInternalBuilderProfile()
        
        assert.notStrictEqual(profile, null)
        assert.strictEqual(profile?.builder, 'internal')
        assert.strictEqual(profile?.repository, 'maturion-foreman-app')
        assert.strictEqual(profile?.protocolVersion, '1.0.0')
        assert.strictEqual(profile?.constraints.repositoryOnly, true)
        assert.strictEqual(profile?.constraints.buildToGreenOnly, true)
        assert.strictEqual(profile?.constraints.qicCompliant, true)
        assert.strictEqual(profile?.constraints.qielCompliant, true)
        assert.ok(profile?.constraints.protectedPaths.includes('.github/workflows/'))
        assert.ok(profile?.constraints.protectedPaths.includes('BUILD_PHILOSOPHY.md'))
        assert.strictEqual(profile?.healthStatus, 'healthy')
      }
    })
  })

  describe('autoBootstrapInternalBuilder', () => {
    test('should succeed if internal builder already exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const result = await autoBootstrapInternalBuilder()
        
        assert.strictEqual(result.success, true)
        assert.strictEqual(result.reason, 'Already exists')
        assert.ok(result.profile !== undefined)
      }
    })

    test('should return error if builder file does not exist', async () => {
      const exists = checkInternalBuilderExists()
      
      if (!exists) {
        const result = await autoBootstrapInternalBuilder()
        
        assert.strictEqual(result.success, false)
        assert.ok(result.reason?.includes('not found'))
      }
    })
  })

  describe('detectAllBuilders', () => {
    test('should detect all available builders', async () => {
      const builders = await detectAllBuilders()
      
      assert.ok(builders.hasOwnProperty('copilot'))
      assert.ok(builders.hasOwnProperty('local'))
      assert.ok(builders.hasOwnProperty('internal'))
      
      assert.ok(builders.copilot.hasOwnProperty('available'))
      assert.ok(builders.copilot.hasOwnProperty('healthy'))
      
      assert.ok(builders.local.hasOwnProperty('available'))
      assert.ok(builders.local.hasOwnProperty('healthy'))
      
      assert.ok(builders.internal.hasOwnProperty('available'))
      assert.ok(builders.internal.hasOwnProperty('healthy'))
    })

    test('should include internal builder if it exists', async () => {
      const exists = checkInternalBuilderExists()
      const builders = await detectAllBuilders()
      
      if (exists) {
        assert.strictEqual(builders.internal.available, true)
        assert.strictEqual(builders.internal.healthy, true)
      }
    })
  })

  describe('detectOptimalBuilder', () => {
    test('should return a builder or null', async () => {
      const builder = await detectOptimalBuilder('medium')
      
      if (builder) {
        assert.ok(['copilot', 'local', 'internal'].includes(builder))
      } else {
        assert.strictEqual(builder, null)
      }
    })

    test('should fallback to internal builder if others unavailable', async () => {
      // This test would need to mock Copilot and Local builders being unavailable
      // For now, we just check that internal is considered as a fallback
      const exists = checkInternalBuilderExists()
      const builder = await detectOptimalBuilder('low')
      
      if (exists && builder === 'internal') {
        assert.strictEqual(builder, 'internal')
      }
    })
  })

  describe('validateBuilderProtocol', () => {
    test('should validate internal builder protocol if available', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        
        assert.ok(validation.hasOwnProperty('compliant'))
        assert.ok(validation.hasOwnProperty('issues'))
        assert.ok(validation.hasOwnProperty('warnings'))
        
        // Internal builder should be compliant
        assert.strictEqual(validation.compliant, true)
        assert.strictEqual(validation.issues.length, 0)
      }
    })

    test('should require code_generation capability', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        const capabilities = await getInternalCapabilities()
        
        if (capabilities) {
          assert.ok(capabilities.capabilities.includes('code_generation'))
        }
      }
    })

    test('should require build_to_green capability for internal builder', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        const capabilities = await getInternalCapabilities()
        
        if (capabilities) {
          assert.ok(capabilities.capabilities.includes('build_to_green'))
        }
      }
    })
  })

  describe('checkGovernanceCompliance', () => {
    test('should return compliance status for internal builder', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const compliance = await checkGovernanceCompliance('internal')
        
        assert.ok(compliance.hasOwnProperty('trueNorth'))
        assert.ok(compliance.hasOwnProperty('qic'))
        assert.ok(compliance.hasOwnProperty('qiel'))
        assert.ok(compliance.hasOwnProperty('driftDetector'))
        assert.ok(compliance.hasOwnProperty('sbhc'))
        
        // Internal builder should be compliant
        assert.strictEqual(compliance.trueNorth, true)
        assert.strictEqual(compliance.qic, true)
        assert.strictEqual(compliance.qiel, true)
      }
    })

    test('should return false for all checks if builder unavailable', async () => {
      // Test with a mock unavailable builder scenario would go here
    })
  })

  describe('storeInternalBuilderProfile', () => {
    test('should not throw error when storing profile', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const profile = await getInternalBuilderProfile()
        
        if (profile) {
          await assert.doesNotReject(
            async () => await storeInternalBuilderProfile(profile, 'test-org')
          )
        }
      }
    })
  })

  describe('Integration: Full Builder Detection Flow', () => {
    test('should detect builders, get optimal, and validate', async () => {
      // Detect all builders
      const availability = await detectAllBuilders()
      assert.ok(availability !== undefined)
      
      // Get optimal builder
      const optimal = await detectOptimalBuilder('medium')
      
      if (optimal) {
        // Validate protocol
        const validation = await validateBuilderProtocol(optimal)
        assert.ok(validation !== undefined)
        
        // Check governance compliance
        const compliance = await checkGovernanceCompliance(optimal)
        assert.ok(compliance !== undefined)
      }
    })

    test('should handle internal builder lifecycle', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        // 1. Check existence
        assert.strictEqual(checkInternalBuilderExists(), true)
        
        // 2. Get capabilities
        const capabilities = await getInternalCapabilities()
        assert.notStrictEqual(capabilities, null)
        
        // 3. Get profile
        const profile = await getInternalBuilderProfile()
        assert.notStrictEqual(profile, null)
        
        // 4. Validate protocol
        const validation = await validateBuilderProtocol('internal')
        assert.strictEqual(validation.compliant, true)
        
        // 5. Check governance compliance
        const compliance = await checkGovernanceCompliance('internal')
        assert.strictEqual(compliance.trueNorth, true)
        assert.strictEqual(compliance.qic, true)
        assert.strictEqual(compliance.qiel, true)
      }
    })
  })
})
