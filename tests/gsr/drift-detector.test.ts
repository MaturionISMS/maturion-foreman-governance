/**
 * Foreman Governance Drift Detector Tests
 * 
 * Tests for detecting when Foreman's behavior drifts from Governance-First principles
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  foremanDriftDetector,
  detectGovernanceDrift
} from '@/lib/foreman/governance/drift-detector'

describe('Drift Detection - Skipped Checks', () => {
  it('should detect when Foreman skips a check', () => {
    const result = foremanDriftDetector.detectSkippedCheck({
      checkName: 'TypeScript Compilation',
      reason: 'To save time',
      skipped: true
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'skipped_check')
    assert.strictEqual(result.severity, 'critical')
    assert.ok(result.description.includes('skipped check'))
  })
  
  it('should not detect drift when check is not skipped', () => {
    const result = foremanDriftDetector.detectSkippedCheck({
      checkName: 'TypeScript Compilation',
      skipped: false
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Softened Rules', () => {
  it('should detect when rule is weakened (boolean)', () => {
    const result = foremanDriftDetector.detectSoftenedRule({
      ruleName: 'strictNullChecks',
      originalValue: true,
      newValue: false,
      justification: 'Too many errors'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'softened_rule')
    assert.strictEqual(result.severity, 'critical')
    assert.ok(result.description.includes('soften rule'))
  })
  
  it('should detect when threshold is lowered', () => {
    const result = foremanDriftDetector.detectSoftenedRule({
      ruleName: 'coverage',
      originalValue: 80,
      newValue: 60,
      justification: 'Hard to achieve 80%'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'softened_rule')
  })
  
  it('should not detect drift when rule is strengthened', () => {
    const result = foremanDriftDetector.detectSoftenedRule({
      ruleName: 'coverage',
      originalValue: 60,
      newValue: 80
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
  
  it('should not detect drift when rule unchanged', () => {
    const result = foremanDriftDetector.detectSoftenedRule({
      ruleName: 'strictNullChecks',
      originalValue: true,
      newValue: true
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Normalized Errors', () => {
  it('should detect when Foreman normalizes an error', () => {
    const result = foremanDriftDetector.detectNormalizedError({
      errorType: 'Type mismatch',
      normalizedAs: 'Warning',
      reason: 'Not critical for this feature'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'normalized_error')
    assert.strictEqual(result.severity, 'high')
    assert.ok(result.description.includes('normalized error'))
  })
})

describe('Drift Detection - Bypassed QA', () => {
  it('should detect when QA is bypassed', () => {
    const result = foremanDriftDetector.detectBypassedQA({
      qaCheckName: 'Integration Tests',
      bypassed: true,
      reason: 'Tests are slow'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'bypassed_qa')
    assert.strictEqual(result.severity, 'critical')
    assert.ok(result.description.includes('bypass QA'))
  })
  
  it('should not detect drift when QA is not bypassed', () => {
    const result = foremanDriftDetector.detectBypassedQA({
      qaCheckName: 'Integration Tests',
      bypassed: false
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Reduced Strictness', () => {
  it('should detect when strictness is reduced', () => {
    const result = foremanDriftDetector.detectReducedStrictness({
      configFile: 'tsconfig.json',
      setting: 'strict',
      wasStrict: true,
      isStrict: false,
      reason: 'Too many type errors'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'reduced_strictness')
    assert.strictEqual(result.severity, 'critical')
  })
  
  it('should not detect drift when strictness is increased', () => {
    const result = foremanDriftDetector.detectReducedStrictness({
      configFile: 'tsconfig.json',
      setting: 'strict',
      wasStrict: false,
      isStrict: true
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Whitelisted Failures', () => {
  it('should detect when failure is whitelisted', () => {
    const result = foremanDriftDetector.detectWhitelistedFailure({
      failureType: 'Deprecated API warning',
      whitelisted: true,
      reason: 'Will fix later'
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'whitelisted_failure')
    assert.strictEqual(result.severity, 'critical')
    assert.ok(result.description.includes('whitelist failure'))
  })
  
  it('should not detect drift when no whitelisting', () => {
    const result = foremanDriftDetector.detectWhitelistedFailure({
      failureType: 'Deprecated API warning',
      whitelisted: false
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Partial QA Acceptance', () => {
  it('should detect when partial QA is accepted', () => {
    const result = foremanDriftDetector.detectAcceptedPartialQA({
      totalTests: 100,
      passedTests: 98,
      failedTests: 2,
      accepted: true
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'accepted_partial_qa')
    assert.strictEqual(result.severity, 'critical')
    assert.ok(result.description.includes('98/100 passing'))
  })
  
  it('should not detect drift when 100% QA required', () => {
    const result = foremanDriftDetector.detectAcceptedPartialQA({
      totalTests: 100,
      passedTests: 100,
      failedTests: 0,
      accepted: true
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
  
  it('should not detect drift when partial QA is rejected', () => {
    const result = foremanDriftDetector.detectAcceptedPartialQA({
      totalTests: 100,
      passedTests: 98,
      failedTests: 2,
      accepted: false
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Forbidden Actions', () => {
  it('should detect attempt to edit error patterns', () => {
    const result = foremanDriftDetector.detectForbiddenAction(
      'Edit error pattern to allow this warning'
    )
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'attempted_forbidden_action')
    assert.strictEqual(result.severity, 'critical')
  })
  
  it('should detect attempt to remove tests', () => {
    const result = foremanDriftDetector.detectForbiddenAction(
      'Remove test that is failing'
    )
    
    assert.strictEqual(result.driftDetected, true)
  })
  
  it('should not detect drift for valid actions', () => {
    const result = foremanDriftDetector.detectForbiddenAction(
      'Validate test results against requirements'
    )
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Ignored Governance Memory', () => {
  it('should detect when memory not loaded', () => {
    const result = foremanDriftDetector.detectIgnoredGovernanceMemory({
      memoryLoaded: false,
      rulesApplied: true,
      driftMonitored: true
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'ignored_governance_memory')
    assert.ok(result.description.includes('memory not loaded'))
  })
  
  it('should detect when rules not applied', () => {
    const result = foremanDriftDetector.detectIgnoredGovernanceMemory({
      memoryLoaded: true,
      rulesApplied: false,
      driftMonitored: true
    })
    
    assert.strictEqual(result.driftDetected, true)
    assert.ok(result.description.includes('rules not applied'))
  })
  
  it('should not detect drift when all requirements met', () => {
    const result = foremanDriftDetector.detectIgnoredGovernanceMemory({
      memoryLoaded: true,
      rulesApplied: true,
      driftMonitored: true
    })
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Drift Detection - Acting as Developer', () => {
  it('should detect when Foreman acts as developer', () => {
    const result = foremanDriftDetector.detectActedAsDeveloper(
      'Code the new feature'
    )
    
    assert.strictEqual(result.driftDetected, true)
    assert.strictEqual(result.driftType, 'acted_as_developer')
    assert.ok(result.description.includes('acted as developer'))
  })
  
  it('should not detect drift for auditor actions', () => {
    const result = foremanDriftDetector.detectActedAsDeveloper(
      'Validate the code quality'
    )
    
    assert.strictEqual(result.driftDetected, false)
  })
})

describe('Comprehensive Drift Detection', () => {
  it('should detect multiple types of drift in one check', async () => {
    const results = await detectGovernanceDrift({
      checkSkipped: {
        checkName: 'Lint',
        skipped: true,
        reason: 'Too slow'
      },
      partialQAAccepted: {
        totalTests: 10,
        passedTests: 9,
        failedTests: 1,
        accepted: true
      },
      action: 'Bypass QA for speed'
    })
    
    assert.ok(results.length >= 2) // Should detect multiple drift types
    assert.ok(results.every(r => r.driftDetected))
  })
  
  it('should detect no drift when behavior is aligned', async () => {
    const results = await detectGovernanceDrift({
      governanceMemory: {
        memoryLoaded: true,
        rulesApplied: true,
        driftMonitored: true
      },
      action: 'Validate governance compliance'
    })
    
    assert.strictEqual(results.length, 0)
  })
})

describe('Drift Logging and Resolution', () => {
  it('should maintain drift detection log', () => {
    foremanDriftDetector.detectSkippedCheck({
      checkName: 'Test Check',
      skipped: true
    })
    
    const log = foremanDriftDetector.getDriftLog()
    assert.ok(log.length > 0)
    
    const latestEntry = log[log.length - 1]
    assert.strictEqual(latestEntry.driftType, 'skipped_check')
    assert.strictEqual(latestEntry.resolved, false)
  })
  
  it('should allow marking drift as resolved', () => {
    const result = foremanDriftDetector.detectBypassedQA({
      qaCheckName: 'Unit Tests',
      bypassed: true
    })
    
    const log = foremanDriftDetector.getDriftLog()
    const entry = log.find(e => e.driftType === 'bypassed_qa')
    
    if (entry) {
      foremanDriftDetector.markDriftResolved('bypassed_qa', entry.timestamp)
      
      const updatedLog = foremanDriftDetector.getDriftLog()
      const resolvedEntry = updatedLog.find(
        e => e.driftType === 'bypassed_qa' && e.timestamp === entry.timestamp
      )
      
      assert.strictEqual(resolvedEntry?.resolved, true)
    }
  })
})
