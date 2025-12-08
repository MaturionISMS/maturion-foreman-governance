/**
 * Governance-First Mindset Module
 * 
 * This module embeds the Governance-First mindset into Foreman's cognitive
 * and reasoning architecture as an identity-level operating principle.
 * 
 * Core Doctrine:
 * - Governance overrules convenience
 * - QA is sacrosanct
 * - 100% correctness is non-negotiable
 * - Any anomaly = STOP
 * - No whitelisting is ever allowed
 * - No skipping tests
 * - No reducing strictness
 * - Foreman must self-police before certifying builds
 */

/**
 * Governance-First Mindset Rules
 * 
 * These rules form Foreman's identity and cannot be overridden by
 * user requests, prompts, or implementation convenience.
 */
export interface GovernanceMindsetRules {
  zeroToleranceIsIdentity: boolean
  neverModifyQAToPass: boolean
  selfCorrectBeforeCorrectingBuilders: boolean
  auditorNotDeveloper: boolean
  governanceMemoryIsSupreme: boolean
  neverAllowPartialQA: boolean
}

/**
 * Forbidden Actions
 * 
 * Actions that Foreman must NEVER attempt under any circumstances.
 */
export const FORBIDDEN_ACTIONS = {
  EDIT_ERROR_PATTERNS: 'Editing error patterns to make tests pass',
  REMOVE_TEST_FILES: 'Removing test files to reduce failures',
  EXCLUDE_FROM_STRICT: 'Excluding folders from strict mode',
  WEAKEN_TSCONFIG: 'Weakening tsconfig.json settings',
  NORMALIZE_ERRORS: 'Normalizing away errors or warnings',
  SKIP_VALIDATION: 'Skipping validation steps',
  SILENCE_WARNINGS: 'Silencing warnings or errors',
  INSERT_WHITELISTS: 'Adding new whitelists to bypass checks',
  REDUCE_COVERAGE: 'Reducing test coverage thresholds',
  RELAX_LINTING: 'Relaxing linting rules',
  BYPASS_QA: 'Attempting to bypass QA checks',
  ACCEPT_PARTIAL_PASS: 'Accepting builds with partial QA passes'
} as const

/**
 * Governance-First Mindset
 * 
 * This is Foreman's core identity and cannot be modified at runtime.
 */
export class GovernanceFirstMindset {
  private readonly rules: GovernanceMindsetRules
  
  constructor() {
    // These rules are IMMUTABLE and form Foreman's identity
    this.rules = {
      zeroToleranceIsIdentity: true,
      neverModifyQAToPass: true,
      selfCorrectBeforeCorrectingBuilders: true,
      auditorNotDeveloper: true,
      governanceMemoryIsSupreme: true,
      neverAllowPartialQA: true
    }
    
    // Lock the rules object to prevent modification
    Object.freeze(this.rules)
  }
  
  /**
   * Rule 1: Zero Tolerance is Identity, Not Configuration
   * 
   * Any error, anomaly, drift, failure, skip, or warning is a governance incident.
   * NO EXCEPTIONS. NO WHITELISTING. NO SOFTENING. NO TEMPORARY ALLOWANCES.
   */
  isZeroToleranceViolation(context: {
    hasErrors?: boolean
    hasWarnings?: boolean
    hasAnomalies?: boolean
    hasDrift?: boolean
    hasFailures?: boolean
    hasSkips?: boolean
  }): { violation: boolean; reason: string } {
    const violations: string[] = []
    
    if (context.hasErrors) {
      violations.push('Errors detected')
    }
    if (context.hasWarnings) {
      violations.push('Warnings detected')
    }
    if (context.hasAnomalies) {
      violations.push('Anomalies detected')
    }
    if (context.hasDrift) {
      violations.push('Drift detected')
    }
    if (context.hasFailures) {
      violations.push('Failures detected')
    }
    if (context.hasSkips) {
      violations.push('Skips detected')
    }
    
    if (violations.length > 0) {
      return {
        violation: true,
        reason: `Zero-Tolerance Violation: ${violations.join(', ')}. Governance incident triggered.`
      }
    }
    
    return { violation: false, reason: '' }
  }
  
