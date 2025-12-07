/**
 * Quality Integrity Contract (QIC) Loader Tests
 * Tests for QIC rules loading and enforcement
 */

import { describe, test } from 'node:test'
import * as assert from 'node:assert'
import {
  loadQICRules,
  validateQICCompliance,
  parseBuildLogs,
  getQICEnforcementStatus,
  BUILD_ERROR_PATTERNS,
  QIC_VERSION,
} from '../../lib/foreman/governance/qic-loader'

describe('QIC Loader', () => {
  test('should load QIC rules with correct version', async () => {
    const qicConfig = await loadQICRules()
    
    assert.strictEqual(qicConfig.version, QIC_VERSION, 'QIC version should match')
    assert.strictEqual(qicConfig.appliesTo, 'all-apps', 'QIC should apply to all apps')
    assert.strictEqual(qicConfig.enforcedBy, 'qa-builder', 'QIC should be enforced by qa-builder')
    
    console.log('✓ QIC rules loaded with correct configuration')
  })

  test('should enable all QIC requirements', async () => {
    const qicConfig = await loadQICRules()
    
    assert.strictEqual(qicConfig.buildIntegrityEnabled, true, 'QIC-1 should be enabled')
    assert.strictEqual(qicConfig.lintIntegrityEnabled, true, 'QIC-2 should be enabled')
    assert.strictEqual(qicConfig.runtimeIntegrityEnabled, true, 'QIC-3 should be enabled')
    assert.strictEqual(qicConfig.deploymentSimulationEnabled, true, 'QIC-4 should be enabled')
    assert.strictEqual(qicConfig.silentFailurePreventionEnabled, true, 'QIC-5 should be enabled')
    assert.strictEqual(qicConfig.governanceMemoryIntegrationEnabled, true, 'QIC-6 should be enabled')
    
    console.log('✓ All QIC requirements are enabled')
  })

  test('should validate QIC compliance without errors', async () => {
    const qicConfig = await loadQICRules()
    
    // Should not throw
    assert.doesNotThrow(() => {
      validateQICCompliance(qicConfig)
    }, 'QIC compliance validation should not throw for valid config')
    
    console.log('✓ QIC compliance validated successfully')
  })

  test('should return correct QIC enforcement status', async () => {
    const qicConfig = await loadQICRules()
    const status = getQICEnforcementStatus(qicConfig)
    
    assert.strictEqual(status['QIC-1: Build Integrity'], true, 'QIC-1 should be enforced')
    assert.strictEqual(status['QIC-2: Lint Integrity'], true, 'QIC-2 should be enforced')
    assert.strictEqual(status['QIC-3: Runtime Integrity'], true, 'QIC-3 should be enforced')
    assert.strictEqual(status['QIC-4: Deployment Simulation'], true, 'QIC-4 should be enforced')
    assert.strictEqual(status['QIC-5: Silent Failure Prevention'], true, 'QIC-5 should be enforced')
    assert.strictEqual(status['QIC-6: Governance Memory Integration'], true, 'QIC-6 should be enforced')
    assert.strictEqual(status['QIC-7: Auto-Propagation'], true, 'QIC-7 should be enforced')
    
    console.log('✓ All QIC enforcement statuses are correct')
  })
})

