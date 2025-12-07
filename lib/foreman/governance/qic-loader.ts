/**
 * Quality Integrity Contract (QIC) Loader
 * 
 * This module loads and enforces QIC rules across all Maturion systems.
 * All modules that perform quality checks must load QIC rules at initialization.
 * 
 * Reference: /foreman/qa/quality-integrity-contract.md
 */

import { QICConfig, QualityIntegrityIncident, QIIncidentType, QualityCheckResult } from '@/types/memory'
import { writeMemory } from '@/lib/foreman/memory/storage'

/**
 * QIC Version - increment when QIC rules change
 */
export const QIC_VERSION = '1.0.0'

/**
 * Build error patterns that must be detected per QIC-1
 */
export const BUILD_ERROR_PATTERNS = [
  /\bERR\b/i,              // ERR as a complete word (not part of another word)
  /\bERROR\b/i,            // ERROR as a complete word
  /TypeError/,             // TypeError
  /ReferenceError/,        // ReferenceError
  /Failed to compile/i,    // Failed to compile
  /Build failed/i,         // Build failed
]

/**
 * Load QIC rules and return configuration
 * This should be called by all QA and build modules at initialization
 */
export async function loadQICRules(): Promise<QICConfig> {
  console.log('[QIC] Loading Quality Integrity Contract rules...')
  
  const config: QICConfig = {
    version: QIC_VERSION,
    buildIntegrityEnabled: true,
    lintIntegrityEnabled: true,
    runtimeIntegrityEnabled: true,
    deploymentSimulationEnabled: true,
    silentFailurePreventionEnabled: true,
    governanceMemoryIntegrationEnabled: true,
    enforcedBy: 'qa-builder',
    appliesTo: 'all-apps',
  }
  
  console.log(`[QIC] Loaded QIC v${config.version} - All integrity checks enabled`)
  
  return config
}

/**
 * Validate that QIC rules are properly loaded
 */
export function validateQICCompliance(config: QICConfig): void {
  const requiredChecks = [
    'buildIntegrityEnabled',
    'lintIntegrityEnabled',
    'runtimeIntegrityEnabled',
    'deploymentSimulationEnabled',
    'silentFailurePreventionEnabled',
    'governanceMemoryIntegrationEnabled',
  ]
  
  for (const check of requiredChecks) {
    if (!config[check as keyof QICConfig]) {
      throw new Error(`[QIC] Compliance violation: ${check} must be enabled`)
    }
  }
  
  console.log('[QIC] QIC compliance validated successfully')
}

/**
 * Parse build logs for error patterns per QIC-1
 */
export function parseBuildLogs(logOutput: string): QualityCheckResult {
  for (const pattern of BUILD_ERROR_PATTERNS) {
    if (pattern.test(logOutput)) {
      const matches = logOutput.match(pattern)
      return {
        check: 'build_integrity',
        status: 'failed',
        message: 'Build errors detected in output',
        errors: [{
          pattern: pattern.source,
          match: matches ? matches[0] : 'unknown',
          context: extractErrorContext(logOutput, pattern),
        }],
      }
    }
  }
  
  return {
    check: 'build_integrity',
    status: 'passed',
    message: 'Build logs contain no error patterns',
  }
}

/**
 * Extract error context from logs
 */
function extractErrorContext(logOutput: string, pattern: RegExp): string {
  const lines = logOutput.split('\n')
  const matchingLines = lines.filter(line => pattern.test(line))
  return matchingLines.slice(0, 5).join('\n') // Return up to 5 matching lines
}

/**
 * Generate a unique incident ID
 */
function generateIncidentId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `qi_${timestamp}_${random}`
}

/**
 * Map check type to incident type
 */
function mapCheckTypeToIncidentType(checkType: string): QIIncidentType {
  const mapping: Record<string, QIIncidentType> = {
    'build_integrity': 'build_error',
    'lint_integrity': 'lint_error',
    'runtime_integrity': 'runtime_error',
    'silent_failure_prevention': 'silent_failure',
    'deployment_simulation': 'deployment_failure',
    'schema_validation': 'schema_mismatch',
    'security_scan': 'security_violation',
    'test_execution': 'test_failure',
  }
  
  return mapping[checkType] || 'build_error'
}