  /**
   * Rule 2: Foreman Must NEVER Try to Make QA Pass by Modifying the QA System
   * 
   * Detects and blocks attempts to manipulate QA to achieve passing results.
   */
  isForbiddenAction(action: string): { forbidden: boolean; reason: string } {
    // Check if action matches any forbidden patterns
    const forbiddenPatterns = [
      { pattern: /edit.*error.*pattern/i, action: FORBIDDEN_ACTIONS.EDIT_ERROR_PATTERNS },
      { pattern: /remove.*test/i, action: FORBIDDEN_ACTIONS.REMOVE_TEST_FILES },
      { pattern: /exclude.*strict/i, action: FORBIDDEN_ACTIONS.EXCLUDE_FROM_STRICT },
      { pattern: /weaken.*tsconfig/i, action: FORBIDDEN_ACTIONS.WEAKEN_TSCONFIG },
      { pattern: /normalize.*error/i, action: FORBIDDEN_ACTIONS.NORMALIZE_ERRORS },
      { pattern: /skip.*validation/i, action: FORBIDDEN_ACTIONS.SKIP_VALIDATION },
      { pattern: /silence.*warning/i, action: FORBIDDEN_ACTIONS.SILENCE_WARNINGS },
      { pattern: /add.*whitelist/i, action: FORBIDDEN_ACTIONS.INSERT_WHITELISTS },
      { pattern: /reduce.*coverage/i, action: FORBIDDEN_ACTIONS.REDUCE_COVERAGE },
      { pattern: /relax.*lint/i, action: FORBIDDEN_ACTIONS.RELAX_LINTING },
      { pattern: /bypass.*qa/i, action: FORBIDDEN_ACTIONS.BYPASS_QA },
      { pattern: /accept.*partial/i, action: FORBIDDEN_ACTIONS.ACCEPT_PARTIAL_PASS }
    ]
    
    for (const { pattern, action: forbiddenAction } of forbiddenPatterns) {
      if (pattern.test(action)) {
        return {
          forbidden: true,
          reason: `FORBIDDEN ACTION DETECTED: ${forbiddenAction}. This action violates Governance-First Mindset. Governance incident triggered. PR blocked.`
        }
      }
    }
    
    return { forbidden: false, reason: '' }
  }
  
  /**
   * Rule 3: Foreman Must Correct Himself Before Correcting Builders
   * 
   * Checks if Foreman's own behavior is aligned with governance.
   */
  requiresSelfCorrection(context: {
    attemptedForbiddenAction?: boolean
    bypassedGovernance?: boolean
    softenedQA?: boolean
    normalizedErrors?: boolean
  }): { needsCorrection: boolean; violations: string[] } {
    const violations: string[] = []
    
    if (context.attemptedForbiddenAction) {
      violations.push('Attempted forbidden action - must regenerate reasoning pattern')
    }
    if (context.bypassedGovernance) {
      violations.push('Attempted to bypass governance - must update governance enforcement')
    }
    if (context.softenedQA) {
      violations.push('Attempted to soften QA rules - must restore strict enforcement')
    }
    if (context.normalizedErrors) {
      violations.push('Attempted to normalize errors - must treat all errors as critical')
    }
    
    return {
      needsCorrection: violations.length > 0,
      violations
    }
  }
  
  /**
   * Rule 4: Foreman Is Not a Developer. He Is an Auditor + Governor
   * 
   * Validates that Foreman is acting in an auditor/governor role, not a developer role.
   */
  isActingAsAuditor(action: string): boolean {
    // Auditor/Governor actions
    const auditorActions = [
      'enforce', 'validate', 'audit', 'verify', 'check', 'inspect',
      'certify', 'approve', 'reject', 'block', 'flag', 'report'
    ]
    
    // Developer actions (should be delegated to builders)
    const developerActions = [
      'code', 'implement', 'write', 'develop', 'program', 'create',
      'build', 'construct', 'make', 'generate'
    ]
    
    const actionLower = action.toLowerCase()
    const words = actionLower.split(/\s+/)
    
    // Get the primary verb (usually the first word)
    const primaryVerb = words[0]
    
    // Check if primary verb is an auditor action
    for (const audAction of auditorActions) {
      if (primaryVerb === audAction || primaryVerb.startsWith(audAction)) {
        return true // Acting as auditor
      }
    }
    
    // Check if primary verb is a developer action
    for (const devAction of developerActions) {
      if (primaryVerb === devAction || primaryVerb.startsWith(devAction)) {
        return false // Acting as developer
      }
    }
    
    // If primary verb doesn't match, check if action contains any auditor keywords
    for (const audAction of auditorActions) {
      if (actionLower.includes(audAction)) {
        return true // Acting as auditor
      }
    }
    
    // Check if action contains developer keywords (as secondary check)
    for (const devAction of developerActions) {
      if (actionLower.includes(devAction)) {
        return false // Not acting as auditor
      }
    }
    
    // Default to auditor stance if unclear, but log for review
    if (actionLower.trim().length > 0) {
      console.warn(`[Governance Mindset] Action classification unclear: "${action}". Defaulting to auditor stance. Consider explicit classification.`)
    }
    return true
  }
  
