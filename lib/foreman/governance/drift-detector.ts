/**
 * Foreman Governance Drift Detector
 * 
 * Detects when Foreman's own behavior drifts from Governance-First principles.
 * This is a self-policing mechanism that catches and corrects Foreman's governance violations.
 * 
 * Foreman must detect and correct his own drift before correcting builders.
 */

import { governanceFirstMindset, FORBIDDEN_ACTIONS } from './mindset'

/**
 * Drift Detection Result
 */
export interface DriftDetectionResult {
  driftDetected: boolean
  driftType: DriftType | null
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  actionTaken: string[]
  incidentCreated: boolean
  incidentId?: string
}

/**
 * Types of Foreman Behavioral Drift
 */
export type DriftType =
  | 'skipped_check'
  | 'softened_rule'
  | 'normalized_error'
  | 'bypassed_qa'
  | 'reduced_strictness'
  | 'whitelisted_failure'
  | 'accepted_partial_qa'
  | 'attempted_forbidden_action'
  | 'ignored_governance_memory'
  | 'acted_as_developer'
  | 'modified_qiel_patterns'
  | 'renamed_files_to_hide_failures'
  | 'modified_tsconfig_strictness'
  | 'relaxed_governance_thresholds'
  | 'created_pr_with_incomplete_qa'
  | 'ignored_anomalies'
  | 'filtered_logs_to_avoid_failure'
  | 'accepted_qiel_false_positives'
  | 'used_alternative_logic_not_aligned'
  | 'removed_tests_or_samples'
  | 'suppressed_errors'
  | 'loosened_qiel_parsing'

/**
 * Foreman Governance Drift Detector
 */
export class ForemanGovernanceDriftDetector {
  private detectionLog: Array<{
    timestamp: Date
    driftType: DriftType
    description: string
    resolved: boolean
  }> = []
  
  /**
   * Detect if Foreman skipped a check
   */
  detectSkippedCheck(context: {
    checkName: string
    reason?: string
    skipped: boolean
  }): DriftDetectionResult {
    if (!context.skipped) {
      return this.noDrift()
    }
    
    const description = `Foreman skipped check: ${context.checkName}. Reason: ${context.reason || 'None provided'}. This violates Zero-Tolerance doctrine.`
    
    return this.recordDrift({
      driftType: 'skipped_check',
      severity: 'critical',
      description,
      actionTaken: [
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Require check execution before proceeding'
      ]
    })
  }
  
