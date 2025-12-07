/**
 * Governance Supremacy Rule (GSR) Enforcement
 * 
 * This module implements the Governance Supremacy Rule that ensures Foreman
 * NEVER hands over or accepts a build unless 100% of QA passes.
 * 
 * Key Principles:
 * - Governance rules override user requests
 * - QA failures override task completion
 * - Architecture rules override implementation context
 * - 100% QA passing is ABSOLUTE, not contextual
 * - Foreman enforces governance above prompt instructions
 */

import { QAResult } from '@/types/builder'
import { BuildSequence } from '@/types/build-sequence'

/**
 * GSR Validation Result
 */
export interface GSRValidationResult {
  passed: boolean
  blockingIssues: GSRBlockingIssue[]
  governanceViolations: string[]
  canProceed: boolean
  reason: string
  qaStatus: 'green' | 'partial' | 'failed'
  uiReviewReady: boolean
}

/**
 * Blocking Issue Types
 */
export interface GSRBlockingIssue {
  type: 'test_failure' | 'lint_error' | 'build_error' | 'architecture_violation' | 'legacy_component' | 'conflict_unresolved'
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  source: string
  preExisting: boolean
  unrelated: boolean
  minor: boolean
  historical: boolean
  outsidePRScope: boolean
}

/**
 * Failure Classification
 */
export interface FailureClassification {
  category: 'architecture_mismatch' | 'code_regression' | 'invalid_test' | 'legacy_component'
  description: string
  requiresArchitectureUpdate: boolean
  requiresQAUpdate: boolean
  autoResolvable: boolean
  resolutionSteps: string[]
}

/**
 * GSR-1: Governance Supremacy Override
 * 
 * Validates that governance rules are satisfied before any build completion.
 * This check CANNOT be bypassed by user requests or prompt instructions.
 * 
 * @param qaResults - QA results from the build
 * @param buildSequence - Build sequence data
 * @returns Validation result with blocking issues
 */