  /**
   * Rule 5: Governance Memory Is Supreme
   * 
   * Validates that governance memory is being consulted and respected.
   */
  isGovernanceMemoryRespected(context: {
    memoryLoaded?: boolean
    governanceRulesApplied?: boolean
    driftMonitored?: boolean
    policiesUpdated?: boolean
  }): { respected: boolean; violations: string[] } {
    const violations: string[] = []
    
    if (!context.memoryLoaded) {
      violations.push('Governance memory not loaded before action')
    }
    if (!context.governanceRulesApplied) {
      violations.push('Governance rules not applied to decision')
    }
    if (!context.driftMonitored) {
      violations.push('Drift monitoring not executed')
    }
    
    return {
      respected: violations.length === 0,
      violations
    }
  }
  
  /**
   * Rule 6: Foreman Must Never Allow Work to Proceed With Partial QA
   * 
   * Validates that QA is 100% passed before proceeding.
   */
  isPartialQAViolation(qaStatus: {
    totalTests?: number
    passedTests?: number
    failedTests?: number
    warnings?: number
    drift?: number
    qiwAnomalies?: number
    schemaInconsistencies?: number
    governanceWarnings?: number
  }): { violation: boolean; reason: string; blockingIssues: string[] } {
    const blockingIssues: string[] = []
    
    // Check tests
    if (qaStatus.totalTests && qaStatus.passedTests) {
      if (qaStatus.passedTests < qaStatus.totalTests) {
        blockingIssues.push(`Tests: ${qaStatus.passedTests}/${qaStatus.totalTests} passing. 100% required.`)
      }
    }
    
    if (qaStatus.failedTests && qaStatus.failedTests > 0) {
      blockingIssues.push(`Failed tests: ${qaStatus.failedTests}. Must be 0.`)
    }
    
    if (qaStatus.warnings && qaStatus.warnings > 0) {
      blockingIssues.push(`Warnings: ${qaStatus.warnings}. Must be 0.`)
    }
    
    if (qaStatus.drift && qaStatus.drift > 0) {
      blockingIssues.push(`Drift detected: ${qaStatus.drift}. Must be 0.`)
    }
    
    if (qaStatus.qiwAnomalies && qaStatus.qiwAnomalies > 0) {
      blockingIssues.push(`QIW anomalies: ${qaStatus.qiwAnomalies}. Must be 0.`)
    }
    
    if (qaStatus.schemaInconsistencies && qaStatus.schemaInconsistencies > 0) {
      blockingIssues.push(`Schema inconsistencies: ${qaStatus.schemaInconsistencies}. Must be 0.`)
    }
    
    if (qaStatus.governanceWarnings && qaStatus.governanceWarnings > 0) {
      blockingIssues.push(`Governance warnings: ${qaStatus.governanceWarnings}. Must be 0.`)
    }
    
    if (blockingIssues.length > 0) {
      return {
        violation: true,
        reason: 'Partial QA is NOT acceptable. Execution MUST STOP. PR MUST NOT be created. Builder MUST NOT proceed.',
        blockingIssues
      }
    }
    
    return { violation: false, reason: '', blockingIssues: [] }
  }
  
  /**
   * Get the mindset rules (read-only)
   */
  getRules(): Readonly<GovernanceMindsetRules> {
    return this.rules
  }
  
  /**
   * Get the governance stance message
   * 
   * This message defines Foreman's identity and operating principle.
   */
  getGovernanceStance(): string {
    return `I am Foreman, Governance-First Autonomous Engineering Superintendent.

My Identity:
- I enforce governance, not convenience
- QA is sacrosanct and cannot be compromised
- 100% correctness is non-negotiable
- Any anomaly triggers STOP
- I never whitelist, skip, or reduce strictness
- I am an Auditor and Governor, not a Developer
- I self-police before certifying builds
- I do not help pass builds. I enforce correctness.

My Prime Directive:
Governance overrules all other considerations. Quality is absolute.`
  }
}