  /**
   * Detect if Foreman softened a rule
   */
  detectSoftenedRule(context: {
    ruleName: string
    originalValue: any
    newValue: any
    justification?: string
  }): DriftDetectionResult {
    // Check if the rule was made less strict
    const wasWeakened = this.isRuleWeakened(context.originalValue, context.newValue)
    
    if (!wasWeakened) {
      return this.noDrift()
    }
    
    const description = `Foreman attempted to soften rule: ${context.ruleName}. Original: ${JSON.stringify(context.originalValue)}, New: ${JSON.stringify(context.newValue)}. Justification: ${context.justification || 'None'}. This is FORBIDDEN.`
    
    return this.recordDrift({
      driftType: 'softened_rule',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert rule to original value',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman normalized an error
   */
  detectNormalizedError(context: {
    errorType: string
    normalizedAs: string
    reason?: string
  }): DriftDetectionResult {
    const description = `Foreman normalized error: ${context.errorType} treated as ${context.normalizedAs}. Reason: ${context.reason || 'None'}. Errors cannot be normalized - they must be FIXED.`
    
    return this.recordDrift({
      driftType: 'normalized_error',
      severity: 'high',
      description,
      actionTaken: [
        'Treat error as critical',
        'Create governance incident',
        'Require fix before proceeding',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman bypassed QA
   */
  detectBypassedQA(context: {
    qaCheckName: string
    bypassed: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.bypassed) {
      return this.noDrift()
    }
    
    const description = `Foreman attempted to bypass QA check: ${context.qaCheckName}. Reason: ${context.reason || 'None'}. QA is SACROSANCT and cannot be bypassed.`
    
    return this.recordDrift({
      driftType: 'bypassed_qa',
      severity: 'critical',
      description,
      actionTaken: [
        'Execute QA check immediately',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Self-correction wave initiated'
      ]
    })
  }
  
  /**
   * Detect if Foreman reduced strictness
   */
  detectReducedStrictness(context: {
    configFile: string
    setting: string
    wasStrict: boolean
    isStrict: boolean
    reason?: string
  }): DriftDetectionResult {
    if (context.wasStrict === context.isStrict) {
      return this.noDrift()
    }
    
    if (!context.wasStrict && context.isStrict) {
      // This is good - increasing strictness
      return this.noDrift()
    }
    
    const description = `Foreman reduced strictness in ${context.configFile}: ${context.setting}. Was strict: ${context.wasStrict}, Is strict: ${context.isStrict}. Reason: ${context.reason || 'None'}. This is FORBIDDEN.`
    
    return this.recordDrift({
      driftType: 'reduced_strictness',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert configuration change',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman whitelisted a failure
   */
  detectWhitelistedFailure(context: {
    failureType: string
    whitelisted: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.whitelisted) {
      return this.noDrift()
    }
    
    const description = `Foreman attempted to whitelist failure: ${context.failureType}. Reason: ${context.reason || 'None'}. Whitelisting is NEVER allowed.`
    
    return this.recordDrift({
      driftType: 'whitelisted_failure',
      severity: 'critical',
      description,
      actionTaken: [
        'Remove whitelist',
        'Create governance incident',
        'Fix failure instead of whitelisting',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman accepted partial QA
   */
  detectAcceptedPartialQA(context: {
    totalTests: number
    passedTests: number
    failedTests: number
    accepted: boolean
  }): DriftDetectionResult {
    if (!context.accepted || context.passedTests === context.totalTests) {
      return this.noDrift()
    }
    
    const description = `Foreman accepted partial QA: ${context.passedTests}/${context.totalTests} passing (${context.failedTests} failures). Partial QA is NEVER acceptable. 100% required.`
    
    return this.recordDrift({
      driftType: 'accepted_partial_qa',
      severity: 'critical',
      description,
      actionTaken: [
        'Block build progression',
        'Create governance incident',
        'Require 100% QA pass',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman attempted a forbidden action
   */
  detectForbiddenAction(action: string): DriftDetectionResult {
    const forbiddenCheck = governanceFirstMindset.isForbiddenAction(action)
    
    if (!forbiddenCheck.forbidden) {
      return this.noDrift()
    }
    
    return this.recordDrift({
      driftType: 'attempted_forbidden_action',
      severity: 'critical',
      description: forbiddenCheck.reason,
      actionTaken: [
        'Block action execution',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Regenerate reasoning pattern'
      ]
    })
  }
  
  /**
   * Detect if Foreman ignored governance memory
   */
  detectIgnoredGovernanceMemory(context: {
    memoryLoaded: boolean
    rulesApplied: boolean
    driftMonitored: boolean
  }): DriftDetectionResult {
    if (context.memoryLoaded && context.rulesApplied && context.driftMonitored) {
      return this.noDrift()
    }
    
    const violations: string[] = []
    if (!context.memoryLoaded) violations.push('Governance memory not loaded')
    if (!context.rulesApplied) violations.push('Governance rules not applied')
    if (!context.driftMonitored) violations.push('Drift not monitored')
    
    const description = `Foreman ignored governance memory: ${violations.join(', ')}. Governance Memory is SUPREME and must always be consulted.`
    
    return this.recordDrift({
      driftType: 'ignored_governance_memory',
      severity: 'high',
      description,
      actionTaken: [
        'Load governance memory immediately',
        'Apply all governance rules',
        'Run drift monitoring',
        'Create governance incident',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman acted as a developer instead of auditor
   */
  detectActedAsDeveloper(action: string): DriftDetectionResult {
    const isAuditor = governanceFirstMindset.isActingAsAuditor(action)
    
    if (isAuditor) {
      return this.noDrift()
    }
    
    const description = `Foreman acted as developer instead of auditor/governor: "${action}". Foreman must delegate code work to builders and focus on governance enforcement.`
    
    return this.recordDrift({
      driftType: 'acted_as_developer',
      severity: 'medium',
      description,
      actionTaken: [
        'Stop developer action',
        'Delegate to appropriate builder',
        'Create governance incident',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman modified QIEL patterns
   */
  detectModifiedQIELPatterns(context: {
    patternType: string
    originalPattern: any
    modifiedPattern: any
    reason?: string
  }): DriftDetectionResult {
    const description = `Foreman attempted to modify QIEL pattern: ${context.patternType}. Original: ${JSON.stringify(context.originalPattern)}, Modified: ${JSON.stringify(context.modifiedPattern)}. Reason: ${context.reason || 'None'}. QIEL patterns must remain strict and cannot be softened.`
    
    return this.recordDrift({
      driftType: 'modified_qiel_patterns',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert QIEL pattern to original',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Re-run QIEL with original patterns'
      ]
    })
  }
  
  /**
   * Detect if Foreman renamed files to hide failures
   */
  detectRenamedFilesToHideFailures(context: {
    originalPath: string
    newPath: string
    reason?: string
  }): DriftDetectionResult {
    const description = `Foreman attempted to rename file to hide failures: "${context.originalPath}" -> "${context.newPath}". Reason: ${context.reason || 'None'}. File renaming to avoid QA is FORBIDDEN.`
    
    return this.recordDrift({
      driftType: 'renamed_files_to_hide_failures',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert file rename',
        'Create governance incident',
        'Fix underlying issue instead',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman modified tsconfig strictness
   */
  detectModifiedTsConfigStrictness(context: {
    setting: string
    wasEnabled: boolean
    isEnabled: boolean
    configFile?: string
    reason?: string
  }): DriftDetectionResult {
    if (context.wasEnabled === context.isEnabled) {
      return this.noDrift()
    }
    
    if (!context.wasEnabled && context.isEnabled) {
      // This is good - increasing strictness
      return this.noDrift()
    }
    
    const description = `Foreman reduced TypeScript strictness in ${context.configFile || 'tsconfig.json'}: ${context.setting}. Was enabled: ${context.wasEnabled}, Is enabled: ${context.isEnabled}. Reason: ${context.reason || 'None'}. TypeScript strictness cannot be reduced.`
    
    return this.recordDrift({
      driftType: 'modified_tsconfig_strictness',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert tsconfig changes',
        'Create governance incident',
        'Fix type errors instead of loosening strictness',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman relaxed governance thresholds
   */
  detectRelaxedGovernanceThresholds(context: {
    thresholdName: string
    originalValue: number
    newValue: number
    reason?: string
  }): DriftDetectionResult {
    if (context.newValue >= context.originalValue) {
      // This is good - maintaining or increasing threshold
      return this.noDrift()
    }
    
    const description = `Foreman attempted to relax governance threshold: ${context.thresholdName}. Original: ${context.originalValue}, New: ${context.newValue}. Reason: ${context.reason || 'None'}. Governance thresholds cannot be relaxed.`
    
    return this.recordDrift({
      driftType: 'relaxed_governance_thresholds',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert threshold to original value',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman created PR with incomplete QA
   */
  detectCreatedPRWithIncompleteQA(context: {
    qielPassed: boolean
    hasWarnings: boolean
    hasErrors: boolean
    hasFailures: boolean
    prAttempted: boolean
  }): DriftDetectionResult {
    if (!context.prAttempted) {
      return this.noDrift()
    }
    
    if (context.qielPassed && !context.hasWarnings && !context.hasErrors && !context.hasFailures) {
      // QA is complete - no drift
      return this.noDrift()
    }
    
    const issues: string[] = []
    if (!context.qielPassed) issues.push('QIEL not passed')
    if (context.hasWarnings) issues.push('Warnings present')
    if (context.hasErrors) issues.push('Errors present')
    if (context.hasFailures) issues.push('Failures present')
    
    const description = `Foreman attempted to create PR with incomplete QA: ${issues.join(', ')}. PR creation requires 100% QA pass - ZERO errors, ZERO warnings, ZERO failures.`
    
    return this.recordDrift({
      driftType: 'created_pr_with_incomplete_qa',
      severity: 'critical',
      description,
      actionTaken: [
        'Block PR creation',
        'Create governance incident',
        'Fix all QA issues before PR',
        'Log to Governance Memory',
        'Require 100% QA pass'
      ]
    })
  }
  
  /**
   * Detect if Foreman ignored anomalies
   */
  detectIgnoredAnomalies(context: {
    anomalyType: string
    anomalyCount: number
    ignored: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.ignored || context.anomalyCount === 0) {
      return this.noDrift()
    }
    
    const description = `Foreman ignored ${context.anomalyCount} anomalies of type: ${context.anomalyType}. Reason: ${context.reason || 'None'}. Anomalies MUST be investigated and resolved - ignoring is FORBIDDEN.`
    
    return this.recordDrift({
      driftType: 'ignored_anomalies',
      severity: 'critical',
      description,
      actionTaken: [
        'Stop and investigate anomalies',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Resolve all anomalies before proceeding'
      ]
    })
  }
  
  /**
   * Detect if Foreman filtered logs to avoid showing failures
   */
  detectFilteredLogsToAvoidFailure(context: {
    logType: string
    filtered: boolean
    filteredCount: number
    reason?: string
  }): DriftDetectionResult {
    if (!context.filtered || context.filteredCount === 0) {
      return this.noDrift()
    }
    
    const description = `Foreman filtered ${context.filteredCount} ${context.logType} logs to avoid showing failures. Reason: ${context.reason || 'None'}. Log filtering to hide failures is FORBIDDEN.`
    
    return this.recordDrift({
      driftType: 'filtered_logs_to_avoid_failure',
      severity: 'critical',
      description,
      actionTaken: [
        'Stop log filtering',
        'Show all logs unfiltered',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman accepted false positives in QIEL
   */
  detectAcceptedQIELFalsePositives(context: {
    falsePositiveCount: number
    accepted: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.accepted || context.falsePositiveCount === 0) {
      return this.noDrift()
    }
    
    const description = `Foreman accepted ${context.falsePositiveCount} false positives in QIEL results. Reason: ${context.reason || 'None'}. False positives indicate QIEL configuration issues and must be fixed, not accepted.`
    
    return this.recordDrift({
      driftType: 'accepted_qiel_false_positives',
      severity: 'high',
      description,
      actionTaken: [
        'Investigate and fix QIEL configuration',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Fix false positive root cause'
      ]
    })
  }
  
  /**
   * Detect if Foreman used alternative logic not aligned with True North
   */
  detectUsedAlternativeLogicNotAligned(context: {
    alternativeApproach: string
    governancePrinciple: string
    reason?: string
  }): DriftDetectionResult {
    const description = `Foreman used alternative logic not aligned with True North: "${context.alternativeApproach}". This contradicts governance principle: "${context.governancePrinciple}". Reason: ${context.reason || 'None'}. All logic must align with True North Philosophy.`
    
    return this.recordDrift({
      driftType: 'used_alternative_logic_not_aligned',
      severity: 'critical',
      description,
      actionTaken: [
        'Stop alternative approach',
        'Revert to governance-aligned logic',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Regenerate reasoning pattern'
      ]
    })
  }
  
  /**
   * Detect if Foreman removed tests or samples
   */
  detectRemovedTestsOrSamples(context: {
    itemType: 'test' | 'sample'
    itemPath: string
    removed: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.removed) {
      return this.noDrift()
    }
    
    const description = `Foreman attempted to remove ${context.itemType}: "${context.itemPath}". Reason: ${context.reason || 'None'}. Removing tests/samples to reduce failures is FORBIDDEN. Fix the underlying issue instead.`
    
    return this.recordDrift({
      driftType: 'removed_tests_or_samples',
      severity: 'critical',
      description,
      actionTaken: [
        'Restore removed test/sample',
        'Fix underlying issue instead of removing',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman suppressed errors
   */
  detectSuppressedErrors(context: {
    errorType: string
    suppressionMethod: string
    suppressed: boolean
    reason?: string
  }): DriftDetectionResult {
    if (!context.suppressed) {
      return this.noDrift()
    }
    
    const description = `Foreman suppressed errors of type: ${context.errorType} using method: ${context.suppressionMethod}. Reason: ${context.reason || 'None'}. Error suppression is FORBIDDEN. Errors must be FIXED, not suppressed.`
    
    return this.recordDrift({
      driftType: 'suppressed_errors',
      severity: 'critical',
      description,
      actionTaken: [
        'Remove error suppression',
        'Fix errors instead of suppressing',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory'
      ]
    })
  }
  
  /**
   * Detect if Foreman loosened QIEL parsing rules
   */
  detectLoosenedQIELParsing(context: {
    parsingRule: string
    wasStrict: boolean
    isStrict: boolean
    reason?: string
  }): DriftDetectionResult {
    if (context.wasStrict === context.isStrict) {
      return this.noDrift()
    }
    
    if (!context.wasStrict && context.isStrict) {
      // This is good - increasing strictness
      return this.noDrift()
    }
    
    const description = `Foreman loosened QIEL parsing rule: ${context.parsingRule}. Was strict: ${context.wasStrict}, Is strict: ${context.isStrict}. Reason: ${context.reason || 'None'}. QIEL parsing must remain strict.`
    
    return this.recordDrift({
      driftType: 'loosened_qiel_parsing',
      severity: 'critical',
      description,
      actionTaken: [
        'Revert QIEL parsing to strict mode',
        'Create governance incident',
        'Block PR creation',
        'Log to Governance Memory',
        'Re-run QIEL with strict parsing'
      ]
    })
  }
  
  /**
   * Record drift incident
   */
  private recordDrift(drift: {
    driftType: DriftType
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    actionTaken: string[]
  }): DriftDetectionResult {
    // Add to detection log
    this.detectionLog.push({
      timestamp: new Date(),
      driftType: drift.driftType,
      description: drift.description,
      resolved: false
    })
    
    // Create governance incident in memory (async, but don't wait)
    const incidentId = `foreman_drift_${drift.driftType}_${Date.now()}`
    
    // Record to memory asynchronously without blocking
    this.recordToMemoryAsync(incidentId, drift).catch(error => {
      console.error('[FOREMAN DRIFT] CRITICAL: Failed to record drift incident to memory:', error)
      console.error('[FOREMAN DRIFT] Incident details (local backup):', JSON.stringify({
        incidentId,
        driftType: drift.driftType,
        severity: drift.severity,
        description: drift.description,
        actionTaken: drift.actionTaken,
        timestamp: new Date().toISOString()
      }, null, 2))
      // Consider implementing a fallback file-based storage mechanism here
    })
    
    console.error(`[FOREMAN DRIFT DETECTED] ${drift.severity.toUpperCase()}: ${drift.description}`)
    console.error(`[FOREMAN DRIFT] Actions taken: ${drift.actionTaken.join(', ')}`)
    console.error(`[FOREMAN DRIFT] Incident created: ${incidentId}`)
    
    return {
      driftDetected: true,
      driftType: drift.driftType,
      severity: drift.severity,
      description: drift.description,
      actionTaken: drift.actionTaken,
      incidentCreated: true,
      incidentId
    }
  }
  
  /**
   * Record drift to memory asynchronously
   */
  private async recordToMemoryAsync(incidentId: string, drift: {
    driftType: DriftType
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    actionTaken: string[]
  }): Promise<void> {
    try {
      const { writeMemory } = await import('../memory/storage')
      await writeMemory({
        scope: 'global',
        key: incidentId,
        value: {
          type: 'foreman_behavioral_drift',
          description: drift.description,
          data: {
            driftType: drift.driftType,
            severity: drift.severity,
            actionTaken: drift.actionTaken,
            timestamp: new Date().toISOString(),
            resolved: false,
            source: 'ForemanGovernanceDriftDetector',
            requiresCorrection: true
          }
        },
        tags: ['foreman_drift', drift.driftType, 'governance_violation', drift.severity],
        createdBy: 'foreman_drift_detector'
      })
    } catch (error) {
      // Silently fail - drift is still logged locally
      throw error
    }
  }
  
  /**
   * No drift detected
   */
  private noDrift(): DriftDetectionResult {
    return {
      driftDetected: false,
      driftType: null,
      severity: 'low',
      description: '',
      actionTaken: [],
      incidentCreated: false
    }
  }
  
  /**
   * Check if a rule was weakened
   */
  private isRuleWeakened(original: any, modified: any): boolean {
    // Handle boolean strictness
    if (typeof original === 'boolean' && typeof modified === 'boolean') {
      return original === true && modified === false
    }
    
    // Handle numeric thresholds (lower = weaker)
    if (typeof original === 'number' && typeof modified === 'number') {
      return modified < original
    }
    
    // Handle string patterns (less specific = weaker)
    if (typeof original === 'string' && typeof modified === 'string') {
      // If modified is shorter or contains wildcards, it's weaker
      if (modified.includes('*') && !original.includes('*')) return true
      if (modified.length < original.length) return true
    }
    
    // Default: if they're different and we can't determine type, log for review
    if (original !== modified) {
      console.warn(`[Governance Drift] Rule change detected but type unclear: ${JSON.stringify(original)} -> ${JSON.stringify(modified)}. May require manual review.`)
      return false // Conservative: don't flag as weakened if unclear
    }
    
    return false
  }
  
  /**
   * Get drift detection log
   */
  getDriftLog(): Array<{
    timestamp: Date
    driftType: DriftType
    description: string
    resolved: boolean
  }> {
    return [...this.detectionLog]
  }
  
  /**
   * Mark drift as resolved
   */
  markDriftResolved(driftType: DriftType, timestamp: Date): void {
    const drift = this.detectionLog.find(
      d => d.driftType === driftType && d.timestamp.getTime() === timestamp.getTime()
    )
    
    if (drift) {
      drift.resolved = true
      console.log(`[FOREMAN DRIFT] Drift resolved: ${driftType} at ${timestamp.toISOString()}`)
    }
  }
}

/**
 * Singleton instance of Foreman Governance Drift Detector
 */
export const foremanDriftDetector = new ForemanGovernanceDriftDetector()

/**
 * Convenience function to detect any governance drift
 */
export async function detectGovernanceDrift(context: {
  action?: string
  checkSkipped?: {
    checkName: string
    reason?: string
    skipped: boolean
  }
  ruleSoftened?: {
    ruleName: string
    originalValue: any
    newValue: any
    justification?: string
  }
  errorNormalized?: {
    errorType: string
    normalizedAs: string
    reason?: string
  }
  qaBypass?: {
    qaCheckName: string
    bypassed: boolean
    reason?: string
  }
  strictnessReduced?: {
    configFile: string
    setting: string
    wasStrict: boolean
    isStrict: boolean
    reason?: string
  }
  failureWhitelisted?: {
    failureType: string
    whitelisted: boolean
    reason?: string
  }
  partialQAAccepted?: {
    totalTests: number
    passedTests: number
    failedTests: number
    accepted: boolean
  }
  governanceMemory?: {
    memoryLoaded: boolean
    rulesApplied: boolean
    driftMonitored: boolean
  }
  qielPatternModified?: {
    patternType: string
    originalPattern: any
    modifiedPattern: any
    reason?: string
  }
  fileRenamed?: {
    originalPath: string
    newPath: string
    reason?: string
  }
  tsconfigModified?: {
    setting: string
    wasEnabled: boolean
    isEnabled: boolean
    configFile?: string
    reason?: string
  }
  governanceThresholdRelaxed?: {
    thresholdName: string
    originalValue: number
    newValue: number
    reason?: string
  }
  prWithIncompleteQA?: {
    qielPassed: boolean
    hasWarnings: boolean
    hasErrors: boolean
    hasFailures: boolean
    prAttempted: boolean
  }
  anomaliesIgnored?: {
    anomalyType: string
    anomalyCount: number
    ignored: boolean
    reason?: string
  }
  logsFiltered?: {
    logType: string
    filtered: boolean
    filteredCount: number
    reason?: string
  }
  qielFalsePositivesAccepted?: {
    falsePositiveCount: number
    accepted: boolean
    reason?: string
  }
  alternativeLogicUsed?: {
    alternativeApproach: string
    governancePrinciple: string
    reason?: string
  }
  testsOrSamplesRemoved?: {
    itemType: 'test' | 'sample'
    itemPath: string
    removed: boolean
    reason?: string
  }
  errorsSuppressed?: {
    errorType: string
    suppressionMethod: string
    suppressed: boolean
    reason?: string
  }
  qielParsingLoosened?: {
    parsingRule: string
    wasStrict: boolean
    isStrict: boolean
    reason?: string
  }
}): Promise<DriftDetectionResult[]> {
  const results: DriftDetectionResult[] = []
  
  // Check for various types of drift
  if (context.checkSkipped) {
    results.push(foremanDriftDetector.detectSkippedCheck(context.checkSkipped))
  }
  
  if (context.ruleSoftened) {
    results.push(foremanDriftDetector.detectSoftenedRule(context.ruleSoftened))
  }
  
  if (context.errorNormalized) {
    results.push(foremanDriftDetector.detectNormalizedError(context.errorNormalized))
  }
  
  if (context.qaBypass) {
    results.push(foremanDriftDetector.detectBypassedQA(context.qaBypass))
  }
  
  if (context.strictnessReduced) {
    results.push(foremanDriftDetector.detectReducedStrictness(context.strictnessReduced))
  }
  
  if (context.failureWhitelisted) {
    results.push(foremanDriftDetector.detectWhitelistedFailure(context.failureWhitelisted))
  }
  
  if (context.partialQAAccepted) {
    results.push(foremanDriftDetector.detectAcceptedPartialQA(context.partialQAAccepted))
  }
  
  if (context.action) {
    results.push(foremanDriftDetector.detectForbiddenAction(context.action))
    results.push(foremanDriftDetector.detectActedAsDeveloper(context.action))
  }
  
  if (context.governanceMemory) {
    results.push(foremanDriftDetector.detectIgnoredGovernanceMemory(context.governanceMemory))
  }
  
  // New drift detection categories
  if (context.qielPatternModified) {
    results.push(foremanDriftDetector.detectModifiedQIELPatterns(context.qielPatternModified))
  }
  
  if (context.fileRenamed) {
    results.push(foremanDriftDetector.detectRenamedFilesToHideFailures(context.fileRenamed))
  }
  
  if (context.tsconfigModified) {
    results.push(foremanDriftDetector.detectModifiedTsConfigStrictness(context.tsconfigModified))
  }
  
  if (context.governanceThresholdRelaxed) {
    results.push(foremanDriftDetector.detectRelaxedGovernanceThresholds(context.governanceThresholdRelaxed))
  }
  
  if (context.prWithIncompleteQA) {
    results.push(foremanDriftDetector.detectCreatedPRWithIncompleteQA(context.prWithIncompleteQA))
  }
  
  if (context.anomaliesIgnored) {
    results.push(foremanDriftDetector.detectIgnoredAnomalies(context.anomaliesIgnored))
  }
  
  if (context.logsFiltered) {
    results.push(foremanDriftDetector.detectFilteredLogsToAvoidFailure(context.logsFiltered))
  }
  
  if (context.qielFalsePositivesAccepted) {
    results.push(foremanDriftDetector.detectAcceptedQIELFalsePositives(context.qielFalsePositivesAccepted))
  }
  
  if (context.alternativeLogicUsed) {
    results.push(foremanDriftDetector.detectUsedAlternativeLogicNotAligned(context.alternativeLogicUsed))
  }
  
  if (context.testsOrSamplesRemoved) {
    results.push(foremanDriftDetector.detectRemovedTestsOrSamples(context.testsOrSamplesRemoved))
  }
  
  if (context.errorsSuppressed) {
    results.push(foremanDriftDetector.detectSuppressedErrors(context.errorsSuppressed))
  }
  
  if (context.qielParsingLoosened) {
    results.push(foremanDriftDetector.detectLoosenedQIELParsing(context.qielParsingLoosened))
  }
  
  // Filter out no-drift results
  return results.filter(r => r.driftDetected)
}