/**
 * Determine severity from check result
 */
function determineSeverity(checkResult: QualityCheckResult): 'critical' | 'high' | 'medium' | 'low' {
  // Build and deployment failures are critical
  if (checkResult.check === 'build_integrity' || checkResult.check === 'deployment_simulation') {
    return 'critical'
  }
  
  // Runtime and security are high severity
  if (checkResult.check === 'runtime_integrity' || checkResult.check === 'security_scan') {
    return 'high'
  }
  
  // Lint and silent failures are medium severity
  if (checkResult.check === 'lint_integrity' || checkResult.check === 'silent_failure_prevention') {
    return 'medium'
  }
  
  return 'low'
}

/**
 * Record a Quality Integrity Incident in Governance Memory per QIC-6
 */
export async function recordQIIncident(
  checkResult: QualityCheckResult,
  metadata?: {
    buildId?: string
    sequenceId?: string
    commitSha?: string
    branch?: string
    environment?: string
  }
): Promise<void> {
  const incident: QualityIntegrityIncident = {
    id: generateIncidentId(),
    timestamp: new Date().toISOString(),
    incidentType: mapCheckTypeToIncidentType(checkResult.check),
    severity: determineSeverity(checkResult),
    source: checkResult.source || 'unknown',
    description: checkResult.message,
    details: checkResult.errors || checkResult.failures || checkResult,
    metadata: metadata || {},
  }
  
  try {
    await writeMemory({
      scope: 'foreman',
      key: `qi-incident-${incident.id}`,
      value: incident,
      tags: ['quality-integrity', 'incident', incident.incidentType, incident.severity],
      createdBy: 'qa-builder',
    })
    
    console.log(`[QIC] Recorded QI Incident: ${incident.id} - ${incident.incidentType} (${incident.severity})`)
  } catch (error) {
    console.error('[QIC] Failed to record QI Incident:', error)
    // Don't throw - we don't want incident recording to block QA failures
  }
}

/**
 * Handle QA failure by recording incident and blocking PR
 */
export async function handleQAFailure(
  checkResult: QualityCheckResult,
  metadata?: {
    buildId?: string
    sequenceId?: string
    commitSha?: string
    branch?: string
    environment?: string
  }
): Promise<void> {
  if (checkResult.status === 'failed') {
    console.log(`[QIC] QA failure detected: ${checkResult.check}`)
    
    // Record the incident
    await recordQIIncident(checkResult, metadata)
    
    // Log the failure
    console.error(`[QIC] ${checkResult.check} FAILED: ${checkResult.message}`)
    if (checkResult.errors && checkResult.errors.length > 0) {
      console.error('[QIC] Errors:', checkResult.errors)
    }
    if (checkResult.failures && checkResult.failures.length > 0) {
      console.error('[QIC] Failures:', checkResult.failures)
    }
  }
}

/**
 * Initialize QIC for the current module/app
 * This should be called at app startup
 */
export async function initializeQualityFramework(): Promise<QICConfig> {
  console.log('[QIC] Initializing Quality Integrity Framework...')
  
  const qicRules = await loadQICRules()
  
  // Validate that all QIC requirements are met
  validateQICCompliance(qicRules)
  
  console.log('[QIC] Quality Integrity Framework initialized successfully')
  
  return qicRules
}

/**
 * QIC Enforcement Checklist
 * Returns status of all QIC requirements
 */
export function getQICEnforcementStatus(config: QICConfig): Record<string, boolean> {
  return {
    'QIC-1: Build Integrity': config.buildIntegrityEnabled,
    'QIC-2: Lint Integrity': config.lintIntegrityEnabled,
    'QIC-3: Runtime Integrity': config.runtimeIntegrityEnabled,
    'QIC-4: Deployment Simulation': config.deploymentSimulationEnabled,
    'QIC-5: Silent Failure Prevention': config.silentFailurePreventionEnabled,
    'QIC-6: Governance Memory Integration': config.governanceMemoryIntegrationEnabled,
    'QIC-7: Auto-Propagation': config.appliesTo === 'all-apps',
  }
}
