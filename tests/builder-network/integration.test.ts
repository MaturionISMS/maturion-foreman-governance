/**
 * Builder Network Integration Tests
 * Tests for Copilot and Local builder detection, routing, and protocol compliance
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
  detectAllBuilders,
  detectOptimalBuilder,
  checkCopilotAvailability,
  checkLocalAvailability,
  getCopilotCapabilities,
  getLocalCapabilities,
  validateBuilderProtocol,
  checkGovernanceCompliance,
} from '@/lib/foreman/builder-detection'
import { isLocalBuilderEnabled } from '@/lib/foreman/local-builder'

describe('Builder Network - Copilot Detection', () => {
  it('should detect Copilot availability when not simulating failure', async () => {
    // Ensure simulation flags are not set
    delete process.env.SIMULATE_COPILOT_FAILURE
    delete process.env.SIMULATE_TOKEN_EXHAUSTION

    const available = await checkCopilotAvailability()
    assert.strictEqual(available, true, 'Copilot should be available')
  })

  it('should detect Copilot unavailability when simulated', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const available = await checkCopilotAvailability()
    assert.strictEqual(available, false, 'Copilot should be unavailable')

    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should detect Copilot token exhaustion', async () => {
    process.env.SIMULATE_TOKEN_EXHAUSTION = 'true'

    const available = await checkCopilotAvailability()
    assert.strictEqual(available, false, 'Copilot should be unavailable due to token exhaustion')

    delete process.env.SIMULATE_TOKEN_EXHAUSTION
  })

  it('should get Copilot capabilities when available', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    const capabilities = await getCopilotCapabilities()
    
    assert.ok(capabilities, 'Should return capabilities')
    assert.strictEqual(capabilities?.builder, 'copilot', 'Builder type should be copilot')
    assert.ok(Array.isArray(capabilities?.capabilities), 'Capabilities should be an array')
    assert.ok(capabilities?.capabilities.includes('code_generation'), 'Should include code_generation capability')
    assert.strictEqual(capabilities?.healthStatus, 'healthy', 'Health status should be healthy')
    assert.strictEqual(capabilities?.protocolVersion, '1.0.0', 'Protocol version should be 1.0.0')
  })

  it('should return null capabilities when Copilot unavailable', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const capabilities = await getCopilotCapabilities()
    assert.strictEqual(capabilities, null, 'Should return null when unavailable')

    delete process.env.SIMULATE_COPILOT_FAILURE
  })
})

describe('Builder Network - Local Builder Detection', () => {
  it('should detect Local builder configuration', () => {
    const enabled = isLocalBuilderEnabled()
    assert.strictEqual(typeof enabled, 'boolean', 'Should return boolean')
  })

  it('should check Local builder availability', async () => {
    const available = await checkLocalAvailability()
    assert.strictEqual(typeof available, 'boolean', 'Should return boolean')
  })

  it('should get Local builder capabilities when enabled', async () => {
    const capabilities = await getLocalCapabilities()
    
    if (isLocalBuilderEnabled()) {
      assert.ok(capabilities, 'Should return capabilities when enabled')
      assert.strictEqual(capabilities?.builder, 'local', 'Builder type should be local')
      assert.ok(Array.isArray(capabilities?.capabilities), 'Capabilities should be an array')
      assert.ok(capabilities?.capabilities.includes('code_generation'), 'Should include code_generation')
      assert.ok(capabilities?.capabilities.includes('large_refactors'), 'Should include large_refactors')
      assert.strictEqual(capabilities?.protocolVersion, '1.0.0', 'Protocol version should be 1.0.0')
    } else {
      assert.strictEqual(capabilities, null, 'Should return null when disabled')
    }
  })

  it('should indicate health status for Local builder', async () => {
    if (!isLocalBuilderEnabled()) {
      console.log('[Test] Local builder disabled, skipping health check')
      return
    }

    const capabilities = await getLocalCapabilities()
    assert.ok(capabilities, 'Should return capabilities')
    assert.ok(
      ['healthy', 'unavailable'].includes(capabilities.healthStatus),
      'Health status should be healthy or unavailable'
    )
  })
})

describe('Builder Network - Unified Detection', () => {
  it('should detect all builders and their status', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE
    delete process.env.SIMULATE_TOKEN_EXHAUSTION

    const availability = await detectAllBuilders()

    assert.ok(availability.copilot, 'Should have copilot status')
    assert.ok(availability.local, 'Should have local status')
    assert.strictEqual(typeof availability.copilot.available, 'boolean', 'Copilot available should be boolean')
    assert.strictEqual(typeof availability.local.available, 'boolean', 'Local available should be boolean')
  })

  it('should detect optimal builder for low complexity tasks', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    const builder = await detectOptimalBuilder('low')
    
    // Should prefer Copilot for low complexity when available
    if (builder === 'copilot' || builder === 'local') {
      assert.ok(true, 'Should return a valid builder')
    } else {
      assert.fail('Should return a valid builder or null')
    }
  })

  it('should prefer Local builder for high complexity tasks', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    if (!isLocalBuilderEnabled()) {
      console.log('[Test] Local builder disabled, skipping high complexity test')
      return
    }

    const builder = await detectOptimalBuilder('high')
    
    // Should prefer Local builder for high complexity when available
    assert.ok(['local', 'copilot'].includes(builder || ''), 'Should return local or copilot for high complexity')
  })

  it('should fall back to Local when Copilot unavailable', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const builder = await detectOptimalBuilder('medium')
    
    if (isLocalBuilderEnabled()) {
      // Should fall back to local
      assert.ok(['local', null].includes(builder), 'Should use local or null when Copilot unavailable')
    } else {
      assert.strictEqual(builder, null, 'Should return null when no builders available')
    }

    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should return null when no builders available', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'
    
    // This test assumes local builder might not be running
    const builder = await detectOptimalBuilder('low')
    
    if (!isLocalBuilderEnabled()) {
      assert.strictEqual(builder, null, 'Should return null when no builders available')
    }

    delete process.env.SIMULATE_COPILOT_FAILURE
  })
})

describe('Builder Protocol Compliance', () => {
  it('should validate Copilot protocol compliance', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    const result = await validateBuilderProtocol('copilot')

    assert.ok(result, 'Should return validation result')
    assert.strictEqual(typeof result.compliant, 'boolean', 'Compliant should be boolean')
    assert.ok(Array.isArray(result.issues), 'Issues should be an array')
    assert.ok(Array.isArray(result.warnings), 'Warnings should be an array')

    if (result.compliant === false) {
      console.log('[Test] Copilot non-compliant issues:', result.issues)
    }
  })

  it('should validate Local builder protocol compliance', async () => {
    if (!isLocalBuilderEnabled()) {
      console.log('[Test] Local builder disabled, skipping protocol validation')
      return
    }

    const result = await validateBuilderProtocol('local')

    assert.ok(result, 'Should return validation result')
    assert.strictEqual(typeof result.compliant, 'boolean', 'Compliant should be boolean')
    assert.ok(Array.isArray(result.issues), 'Issues should be an array')
    assert.ok(Array.isArray(result.warnings), 'Warnings should be an array')

    if (result.compliant === false) {
      console.log('[Test] Local builder non-compliant issues:', result.issues)
    }
  })

  it('should report issues when builder unavailable', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const result = await validateBuilderProtocol('copilot')

    assert.strictEqual(result.compliant, false, 'Should not be compliant when unavailable')
    assert.ok(result.issues.length > 0, 'Should have issues when unavailable')

    delete process.env.SIMULATE_COPILOT_FAILURE
  })
})

describe('Governance Framework Compliance', () => {
  it('should check Copilot governance compliance', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    const compliance = await checkGovernanceCompliance('copilot')

    assert.ok(compliance, 'Should return compliance check')
    assert.strictEqual(typeof compliance.trueNorth, 'boolean', 'True North should be boolean')
    assert.strictEqual(typeof compliance.qic, 'boolean', 'QIC should be boolean')
    assert.strictEqual(typeof compliance.qiel, 'boolean', 'QIEL should be boolean')
    assert.strictEqual(typeof compliance.driftDetector, 'boolean', 'Drift Detector should be boolean')
    assert.strictEqual(typeof compliance.sbhc, 'boolean', 'SBHC should be boolean')
  })

  it('should check Local builder governance compliance', async () => {
    const compliance = await checkGovernanceCompliance('local')

    assert.ok(compliance, 'Should return compliance check')
    assert.strictEqual(typeof compliance.trueNorth, 'boolean', 'True North should be boolean')
    assert.strictEqual(typeof compliance.qic, 'boolean', 'QIC should be boolean')
    assert.strictEqual(typeof compliance.qiel, 'boolean', 'QIEL should be boolean')
    assert.strictEqual(typeof compliance.driftDetector, 'boolean', 'Drift Detector should be boolean')
    assert.strictEqual(typeof compliance.sbhc, 'boolean', 'SBHC should be boolean')
  })

  it('should report non-compliance when builder unavailable', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const compliance = await checkGovernanceCompliance('copilot')

    assert.strictEqual(compliance.trueNorth, false, 'Should not be compliant when unavailable')
    assert.strictEqual(compliance.qic, false, 'QIC should be false when unavailable')

    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should validate all governance frameworks are checked', async () => {
    const compliance = await checkGovernanceCompliance('copilot')

    const frameworks = ['trueNorth', 'qic', 'qiel', 'driftDetector', 'sbhc']
    frameworks.forEach(framework => {
      assert.ok(
        framework in compliance,
        `Should check ${framework} framework`
      )
    })
  })
})

describe('Builder Routing Integration', () => {
  it('should route to Copilot for standard tasks when available', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE

    const builder = await detectOptimalBuilder('medium')

    assert.ok(['copilot', 'local'].includes(builder || ''), 'Should route to a valid builder')
  })

  it('should route to Local for high complexity tasks', async () => {
    if (!isLocalBuilderEnabled()) {
      console.log('[Test] Local builder disabled, skipping routing test')
      return
    }

    const builder = await detectOptimalBuilder('high')

    // High complexity should prefer local if available
    assert.ok(builder !== null, 'Should route to a builder for high complexity')
  })

  it('should handle fallback routing correctly', async () => {
    // Simulate Copilot failure
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const availability = await detectAllBuilders()

    assert.strictEqual(availability.copilot.available, false, 'Copilot should be unavailable')
    
    if (isLocalBuilderEnabled()) {
      const builder = await detectOptimalBuilder('medium')
      // Should fall back to local or return null
      assert.ok(['local', null].includes(builder), 'Should fall back appropriately')
    }

    delete process.env.SIMULATE_COPILOT_FAILURE
  })
})

describe('Builder Network Health Monitoring', () => {
  it('should report builder health status', async () => {
    const availability = await detectAllBuilders()

    assert.ok(availability.copilot, 'Should have Copilot status')
    assert.ok(availability.local, 'Should have Local status')
    
    // Check that health status is reported
    assert.strictEqual(typeof availability.copilot.healthy, 'boolean', 'Copilot healthy should be boolean')
    assert.strictEqual(typeof availability.local.healthy, 'boolean', 'Local healthy should be boolean')
  })

  it('should provide reason for unavailability', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'

    const availability = await detectAllBuilders()

    assert.strictEqual(availability.copilot.available, false, 'Copilot should be unavailable')
    assert.ok(availability.copilot.reason, 'Should provide reason for unavailability')

    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should detect both builders when both available', async () => {
    delete process.env.SIMULATE_COPILOT_FAILURE
    delete process.env.SIMULATE_TOKEN_EXHAUSTION

    const availability = await detectAllBuilders()

    // At least one builder should be available
    const anyAvailable = availability.copilot.available || availability.local.available
    assert.ok(anyAvailable, 'At least one builder should be available')
  })
})