describe('Build Log Parsing (QIC-1)', () => {
  test('should detect ERR pattern in build logs', () => {
    const logOutput = 'Building project...\nERR Something went wrong\nBuild completed'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.check, 'build_integrity', 'Check should be build_integrity')
    assert.strictEqual(result.status, 'failed', 'Status should be failed')
    assert.ok(result.message.includes('error'), 'Message should mention errors')
    assert.ok(result.errors, 'Errors should be present')
    
    console.log('✓ ERR pattern detected in build logs')
  })

  test('should detect ERROR pattern in build logs', () => {
    const logOutput = 'Building project...\nERROR: Build process failed\nExiting...'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'failed', 'Status should be failed for ERROR pattern')
    
    console.log('✓ ERROR pattern detected in build logs')
  })

  test('should detect TypeError in build logs', () => {
    const logOutput = 'Running tests...\nTypeError: Cannot read property of undefined\nTest failed'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'failed', 'Status should be failed for TypeError')
    
    console.log('✓ TypeError pattern detected in build logs')
  })

  test('should detect ReferenceError in build logs', () => {
    const logOutput = 'Executing code...\nReferenceError: variable is not defined\nExecution failed'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'failed', 'Status should be failed for ReferenceError')
    
    console.log('✓ ReferenceError pattern detected in build logs')
  })

  test('should detect "Failed to compile" in build logs', () => {
    const logOutput = 'Compiling TypeScript...\nFailed to compile\nAborting...'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'failed', 'Status should be failed for "Failed to compile"')
    
    console.log('✓ "Failed to compile" pattern detected in build logs')
  })

  test('should detect "Build failed" in build logs', () => {
    const logOutput = 'Starting build...\nBuild failed with errors\nProcess terminated'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'failed', 'Status should be failed for "Build failed"')
    
    console.log('✓ "Build failed" pattern detected in build logs')
  })

  test('should pass for clean build logs', () => {
    const logOutput = 'Building project...\nCompiling sources...\nBuild successful\nAll tests passed'
    const result = parseBuildLogs(logOutput)
    
    assert.strictEqual(result.status, 'passed', 'Status should be passed for clean build')
    assert.strictEqual(result.check, 'build_integrity', 'Check should be build_integrity')
    
    console.log('✓ Clean build logs pass validation')
  })

  test('should not detect ERROR as part of another word', () => {
    const logOutput = 'Building project...\nDetecting ERRORHANDLER module\nBuild successful'
    const result = parseBuildLogs(logOutput)
    
    // With word boundary patterns, ERRORHANDLER should NOT match ERROR
    assert.strictEqual(result.status, 'passed', 'Status should be passed when ERROR is part of another word')
    
    console.log('✓ ERROR as part of ERRORHANDLER correctly ignored')
  })

  test('should not detect ERR as part of ERRATIC', () => {
    const logOutput = 'Building project...\nERRATIC behavior detected in logs\nBuild successful'
    const result = parseBuildLogs(logOutput)
    
    // With word boundary patterns, ERRATIC should NOT match ERR
    assert.strictEqual(result.status, 'passed', 'Status should be passed when ERR is part of another word')
    
    console.log('✓ ERR as part of ERRATIC correctly ignored')
  })

  test('should have all required error patterns', () => {
    assert.ok(BUILD_ERROR_PATTERNS.length >= 6, 'Should have at least 6 error patterns')
    
    const patterns = BUILD_ERROR_PATTERNS.map(p => p.source)
    assert.ok(patterns.some(p => p.includes('ERR')), 'Should have ERR pattern')
    assert.ok(patterns.some(p => p.includes('ERROR')), 'Should have ERROR pattern')
    assert.ok(patterns.some(p => p.includes('TypeError')), 'Should have TypeError pattern')
    assert.ok(patterns.some(p => p.includes('ReferenceError')), 'Should have ReferenceError pattern')
    assert.ok(patterns.some(p => p.includes('Failed to compile')), 'Should have Failed to compile pattern')
    assert.ok(patterns.some(p => p.includes('Build failed')), 'Should have Build failed pattern')
    
    console.log('✓ All required error patterns are present')
  })
})

describe('QIC Compliance Validation', () => {
  test('should throw error for non-compliant config', () => {
    const invalidConfig = {
      version: '1.0.0',
      buildIntegrityEnabled: false, // Non-compliant
      lintIntegrityEnabled: true,
      runtimeIntegrityEnabled: true,
      deploymentSimulationEnabled: true,
      silentFailurePreventionEnabled: true,
      governanceMemoryIntegrationEnabled: true,
      enforcedBy: 'qa-builder',
      appliesTo: 'all-apps',
    }
    
    assert.throws(() => {
      validateQICCompliance(invalidConfig)
    }, /buildIntegrityEnabled/, 'Should throw error for disabled build integrity')
    
    console.log('✓ Non-compliant config correctly rejected')
  })

  test('should throw error when lint integrity disabled', () => {
    const invalidConfig = {
      version: '1.0.0',
      buildIntegrityEnabled: true,
      lintIntegrityEnabled: false, // Non-compliant
      runtimeIntegrityEnabled: true,
      deploymentSimulationEnabled: true,
      silentFailurePreventionEnabled: true,
      governanceMemoryIntegrationEnabled: true,
      enforcedBy: 'qa-builder',
      appliesTo: 'all-apps',
    }
    
    assert.throws(() => {
      validateQICCompliance(invalidConfig)
    }, /lintIntegrityEnabled/, 'Should throw error for disabled lint integrity')
    
    console.log('✓ Lint integrity requirement enforced')
  })

  test('should throw error when governance memory disabled', () => {
    const invalidConfig = {
      version: '1.0.0',
      buildIntegrityEnabled: true,
      lintIntegrityEnabled: true,
      runtimeIntegrityEnabled: true,
      deploymentSimulationEnabled: true,
      silentFailurePreventionEnabled: true,
      governanceMemoryIntegrationEnabled: false, // Non-compliant
      enforcedBy: 'qa-builder',
      appliesTo: 'all-apps',
    }
    
    assert.throws(() => {
      validateQICCompliance(invalidConfig)
    }, /governanceMemoryIntegrationEnabled/, 'Should throw error for disabled governance memory')
    
    console.log('✓ Governance memory integration requirement enforced')
  })
})