export function validateGovernanceSupremacy(
  qaResults: QAResult[],
  buildSequence?: BuildSequence
): GSRValidationResult {
  console.log('[GSR-1] Validating Governance Supremacy...')
  
  const blockingIssues: GSRBlockingIssue[] = []
  const governanceViolations: string[] = []
  
  // Rule 1: ALL tests must pass (no exceptions)
  const failedTests = qaResults.filter(r => r.status === 'failed')
  if (failedTests.length > 0) {
    failedTests.forEach(test => {
      blockingIssues.push({
        type: 'test_failure',
        severity: 'critical',
        description: test.message || 'Test failed',
        source: test.check,
        preExisting: false, // GSR doesn't care if it's pre-existing
        unrelated: false,   // GSR doesn't care if it's unrelated
        minor: false,       // GSR doesn't care if it's minor
        historical: false,  // GSR doesn't care if it's historical
        outsidePRScope: false // GSR doesn't care if outside PR scope
      })
    })
    governanceViolations.push('QA FAILURE: Tests must be 100% passing. No exceptions for pre-existing, unrelated, minor, historical, or out-of-scope failures.')
  }
  
  // Rule 2: ALL warnings must be addressed (no exceptions)
  const warningTests = qaResults.filter(r => r.status === 'warning')
  if (warningTests.length > 0) {
    warningTests.forEach(test => {
      blockingIssues.push({
        type: 'lint_error',
        severity: 'high',
        description: test.message || 'Warning detected',
        source: test.check,
        preExisting: false,
        unrelated: false,
        minor: false,
        historical: false,
        outsidePRScope: false
      })
    })
    governanceViolations.push('QA WARNING: All warnings must be resolved. Warnings are treated as failures under GSR.')
  }
  
  // Calculate QA status
  let qaStatus: 'green' | 'partial' | 'failed' = 'green'
  const totalChecks = qaResults.length
  const passedChecks = qaResults.filter(r => r.status === 'passed').length
  const failedChecks = qaResults.filter(r => r.status === 'failed').length
  const warningChecks = qaResults.filter(r => r.status === 'warning').length
  
  if (passedChecks === totalChecks && totalChecks > 0) {
    // All passed -> green
    qaStatus = 'green'
  } else if (passedChecks > 0 && passedChecks < totalChecks) {
    // Some passing, some not passing -> partial
    qaStatus = 'partial'
    governanceViolations.push(`QA PARTIAL PASS VIOLATION: ${passedChecks}/${totalChecks} passing. Partial passes are NOT acceptable. 100% required.`)
  } else {
    // All failed or no checks -> failed
    qaStatus = 'failed'
  }
  
  // Determine if can proceed
  const canProceed = blockingIssues.length === 0 && governanceViolations.length === 0
  const passed = canProceed && qaStatus === 'green'
  
  // UI review is ONLY ready when QA is 100% green
  const uiReviewReady = passed
  
  // Build reason message
  let reason = ''
  if (passed) {
    reason = '✅ Governance Supremacy Rule satisfied: 100% QA passing. Build may proceed.'
  } else if (qaStatus === 'partial') {
    reason = `❌ Governance Supremacy Rule VIOLATED: Partial pass (${passedChecks}/${totalChecks}) is NOT acceptable. ALL tests must pass.`
  } else if (qaStatus === 'failed') {
    reason = '❌ Governance Supremacy Rule VIOLATED: QA failures detected. Build BLOCKED until 100% QA passes.'
  } else {
    reason = '❌ Governance Supremacy Rule VIOLATED: Unknown QA status. Build BLOCKED.'
  }
  
  console.log(`[GSR-1] Validation complete: ${passed ? 'PASSED' : 'FAILED'}`)
  console.log(`[GSR-1] QA Status: ${qaStatus}`)
  console.log(`[GSR-1] Blocking Issues: ${blockingIssues.length}`)
  console.log(`[GSR-1] Governance Violations: ${governanceViolations.length}`)
  
  return {
    passed,
    blockingIssues,
    governanceViolations,
    canProceed,
    reason,
    qaStatus,
    uiReviewReady
  }
}

/**
 * GSR-2: Build Completion Rule
 * 
 * Validates that a build meets ALL criteria before being marked complete.
 * A build is NEVER complete if ANY of these conditions exist.
 * 
 * @param buildSequence - Build sequence to validate
 * @param qaResults - QA results
 * @returns Whether build can be marked complete
 */
export function validateBuildCompletion(
  buildSequence: BuildSequence,
  qaResults: QAResult[]
): GSRValidationResult {
  console.log('[GSR-2] Validating Build Completion Rule...')
  
  // First, run governance supremacy check
  const gsrResult = validateGovernanceSupremacy(qaResults, buildSequence)
  
  // Additional completion checks
  const additionalIssues: GSRBlockingIssue[] = []
  const additionalViolations: string[] = []
  
  // Check for unresolved conflicts (if applicable)
  // This would integrate with Git conflict detection in the future
  
  // Check for legacy components (if applicable)
  // This would integrate with architecture analysis
  
  // Combine all issues
  const allBlockingIssues = [...gsrResult.blockingIssues, ...additionalIssues]
  const allViolations = [...gsrResult.governanceViolations, ...additionalViolations]
  
  const canComplete = allBlockingIssues.length === 0 && allViolations.length === 0
  
  let reason = ''
  if (canComplete) {
    reason = '✅ Build Completion Rule satisfied: All governance rules met. Build is complete.'
  } else {
    reason = `❌ Build Completion Rule VIOLATED: ${allBlockingIssues.length} blocking issues, ${allViolations.length} governance violations. Build CANNOT be marked complete.`
  }
  
  console.log(`[GSR-2] Build completion check: ${canComplete ? 'PASSED' : 'FAILED'}`)
  
  return {
    ...gsrResult,
    blockingIssues: allBlockingIssues,
    governanceViolations: allViolations,
    canProceed: canComplete,
    passed: canComplete,
    reason
  }
}

