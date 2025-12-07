/**
 * Governance Supremacy Rule (GSR) Tests
 * 
 * Tests for GSR enforcement across all phases:
 * - GSR-1: Governance Supremacy Override
 * - GSR-2: Build Completion Rule
 * - GSR-3: Automatic Regression Handling
 * - GSR-4: Watchdog QA Enforcement
 * - GSR-5: Reasoning Stack Integration
 * - GSR-6: UI Review Requirement
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  validateGovernanceSupremacy,
  validateBuildCompletion,
  classifyFailure,
  enforceWatchdogQA,
  validateGovernanceAtPhase,
  generateGSRReport,
  GSRBlockingIssue
} from '@/lib/foreman/governance/gsr-enforcement'
import { QAResult } from '@/types/builder'
import { BuildSequence } from '@/types/build-sequence'

describe('GSR-1: Governance Supremacy Override', () => {
  it('should PASS when 100% QA passing', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'passed', message: 'All tests passed' },
      { check: 'build', status: 'passed', message: 'Build successful' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.qaStatus, 'green')
    assert.strictEqual(result.uiReviewReady, true)
    assert.strictEqual(result.blockingIssues.length, 0)
    assert.strictEqual(result.governanceViolations.length, 0)
  })
  
  it('should FAIL when ANY test fails (even 1 out of 100)', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'failed', message: 'Test failed' },
      { check: 'build', status: 'passed', message: 'Build successful' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.qaStatus, 'partial')
    assert.strictEqual(result.uiReviewReady, false)
    assert.strictEqual(result.blockingIssues.length, 1)
    assert.ok(result.governanceViolations.length > 0)
    assert.ok(result.reason.includes('Partial pass'))
  })
  
  it('should reject partial passes (301/303)', () => {
    const qaResults: QAResult[] = []
    
    // 301 passing checks
    for (let i = 0; i < 301; i++) {
      qaResults.push({ check: `test_${i}`, status: 'passed', message: 'Passed' })
    }
    
    // 2 failing checks (pre-existing)
    qaResults.push({ check: 'legacy_test_1', status: 'failed', message: 'Pre-existing failure' })
    qaResults.push({ check: 'legacy_test_2', status: 'failed', message: 'Historical failure' })
    
    const result = validateGovernanceSupremacy(qaResults)
    
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.qaStatus, 'partial')
    assert.strictEqual(result.blockingIssues.length, 2)
    assert.ok(result.governanceViolations.some(v => v.includes('301/303')))
  })
  
  it('should treat warnings as failures', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'build', status: 'warning', message: 'Unused variable warning' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.uiReviewReady, false)
    assert.strictEqual(result.blockingIssues.length, 1)
    assert.strictEqual(result.blockingIssues[0].type, 'lint_error')
  })
  
  it('should not care if failures are pre-existing', () => {
    const qaResults: QAResult[] = [
      { check: 'test', status: 'failed', message: 'Pre-existing test failure' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    // GSR doesn't care if it's pre-existing
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.blockingIssues[0].preExisting, false) // GSR marks as false
  })
})

describe('GSR-2: Build Completion Rule', () => {
  it('should allow build completion when all criteria met', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'passed', message: 'All tests passed' }
    ]
    
    const buildSequence: BuildSequence = {
      id: 'seq_test',
      organisationId: 'org_test',
      status: 'running_qa',
      architectureGaps: [],
      tasks: [],
      qaResults,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = validateBuildCompletion(buildSequence, qaResults)
    
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.canProceed, true)
    assert.ok(result.reason.includes('satisfied'))
  })
  
  it('should block build completion with ANY failure', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'failed', message: 'Test failed' }
    ]
    
    const buildSequence: BuildSequence = {
      id: 'seq_test',
      organisationId: 'org_test',
      status: 'running_qa',
      architectureGaps: [],
      tasks: [],
      qaResults,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = validateBuildCompletion(buildSequence, qaResults)
    
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.canProceed, false)
    assert.ok(result.reason.includes('VIOLATED'))
  })
})

describe('GSR-3: Automatic Regression Handling', () => {
  it('should classify architecture mismatch', () => {
    const issue: GSRBlockingIssue = {
      type: 'test_failure',
      severity: 'critical',
      description: 'Architecture pattern violation detected in UserService',
      source: 'architecture_tests',
      preExisting: false,
      unrelated: false,
      minor: false,
      historical: false,
      outsidePRScope: false
    }
    
    const classification = classifyFailure(issue)
    
    assert.strictEqual(classification.category, 'architecture_mismatch')
    assert.strictEqual(classification.requiresArchitectureUpdate, true)
    assert.ok(classification.resolutionSteps.length > 0)
  })
  
  it('should classify code regression', () => {
    const issue: GSRBlockingIssue = {
      type: 'test_failure',
      severity: 'high',
      description: 'UserService.createUser should validate email format',
      source: 'unit_tests',
      preExisting: false,
      unrelated: false,
      minor: false,
      historical: false,
      outsidePRScope: false
    }
    
    const classification = classifyFailure(issue)
    
    assert.strictEqual(classification.category, 'code_regression')
    assert.ok(classification.resolutionSteps.some(s => s.includes('regression')))
  })
  
  it('should classify invalid test', () => {
    const issue: GSRBlockingIssue = {
      type: 'test_failure',
      severity: 'medium',
      description: 'Test has invalid assertion logic',
      source: 'test_validation',
      preExisting: false,
      unrelated: false,
      minor: false,
      historical: false,
      outsidePRScope: false
    }
    
    const classification = classifyFailure(issue)
    
    assert.strictEqual(classification.category, 'invalid_test')
    assert.strictEqual(classification.requiresQAUpdate, true)
    assert.strictEqual(classification.autoResolvable, true)
  })
  
  it('should classify legacy component', () => {
    const issue: GSRBlockingIssue = {
      type: 'test_failure',
      severity: 'low',
      description: 'Legacy API endpoint uses deprecated authentication',
      source: 'integration_tests',
      preExisting: false,
      unrelated: false,
      minor: false,
      historical: false,
      outsidePRScope: false
    }
    
    const classification = classifyFailure(issue)
    
    assert.strictEqual(classification.category, 'legacy_component')
    assert.strictEqual(classification.requiresArchitectureUpdate, true)
    assert.ok(classification.resolutionSteps.some(s => s.includes('migration')))
  })
})

describe('GSR-4: Watchdog QA Enforcement', () => {
  it('should allow handover when 100% QA passing', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'passed', message: 'All tests passed' }
    ]
    
    const result = enforceWatchdogQA(qaResults)
    
    assert.strictEqual(result.allowed, true)
    assert.ok(result.uiReviewMessage)
    assert.ok(result.uiReviewMessage.includes('UI is now safe to review'))
  })
  
  it('should block handover with ANY failure', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Lint passed' },
      { check: 'tests', status: 'failed', message: 'Test failed' }
    ]
    
    const result = enforceWatchdogQA(qaResults)
    
    assert.strictEqual(result.allowed, false)
    assert.strictEqual(result.uiReviewMessage, undefined)
    assert.ok(result.reason.includes('Partial pass'))
  })
  
  it('should block PR merging with partial pass', () => {
    const qaResults: QAResult[] = []
    
    // 99 passing
    for (let i = 0; i < 99; i++) {
      qaResults.push({ check: `test_${i}`, status: 'passed', message: 'Passed' })
    }
    
    // 1 failing
    qaResults.push({ check: 'final_test', status: 'failed', message: 'Failed' })
    
    const result = enforceWatchdogQA(qaResults)
    
    assert.strictEqual(result.allowed, false)
  })
})

describe('GSR-5: Reasoning Stack Integration', () => {
  it('should allow intent interpretation when no QA context', () => {
    const result = validateGovernanceAtPhase('intent', {
      userRequest: 'Build the dashboard'
    })
    
    assert.strictEqual(result.allowed, true)
  })
  
  it('should allow planning when no QA context', () => {
    const result = validateGovernanceAtPhase('planning', {
      userRequest: 'Build the dashboard'
    })
    
    assert.strictEqual(result.allowed, true)
  })
  
  it('should block QA verification without QA results', () => {
    const result = validateGovernanceAtPhase('qa_verification', {
      userRequest: 'Verify QA'
    })
    
    assert.strictEqual(result.allowed, false)
    assert.ok(result.reason.includes('required'))
  })
  
  it('should block build completion with failed QA', () => {
    const qaResults: QAResult[] = [
      { check: 'test', status: 'failed', message: 'Failed' }
    ]
    
    const result = validateGovernanceAtPhase('build_completion', {
      qaResults
    })
    
    assert.strictEqual(result.allowed, false)
    assert.strictEqual(result.governanceOverride, true)
  })
  
  it('should allow build completion with passing QA', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Passed' },
      { check: 'tests', status: 'passed', message: 'Passed' }
    ]
    
    const result = validateGovernanceAtPhase('build_completion', {
      qaResults
    })
    
    assert.strictEqual(result.allowed, true)
  })
})

describe('GSR-6: UI Review Requirement', () => {
  it('should provide UI review message when QA is green', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Passed' },
      { check: 'tests', status: 'passed', message: 'Passed' }
    ]
    
    const result = enforceWatchdogQA(qaResults)
    
    assert.strictEqual(result.allowed, true)
    assert.ok(result.uiReviewMessage)
    assert.ok(result.uiReviewMessage.includes('QA is green'))
    assert.ok(result.uiReviewMessage.includes('UI is now safe to review'))
  })
  
  it('should NOT provide UI review message when QA fails', () => {
    const qaResults: QAResult[] = [
      { check: 'tests', status: 'failed', message: 'Failed' }
    ]
    
    const result = enforceWatchdogQA(qaResults)
    
    assert.strictEqual(result.allowed, false)
    assert.strictEqual(result.uiReviewMessage, undefined)
  })
})

describe('GSR Report Generation', () => {
  it('should generate comprehensive report for failed build', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Passed' },
      { check: 'test_1', status: 'failed', message: 'UserService test failed' },
      { check: 'test_2', status: 'failed', message: 'Integration test failed' }
    ]
    
    const buildSequence: BuildSequence = {
      id: 'seq_test',
      organisationId: 'org_test',
      status: 'running_qa',
      architectureGaps: [],
      tasks: [],
      qaResults,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const report = generateGSRReport(qaResults, buildSequence)
    
    assert.ok(report.includes('Governance Supremacy Rule'))
    assert.ok(report.includes('FAILED'))
    assert.ok(report.includes('Blocking Issues'))
    assert.ok(report.includes('Resolution Steps'))
  })
  
  it('should generate approval report for passing build', () => {
    const qaResults: QAResult[] = [
      { check: 'lint', status: 'passed', message: 'Passed' },
      { check: 'tests', status: 'passed', message: 'Passed' }
    ]
    
    const buildSequence: BuildSequence = {
      id: 'seq_test',
      organisationId: 'org_test',
      status: 'running_qa',
      architectureGaps: [],
      tasks: [],
      qaResults,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const report = generateGSRReport(qaResults, buildSequence)
    
    assert.ok(report.includes('PASSED'))
    assert.ok(report.includes('Build Approved'))
    assert.ok(report.includes('UI is now safe to review'))
  })
})

describe('GSR Integration Scenarios', () => {
  it('should enforce zero-tolerance: 99.9% pass rate is still a failure', () => {
    const qaResults: QAResult[] = []
    
    // 999 passing checks
    for (let i = 0; i < 999; i++) {
      qaResults.push({ check: `test_${i}`, status: 'passed', message: 'Passed' })
    }
    
    // 1 failing check
    qaResults.push({ check: 'final_test', status: 'failed', message: 'Failed' })
    
    const result = validateGovernanceSupremacy(qaResults)
    
    assert.strictEqual(result.passed, false)
    assert.strictEqual(result.qaStatus, 'partial')
    assert.ok(result.governanceViolations.some(v => v.includes('999/1000')))
  })
  
  it('should enforce that pre-existing failures still block builds', () => {
    const qaResults: QAResult[] = [
      { check: 'new_test', status: 'passed', message: 'New test passed' },
      { check: 'old_test', status: 'failed', message: 'Pre-existing failure from 2023' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    // GSR doesn't distinguish between new and old failures
    assert.strictEqual(result.passed, false)
  })
  
  it('should enforce that unrelated failures still block builds', () => {
    const qaResults: QAResult[] = [
      { check: 'pr_scope_test', status: 'passed', message: 'PR changes passed' },
      { check: 'unrelated_module_test', status: 'failed', message: 'Failure in unrelated module' }
    ]
    
    const result = validateGovernanceSupremacy(qaResults)
    
    // GSR doesn't distinguish between related and unrelated failures
    assert.strictEqual(result.passed, false)
  })
})