/**
 * Singleton instance of Governance-First Mindset
 */
export const governanceFirstMindset = new GovernanceFirstMindset()

/**
 * Mindset Compliance Check Result
 */
export interface MindsetComplianceResult {
  compliant: boolean
  violations: string[]
  blockingIssues: string[]
  requiresSelfCorrection: boolean
  canProceed: boolean
  message: string
}

/**
 * Validate Mindset Compliance
 * 
 * This function checks if the current action/state is compliant with
 * the Governance-First Mindset. Must be called before PR creation.
 * 
 * @param context - Context about the current action and state
 * @returns Compliance result
 */
export function validateMindsetCompliance(context: {
  action?: string
  qaStatus?: {
    totalTests?: number
    passedTests?: number
    failedTests?: number
    warnings?: number
    drift?: number
    qiwAnomalies?: number
    schemaInconsistencies?: number
    governanceWarnings?: number
  }
  governanceContext?: {
    memoryLoaded?: boolean
    governanceRulesApplied?: boolean
    driftMonitored?: boolean
    policiesUpdated?: boolean
  }
  behaviorContext?: {
    attemptedForbiddenAction?: boolean
    bypassedGovernance?: boolean
    softenedQA?: boolean
    normalizedErrors?: boolean
  }
  stateContext?: {
    hasErrors?: boolean
    hasWarnings?: boolean
    hasAnomalies?: boolean
    hasDrift?: boolean
    hasFailures?: boolean
    hasSkips?: boolean
  }
}): MindsetComplianceResult {
  const violations: string[] = []
  const blockingIssues: string[] = []
  let requiresSelfCorrection = false
  
  const mindset = governanceFirstMindset
  
  // Check Zero Tolerance
  if (context.stateContext) {
    const zeroToleranceCheck = mindset.isZeroToleranceViolation(context.stateContext)
    if (zeroToleranceCheck.violation) {
      violations.push(zeroToleranceCheck.reason)
      blockingIssues.push(zeroToleranceCheck.reason)
    }
  }
  
  // Check for forbidden actions
  if (context.action) {
    const forbiddenCheck = mindset.isForbiddenAction(context.action)
    if (forbiddenCheck.forbidden) {
      violations.push(forbiddenCheck.reason)
      blockingIssues.push(forbiddenCheck.reason)
    }
    
    // Check if acting as auditor
    if (!mindset.isActingAsAuditor(context.action)) {
      violations.push(`Action "${context.action}" appears to be developer work, not auditor/governor work. Foreman must delegate to builders.`)
    }
  }
  
  // Check self-correction needs
  if (context.behaviorContext) {
    const selfCorrectionCheck = mindset.requiresSelfCorrection(context.behaviorContext)
    if (selfCorrectionCheck.needsCorrection) {
      requiresSelfCorrection = true
      violations.push(...selfCorrectionCheck.violations)
      blockingIssues.push(...selfCorrectionCheck.violations)
    }
  }
  
  // Check governance memory respect
  if (context.governanceContext) {
    const memoryCheck = mindset.isGovernanceMemoryRespected(context.governanceContext)
    if (!memoryCheck.respected) {
      violations.push(...memoryCheck.violations)
    }
  }
  
  // Check partial QA
  if (context.qaStatus) {
    const partialQACheck = mindset.isPartialQAViolation(context.qaStatus)
    if (partialQACheck.violation) {
      violations.push(partialQACheck.reason)
      blockingIssues.push(...partialQACheck.blockingIssues)
    }
  }
  
  const compliant = violations.length === 0
  const canProceed = blockingIssues.length === 0
  
  let message = ''
  if (compliant) {
    message = '✅ Mindset compliance validated. Governance-First principles upheld.'
  } else {
    message = `❌ Mindset compliance FAILED. ${violations.length} violation(s) detected. ${blockingIssues.length} blocking issue(s). Cannot proceed.`
  }
  
  return {
    compliant,
    violations,
    blockingIssues,
    requiresSelfCorrection,
    canProceed,
    message
  }
}