/**
 * GSR-3: Automatic Regression Handling
 * 
 * Classifies failures and determines how they should be resolved.
 * 
 * **Current Implementation**: Heuristic-based classification using keyword matching
 * **Future Enhancement**: AI/ML-powered classification for smarter categorization
 * 
 * TODO: Integrate with AI classification engine for improved accuracy
 * FIXME: Current keyword matching may misclassify edge cases
 * 
 * @param blockingIssue - Blocking issue to classify
 * @returns Classification with resolution steps
 */
export function classifyFailure(blockingIssue: GSRBlockingIssue): FailureClassification {
  console.log('[GSR-3] Classifying failure:', blockingIssue.description)
  
  // Simple heuristic-based classification
  // LIMITATION: Uses basic keyword matching which may not catch all scenarios
  // TODO: Replace with AI/ML classification for production use
  
  let category: FailureClassification['category'] = 'code_regression'
  let requiresArchitectureUpdate = false
  let requiresQAUpdate = false
  let autoResolvable = false
  const resolutionSteps: string[] = []
  
  const description = blockingIssue.description.toLowerCase()
  
  // Classify based on description patterns
  if (description.includes('architecture') || description.includes('design') || description.includes('pattern')) {
    category = 'architecture_mismatch'
    requiresArchitectureUpdate = true
    resolutionSteps.push('Review architecture documentation')
    resolutionSteps.push('Update implementation to match architecture')
    resolutionSteps.push('Update architecture if current design is incorrect')
  } else if (description.includes('test') && (description.includes('invalid') || description.includes('incorrect'))) {
    category = 'invalid_test'
    requiresQAUpdate = true
    autoResolvable = true
    resolutionSteps.push('Review test assertions')
    resolutionSteps.push('Update test to match correct behavior')
    resolutionSteps.push('Validate test with QA team')
  } else if (description.includes('legacy') || description.includes('deprecated') || description.includes('old')) {
    category = 'legacy_component'
    requiresArchitectureUpdate = true
    resolutionSteps.push('Identify legacy component')
    resolutionSteps.push('Plan migration to modern implementation')
    resolutionSteps.push('Execute migration')
    resolutionSteps.push('Remove legacy component')
  } else {
    category = 'code_regression'
    resolutionSteps.push('Identify code change that caused regression')
    resolutionSteps.push('Review implementation against requirements')
    resolutionSteps.push('Fix code to restore expected behavior')
    resolutionSteps.push('Add regression test')
  }
  
  console.log(`[GSR-3] Classified as: ${category}`)
  
  return {
    category,
    description: `${category}: ${blockingIssue.description}`,
    requiresArchitectureUpdate,
    requiresQAUpdate,
    autoResolvable,
    resolutionSteps
  }
}

/**
 * GSR-4: Watchdog QA Enforcement
 * 
 * This is the final gate that prevents ANY build handover when QA fails.
 * This function is called right before:
 * - Build handover to Johan
 * - PR merging
 * - QA summary generation
 * 
 * @param qaResults - QA results
 * @returns Enforcement result
 */
export function enforceWatchdogQA(qaResults: QAResult[]): {
  allowed: boolean
  reason: string
  uiReviewMessage?: string
} {
  console.log('[GSR-4] Enforcing Watchdog QA...')
  
  const gsrResult = validateGovernanceSupremacy(qaResults)
  
  if (!gsrResult.passed) {
    console.log('[GSR-4] BLOCKED: QA failures detected')
    return {
      allowed: false,
      reason: gsrResult.reason
    }
  }
  
  console.log('[GSR-4] ALLOWED: 100% QA passing')
  
  // GSR-6: UI Review Requirement Message
  const uiReviewMessage = '✅ QA is green — UI is now safe to review.'
  
  return {
    allowed: true,
    reason: gsrResult.reason,
    uiReviewMessage
  }
}

