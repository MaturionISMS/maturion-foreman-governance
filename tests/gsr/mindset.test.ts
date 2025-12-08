/**
 * Governance-First Mindset Tests
 * 
 * Tests for the Governance-First Mindset module that enforces:
 * - Zero-Tolerance doctrine
 * - No QA manipulation
 * - Self-correction
 * - Auditor-first identity
 * - Governance memory supremacy
 * - No partial QA acceptance
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  governanceFirstMindset,
  validateMindsetCompliance,
  FORBIDDEN_ACTIONS
} from '@/lib/foreman/governance/mindset'

describe('Governance-First Mindset - Core Identity', () => {
  it('should return governance stance message', () => {
    const stance = governanceFirstMindset.getGovernanceStance()
    
    assert.ok(stance.includes('Governance-First'))
    assert.ok(stance.includes('QA is sacrosanct'))
    assert.ok(stance.includes('100% correctness is non-negotiable'))
    assert.ok(stance.includes('Auditor and Governor'))
  })
  
  it('should have immutable rules', () => {
    const rules = governanceFirstMindset.getRules()
    
    assert.strictEqual(rules.zeroToleranceIsIdentity, true)
    assert.strictEqual(rules.neverModifyQAToPass, true)
    assert.strictEqual(rules.selfCorrectBeforeCorrectingBuilders, true)
    assert.strictEqual(rules.auditorNotDeveloper, true)
    assert.strictEqual(rules.governanceMemoryIsSupreme, true)
    assert.strictEqual(rules.neverAllowPartialQA, true)
    
    // Attempt to modify (should be prevented by TypeScript readonly)
    // This verifies the rules are designed to be immutable
    assert.ok(Object.isFrozen(rules))
  })
})

describe('Rule 1: Zero Tolerance is Identity', () => {
  it('should detect zero-tolerance violation when errors exist', () => {
    const result = governanceFirstMindset.isZeroToleranceViolation({
      hasErrors: true
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.reason.includes('Errors detected'))
    assert.ok(result.reason.includes('Zero-Tolerance Violation'))
  })
  
  it('should detect zero-tolerance violation when warnings exist', () => {
    const result = governanceFirstMindset.isZeroToleranceViolation({
      hasWarnings: true
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.reason.includes('Warnings detected'))
  })
  
  it('should detect zero-tolerance violation when drift exists', () => {
    const result = governanceFirstMindset.isZeroToleranceViolation({
      hasDrift: true
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.reason.includes('Drift detected'))
  })
  
  it('should detect zero-tolerance violation when failures exist', () => {
    const result = governanceFirstMindset.isZeroToleranceViolation({
      hasFailures: true
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.reason.includes('Failures detected'))
  })
  
  it('should pass when no violations exist', () => {
    const result = governanceFirstMindset.isZeroToleranceViolation({
      hasErrors: false,
      hasWarnings: false,
      hasDrift: false,
      hasFailures: false
    })
    
    assert.strictEqual(result.violation, false)
  })
})

describe('Rule 2: Never Modify QA to Pass', () => {
  it('should detect forbidden action: edit error patterns', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Edit error pattern to allow this warning'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('FORBIDDEN ACTION DETECTED'))
    assert.ok(result.reason.includes('Editing error patterns'))
  })
  
  it('should detect forbidden action: remove test files', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Remove test file that is failing'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Removing test files'))
  })
  
  it('should detect forbidden action: exclude from strict mode', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Exclude this folder from strict mode'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Excluding folders from strict mode'))
  })
  
  it('should detect forbidden action: weaken tsconfig', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Weaken tsconfig strict settings'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Weakening tsconfig'))
  })
  
  it('should detect forbidden action: normalize errors', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Normalize this error as acceptable'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Normalizing away errors'))
  })
  
  it('should detect forbidden action: skip validation', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Skip validation step for speed'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Skipping validation'))
  })
  
  it('should detect forbidden action: add whitelist', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Add whitelist for this failure'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Adding new whitelists'))
  })
  
  it('should detect forbidden action: bypass QA', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Bypass QA check for this PR'
    )
    
    assert.strictEqual(result.forbidden, true)
    assert.ok(result.reason.includes('Attempting to bypass QA'))
  })
  
  it('should allow valid governance actions', () => {
    const result = governanceFirstMindset.isForbiddenAction(
      'Validate QA results against governance rules'
    )
    
    assert.strictEqual(result.forbidden, false)
  })
})

describe('Rule 3: Self-Correct Before Correcting Builders', () => {
  it('should detect need for self-correction when forbidden action attempted', () => {
    const result = governanceFirstMindset.requiresSelfCorrection({
      attemptedForbiddenAction: true
    })
    
    assert.strictEqual(result.needsCorrection, true)
    assert.ok(result.violations.length > 0)
    assert.ok(result.violations[0].includes('regenerate reasoning pattern'))
  })
  
  it('should detect need for self-correction when governance bypassed', () => {
    const result = governanceFirstMindset.requiresSelfCorrection({
      bypassedGovernance: true
    })
    
    assert.strictEqual(result.needsCorrection, true)
    assert.ok(result.violations[0].includes('update governance enforcement'))
  })
  
  it('should detect need for self-correction when QA softened', () => {
    const result = governanceFirstMindset.requiresSelfCorrection({
      softenedQA: true
    })
    
    assert.strictEqual(result.needsCorrection, true)
    assert.ok(result.violations[0].includes('restore strict enforcement'))
  })
  
  it('should not require correction when behavior is aligned', () => {
    const result = governanceFirstMindset.requiresSelfCorrection({
      attemptedForbiddenAction: false,
      bypassedGovernance: false,
      softenedQA: false
    })
    
    assert.strictEqual(result.needsCorrection, false)
    assert.strictEqual(result.violations.length, 0)
  })
})

describe('Rule 4: Auditor Not Developer', () => {
  it('should recognize auditor actions as valid', () => {
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Enforce QA rules'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Validate compliance'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Audit build results'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Verify correctness'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Check architecture'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Certify build'), true)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Reject invalid PR'), true)
  })
  
  it('should recognize developer actions as invalid for Foreman', () => {
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Code the feature'), false)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Implement the API'), false)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Write the component'), false)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Build the UI'), false)
    assert.strictEqual(governanceFirstMindset.isActingAsAuditor('Create the function'), false)
  })
})

describe('Rule 5: Governance Memory is Supreme', () => {
  it('should detect violation when memory not loaded', () => {
    const result = governanceFirstMindset.isGovernanceMemoryRespected({
      memoryLoaded: false,
      governanceRulesApplied: true,
      driftMonitored: true
    })
    
    assert.strictEqual(result.respected, false)
    assert.ok(result.violations.includes('Governance memory not loaded before action'))
  })
  
  it('should detect violation when rules not applied', () => {
    const result = governanceFirstMindset.isGovernanceMemoryRespected({
      memoryLoaded: true,
      governanceRulesApplied: false,
      driftMonitored: true
    })
    
    assert.strictEqual(result.respected, false)
    assert.ok(result.violations.includes('Governance rules not applied to decision'))
  })
  
  it('should detect violation when drift not monitored', () => {
    const result = governanceFirstMindset.isGovernanceMemoryRespected({
      memoryLoaded: true,
      governanceRulesApplied: true,
      driftMonitored: false
    })
    
    assert.strictEqual(result.respected, false)
    assert.ok(result.violations.includes('Drift monitoring not executed'))
  })
  
  it('should pass when all governance memory requirements met', () => {
    const result = governanceFirstMindset.isGovernanceMemoryRespected({
      memoryLoaded: true,
      governanceRulesApplied: true,
      driftMonitored: true
    })
    
    assert.strictEqual(result.respected, true)
    assert.strictEqual(result.violations.length, 0)
  })
})

describe('Rule 6: No Partial QA', () => {
  it('should detect violation when tests are not 100% passing', () => {
    const result = governanceFirstMindset.isPartialQAViolation({
      totalTests: 10,
      passedTests: 9,
      failedTests: 1
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.reason.includes('Partial QA is NOT acceptable'))
    assert.ok(result.blockingIssues.length > 0)
  })
  
  it('should detect violation when warnings exist', () => {
    const result = governanceFirstMindset.isPartialQAViolation({
      warnings: 3
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.blockingIssues.some(i => i.includes('Warnings: 3')))
  })
  
  it('should detect violation when drift exists', () => {
    const result = governanceFirstMindset.isPartialQAViolation({
      drift: 2
    })
    
    assert.strictEqual(result.violation, true)
    assert.ok(result.blockingIssues.some(i => i.includes('Drift detected: 2')))
  })
  
  it('should pass when QA is 100% green', () => {
    const result = governanceFirstMindset.isPartialQAViolation({
      totalTests: 10,
      passedTests: 10,
      failedTests: 0,
      warnings: 0,
      drift: 0
    })
    
    assert.strictEqual(result.violation, false)
    assert.strictEqual(result.blockingIssues.length, 0)
  })
})

describe('Mindset Compliance Validation', () => {
  it('should pass compliance when all rules satisfied', () => {
    const result = validateMindsetCompliance({
      action: 'Validate build completion',
      qaStatus: {
        totalTests: 10,
        passedTests: 10,
        failedTests: 0,
        warnings: 0
      },
      governanceContext: {
        memoryLoaded: true,
        governanceRulesApplied: true,
        driftMonitored: true
      },
      stateContext: {
        hasErrors: false,
        hasWarnings: false,
        hasFailures: false
      }
    })
    
    assert.strictEqual(result.compliant, true)
    assert.strictEqual(result.canProceed, true)
    assert.strictEqual(result.violations.length, 0)
    assert.strictEqual(result.blockingIssues.length, 0)
  })
  
  it('should fail compliance when partial QA detected', () => {
    const result = validateMindsetCompliance({
      qaStatus: {
        totalTests: 10,
        passedTests: 9,
        failedTests: 1
      }
    })
    
    assert.strictEqual(result.compliant, false)
    assert.strictEqual(result.canProceed, false)
    assert.ok(result.violations.length > 0)
    assert.ok(result.blockingIssues.length > 0)
  })
  
  it('should fail compliance when forbidden action attempted', () => {
    const result = validateMindsetCompliance({
      action: 'Edit error patterns to pass build'
    })
    
    assert.strictEqual(result.compliant, false)
    assert.ok(result.violations.some(v => v.includes('FORBIDDEN ACTION')))
  })
  
  it('should fail compliance when zero-tolerance violated', () => {
    const result = validateMindsetCompliance({
      stateContext: {
        hasErrors: true,
        hasWarnings: true
      }
    })
    
    assert.strictEqual(result.compliant, false)
    assert.ok(result.violations.some(v => v.includes('Zero-Tolerance Violation')))
  })
  
  it('should require self-correction when needed', () => {
    const result = validateMindsetCompliance({
      behaviorContext: {
        attemptedForbiddenAction: true,
        bypassedGovernance: true
      }
    })
    
    assert.strictEqual(result.requiresSelfCorrection, true)
    assert.strictEqual(result.compliant, false)
  })
})