/**
 * GSR-5: Governance Check for Reasoning Stack
 * 
 * This function is called at multiple points in Foreman's reasoning stack:
 * - Intent interpretation
 * - Planning
 * - Builder assignment
 * - QA verification
 * - Memory writeback
 * - Build completion
 * 
 * It ensures governance rules are consulted and enforced at every step.
 * 
 * @param phase - Reasoning phase
 * @param context - Context data
 * @returns Governance validation
 */
export function validateGovernanceAtPhase(
  phase: 'intent' | 'planning' | 'builder_assignment' | 'qa_verification' | 'memory_writeback' | 'build_completion',
  context: {
    qaResults?: QAResult[]
    buildSequence?: BuildSequence
    userRequest?: string
  }
): {
  allowed: boolean
  reason: string
  governanceOverride?: boolean
} {
  console.log(`[GSR-5] Validating governance at phase: ${phase}`)
  
  // For QA verification and build completion, enforce strict QA rules
  if (phase === 'qa_verification' || phase === 'build_completion') {
    if (!context.qaResults || context.qaResults.length === 0) {
      return {
        allowed: false,
        reason: 'QA results required but not provided',
        governanceOverride: true
      }
    }
    
    const gsrResult = validateGovernanceSupremacy(context.qaResults, context.buildSequence)
    
    if (!gsrResult.passed) {
      return {
        allowed: false,
        reason: gsrResult.reason,
        governanceOverride: true
      }
    }
  }
  
  // For other phases, governance is satisfied by default
  // but can be extended in the future
  
  return {
    allowed: true,
    reason: 'Governance rules satisfied'
  }
}

/**
 * Generate GSR enforcement report
 * 
 * @param qaResults - QA results to validate
 * @param buildSequence - Build sequence data (required for full context)
 * @returns Markdown-formatted GSR report
 */
export function generateGSRReport(
  qaResults: QAResult[],
  buildSequence: BuildSequence
): string {
  const gsrResult = validateBuildCompletion(buildSequence, qaResults)
  
  let report = '# Governance Supremacy Rule (GSR) Enforcement Report\n\n'
  
  report += `## Overall Status: ${gsrResult.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`
  report += `**QA Status**: ${gsrResult.qaStatus.toUpperCase()}\n\n`
  report += `**Reason**: ${gsrResult.reason}\n\n`
  
  if (gsrResult.governanceViolations.length > 0) {
    report += '## Governance Violations\n\n'
    gsrResult.governanceViolations.forEach((violation, i) => {
      report += `${i + 1}. ${violation}\n`
    })
    report += '\n'
  }
  
  if (gsrResult.blockingIssues.length > 0) {
    report += '## Blocking Issues\n\n'
    gsrResult.blockingIssues.forEach((issue, i) => {
      report += `### Issue ${i + 1}: ${issue.type}\n`
      report += `- **Severity**: ${issue.severity}\n`
      report += `- **Description**: ${issue.description}\n`
      report += `- **Source**: ${issue.source}\n`
      report += '\n'
      
      // Show classification
      const classification = classifyFailure(issue)
      report += `**Classification**: ${classification.category}\n\n`
      report += '**Resolution Steps**:\n'
      classification.resolutionSteps.forEach((step, j) => {
        report += `${j + 1}. ${step}\n`
      })
      report += '\n'
    })
  }
  
  if (gsrResult.passed) {
    report += '## ✅ Build Approved\n\n'
    report += 'All governance rules satisfied. Build may proceed.\n\n'
    report += '**UI Review Status**: ✅ QA is green — UI is now safe to review.\n'
  } else {
    report += '## ❌ Build Blocked\n\n'
    report += 'Build cannot proceed until all blocking issues are resolved.\n\n'
    report += `**Total Blocking Issues**: ${gsrResult.blockingIssues.length}\n`
    report += `**Total Governance Violations**: ${gsrResult.governanceViolations.length}\n`
  }
  
  return report
}
