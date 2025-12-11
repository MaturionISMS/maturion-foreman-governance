/**
 * Phase 6: ML Issue Complexity & Safety Predictor
 * 
 * Provides complexity and safety scoring for issues to enable
 * smart autonomous execution decisions.
 * 
 * This is a domain-specific heuristic model (not heavy ML).
 * Uses weighted scoring based on:
 * - Code surface area
 * - Architectural depth
 * - File modification count
 * - Builder difficulty
 * - Dependency impact
 * - Security sensitivity
 * - Governance sensitivity
 * - Historical patterns
 * - Drift-prone areas
 */

import { PilotIssue } from '../autonomy/pilot-selection'
import { logAutonomousAction } from '../autonomy/pilot-log'
import { appendFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export interface ComplexityScore {
  score: number // 0-100
  factors: ComplexityFactors
  breakdown: string[]
}

export interface SafetyScore {
  score: number // 0-100, higher = safer
  factors: SafetyFactors
  breakdown: string[]
}

export interface RiskClassification {
  level: 'SAFE' | 'CONDITIONAL' | 'UNSAFE'
  complexity: ComplexityScore
  safety: SafetyScore
  recommendation: string
  reasoning: string[]
  allowAutonomousExecution: boolean
  requiresHumanApproval: boolean
  escalateToJohan: boolean
}

export interface ComplexityFactors {
  codeSurfaceTouched: number // 0-20 points
  architecturalDepth: number // 0-15 points
  filesModified: number // 0-15 points
  builderDifficulty: number // 0-10 points
  dependencyImpact: number // 0-10 points
  securitySensitivity: number // 0-10 points
  governanceSensitivity: number // 0-10 points
  historicalIncidents: number // 0-5 points
  driftProneArea: number // 0-5 points
}

export interface SafetyFactors {
  governanceBoundaries: number // 0-25 points deducted for violations
  workflowModificationRisk: number // 0-20 points deducted
  fileProtectionLevel: number // 0-20 points deducted (CS1 protected)
  mutationRadius: number // 0-15 points deducted
  regressionLikelihood: number // 0-10 points deducted
  builderReliability: number // 0-10 points deducted
}

/**
 * Governance-protected paths that automatically classify as UNSAFE
 */
const UNSAFE_PATHS = [
  '.github/workflows/',
  'foreman/constitution/',
  'docs/governance/',
  '.github/foreman/agent-contract.md',
  'BUILD_PHILOSOPHY.md',
  'foreman/architecture-design-checklist.md'
]

/**
 * High-risk modules that require careful handling
 */
const HIGH_RISK_MODULES = [
  'lib/foreman/guardrails/',
  'lib/foreman/qa/',
  'lib/foreman/incidents/',
  'lib/foreman/memory/',
  'lib/foreman/constitution/'
]

/**
 * Drift-prone areas based on historical data
 */
const DRIFT_PRONE_AREAS = [
  'lib/foreman/qiel-config.ts',
  '.github/workflows/qiel.yml',
  'lib/foreman/memory/drift-monitor.ts'
]

/**
 * Calculate complexity score for an issue
 */
export function calculateComplexityScore(issue: PilotIssue): ComplexityScore {
  const factors: ComplexityFactors = {
    codeSurfaceTouched: 0,
    architecturalDepth: 0,
    filesModified: 0,
    builderDifficulty: 0,
    dependencyImpact: 0,
    securitySensitivity: 0,
    governanceSensitivity: 0,
    historicalIncidents: 0,
    driftProneArea: 0
  }
  
  const breakdown: string[] = []
  
  // Factor 1: Code Surface Touched (0-20 points)
  factors.codeSurfaceTouched = estimateCodeSurface(issue)
  breakdown.push(`Code surface: ${factors.codeSurfaceTouched}/20`)
  
  // Factor 2: Architectural Depth (0-15 points)
  factors.architecturalDepth = estimateArchitecturalDepth(issue)
  breakdown.push(`Architectural depth: ${factors.architecturalDepth}/15`)
  
  // Factor 3: Files Modified (0-15 points)
  factors.filesModified = estimateFileCount(issue)
  breakdown.push(`Files modified: ${factors.filesModified}/15`)
  
  // Factor 4: Builder Difficulty (0-10 points)
  factors.builderDifficulty = estimateBuilderDifficulty(issue)
  breakdown.push(`Builder difficulty: ${factors.builderDifficulty}/10`)
  
  // Factor 5: Dependency Impact (0-10 points)
  factors.dependencyImpact = estimateDependencyImpact(issue)
  breakdown.push(`Dependency impact: ${factors.dependencyImpact}/10`)
  
  // Factor 6: Security Sensitivity (0-10 points)
  factors.securitySensitivity = estimateSecuritySensitivity(issue)
  breakdown.push(`Security sensitivity: ${factors.securitySensitivity}/10`)
  
  // Factor 7: Governance Sensitivity (0-10 points)
  factors.governanceSensitivity = estimateGovernanceSensitivity(issue)
  breakdown.push(`Governance sensitivity: ${factors.governanceSensitivity}/10`)
  
  // Factor 8: Historical Incidents (0-5 points)
  factors.historicalIncidents = checkHistoricalIncidents(issue)
  breakdown.push(`Historical incidents: ${factors.historicalIncidents}/5`)
  
  // Factor 9: Drift-Prone Area (0-5 points)
  factors.driftProneArea = checkDriftProneArea(issue)
  breakdown.push(`Drift-prone area: ${factors.driftProneArea}/5`)
  
  // Calculate total score
  const score = Math.min(100, 
    factors.codeSurfaceTouched +
    factors.architecturalDepth +
    factors.filesModified +
    factors.builderDifficulty +
    factors.dependencyImpact +
    factors.securitySensitivity +
    factors.governanceSensitivity +
    factors.historicalIncidents +
    factors.driftProneArea
  )
  
  return { score, factors, breakdown }
}

/**
 * Calculate safety score for an issue
 * Higher score = safer for autonomous execution
 */
export function calculateSafetyScore(issue: PilotIssue): SafetyScore {
  let score = 100 // Start at 100, deduct points for risks
  
  const factors: SafetyFactors = {
    governanceBoundaries: 0,
    workflowModificationRisk: 0,
    fileProtectionLevel: 0,
    mutationRadius: 0,
    regressionLikelihood: 0,
    builderReliability: 0
  }
  
  const breakdown: string[] = []
  
  // Factor 1: Governance Boundaries (0-25 points deducted)
  factors.governanceBoundaries = checkGovernanceBoundaries(issue)
  score -= factors.governanceBoundaries
  breakdown.push(`Governance boundaries: -${factors.governanceBoundaries}/25`)
  
  // Factor 2: Workflow Modification Risk (0-20 points deducted)
  factors.workflowModificationRisk = checkWorkflowModificationRisk(issue)
  score -= factors.workflowModificationRisk
  breakdown.push(`Workflow modification risk: -${factors.workflowModificationRisk}/20`)
  
  // Factor 3: File Protection Level (0-20 points deducted)
  factors.fileProtectionLevel = checkFileProtectionLevel(issue)
  score -= factors.fileProtectionLevel
  breakdown.push(`File protection level: -${factors.fileProtectionLevel}/20`)
  
  // Factor 4: Mutation Radius (0-15 points deducted)
  factors.mutationRadius = estimateMutationRadius(issue)
  score -= factors.mutationRadius
  breakdown.push(`Mutation radius: -${factors.mutationRadius}/15`)
  
  // Factor 5: Regression Likelihood (0-10 points deducted)
  factors.regressionLikelihood = estimateRegressionLikelihood(issue)
  score -= factors.regressionLikelihood
  breakdown.push(`Regression likelihood: -${factors.regressionLikelihood}/10`)
  
  // Factor 6: Builder Reliability (0-10 points deducted)
  factors.builderReliability = assessBuilderReliability(issue)
  score -= factors.builderReliability
  breakdown.push(`Builder reliability: -${factors.builderReliability}/10`)
  
  // Ensure score stays in range
  score = Math.max(0, Math.min(100, score))
  
  return { score, factors, breakdown }
}

/**
 * Classify risk level and provide recommendations
 */
export function classifyRisk(issue: PilotIssue): RiskClassification {
  const complexity = calculateComplexityScore(issue)
  const safety = calculateSafetyScore(issue)
  
  const reasoning: string[] = []
  let level: 'SAFE' | 'CONDITIONAL' | 'UNSAFE' = 'SAFE'
  let allowAutonomousExecution = true
  let requiresHumanApproval = false
  let escalateToJohan = false
  let recommendation = ''
  
  // Check for automatic UNSAFE classification
  if (touchesUnsafePaths(issue)) {
    level = 'UNSAFE'
    allowAutonomousExecution = false
    escalateToJohan = true
    recommendation = 'ESCALATE: Issue touches governance-protected paths'
    reasoning.push('❌ Modifies workflows, governance, or constitutional files')
    reasoning.push('❌ Automatic UNSAFE classification')
    reasoning.push('⚠️ MUST escalate to Johan')
  } else if (safety.score < 50) {
    // Low safety score
    level = 'UNSAFE'
    allowAutonomousExecution = false
    escalateToJohan = true
    recommendation = 'ESCALATE: Safety score too low for autonomous execution'
    reasoning.push(`❌ Safety score: ${safety.score}/100 (threshold: 50)`)
    reasoning.push('❌ High risk of governance violations or regressions')
    reasoning.push('⚠️ MUST escalate to Johan')
  } else if (complexity.score > 70) {
    // High complexity
    level = 'CONDITIONAL'
    allowAutonomousExecution = false
    requiresHumanApproval = true
    recommendation = 'CONDITIONAL: Complexity too high, requires human approval'
    reasoning.push(`⚠️ Complexity score: ${complexity.score}/100 (threshold: 70)`)
    reasoning.push(`✅ Safety score: ${safety.score}/100`)
    reasoning.push('⚠️ Requires human approval before execution')
  } else if (safety.score < 70) {
    // Moderate safety concerns
    level = 'CONDITIONAL'
    allowAutonomousExecution = false
    requiresHumanApproval = true
    recommendation = 'CONDITIONAL: Safety concerns require human review'
    reasoning.push(`✅ Complexity score: ${complexity.score}/100`)
    reasoning.push(`⚠️ Safety score: ${safety.score}/100 (threshold: 70)`)
    reasoning.push('⚠️ Requires human approval before execution')
  } else {
    // Safe for autonomous execution
    level = 'SAFE'
    allowAutonomousExecution = true
    requiresHumanApproval = false
    recommendation = 'SAFE: Approved for autonomous execution'
    reasoning.push(`✅ Complexity score: ${complexity.score}/100 (< 70)`)
    reasoning.push(`✅ Safety score: ${safety.score}/100 (> 70)`)
    reasoning.push('✅ Safe for autonomous wave execution')
  }
  
  return {
    level,
    complexity,
    safety,
    recommendation,
    reasoning,
    allowAutonomousExecution,
    requiresHumanApproval,
    escalateToJohan
  }
}

/**
 * Log complexity analysis to AUTONOMY_PILOT_LOG and generate report
 */
export function logComplexityAnalysis(issue: PilotIssue, classification: RiskClassification): void {
  // Log to autonomy pilot log
  logAutonomousAction({
    timestamp: new Date().toISOString(),
    actionType: 'Issue Complexity Analysis',
    decision: classification.allowAutonomousExecution ? 'allowed' : 
              classification.escalateToJohan ? 'escalated' : 'denied',
    details: `Issue #${issue.number}: ${issue.title}`,
    outcome: classification.recommendation
  })
  
  // Generate detailed report
  const reportPath = join(process.cwd(), 'docs', 'autonomy', 'analysis', 'ISSUE_COMPLEXITY_REPORT.md')
  const reportDir = join(process.cwd(), 'docs', 'autonomy', 'analysis')
  
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true })
  }
  
  const report = `
## Issue #${issue.number} - ${issue.title}

**Analysis Date**: ${new Date().toISOString()}  
**Risk Classification**: ${classification.level}  
**Autonomous Execution**: ${classification.allowAutonomousExecution ? '✅ Allowed' : '❌ Blocked'}  
**Human Approval Required**: ${classification.requiresHumanApproval ? '⚠️ Yes' : '✅ No'}  
**Escalate to Johan**: ${classification.escalateToJohan ? '🚨 Yes' : '✅ No'}

### Complexity Analysis
- **Score**: ${classification.complexity.score}/100
${classification.complexity.breakdown.map(b => `- ${b}`).join('\n')}

### Safety Analysis
- **Score**: ${classification.safety.score}/100
${classification.safety.breakdown.map(b => `- ${b}`).join('\n')}

### Reasoning
${classification.reasoning.map(r => `- ${r}`).join('\n')}

### Recommendation
${classification.recommendation}

---

`
  
  appendFileSync(reportPath, report, 'utf-8')
}

// ===== Helper Functions =====

function estimateCodeSurface(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  let score = 5 // Base score
  
  if (title.includes('refactor') || body.includes('refactor')) score += 10
  if (title.includes('rewrite') || body.includes('rewrite')) score += 15
  if (issue.labels.includes('large')) score += 8
  if (issue.labels.includes('breaking-change')) score += 12
  
  return Math.min(20, score)
}

function estimateArchitecturalDepth(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  let score = 2 // Base score
  
  if (title.includes('architecture') || body.includes('architecture')) score += 10
  if (title.includes('core') || body.includes('core')) score += 8
  if (title.includes('framework') || body.includes('framework')) score += 7
  if (issue.labels.includes('architecture')) score += 10
  
  return Math.min(15, score)
}

function estimateFileCount(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  
  let score = 3 // Base: assume small change
  
  if (issue.labels.includes('documentation') || issue.labels.includes('docs')) {
    score = 2 // Docs usually touch few files
  } else if (issue.labels.includes('enhancement')) {
    score = 8 // Enhancements touch multiple files
  } else if (issue.labels.includes('feature')) {
    score = 12 // Features touch many files
  }
  
  if (body.includes('multiple files') || body.includes('several files')) score += 5
  
  return Math.min(15, score)
}

function estimateBuilderDifficulty(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  let score = 3 // Base difficulty
  
  if (title.includes('complex') || body.includes('complex')) score += 5
  if (title.includes('integration') || body.includes('integration')) score += 4
  if (issue.labels.includes('technical-debt')) score += 3
  
  return Math.min(10, score)
}

function estimateDependencyImpact(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  
  let score = 2 // Base: minimal dependencies
  
  if (body.includes('dependency') || body.includes('dependencies')) score += 6
  if (body.includes('breaking') || body.includes('api change')) score += 8
  
  return Math.min(10, score)
}

function estimateSecuritySensitivity(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  let score = 0
  
  if (issue.labels.includes('security')) score += 10
  if (title.includes('security') || body.includes('security')) score += 8
  if (title.includes('auth') || body.includes('authentication')) score += 7
  if (body.includes('credentials') || body.includes('secrets')) score += 9
  
  return Math.min(10, score)
}

function estimateGovernanceSensitivity(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  let score = 0
  
  if (issue.labels.includes('governance')) score += 8
  if (title.includes('workflow') || body.includes('workflow')) score += 9
  if (title.includes('constitution') || body.includes('constitution')) score += 10
  if (body.includes('guardrail') || body.includes('policy')) score += 7
  
  return Math.min(10, score)
}

function checkHistoricalIncidents(issue: PilotIssue): number {
  // TODO: Integrate with incident system to check if similar issues caused incidents
  // For now, use label-based heuristic
  if (issue.labels.includes('bug')) return 3
  if (issue.labels.includes('critical')) return 5
  return 0
}

function checkDriftProneArea(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  for (const area of DRIFT_PRONE_AREAS) {
    if (body.includes(area.toLowerCase()) || title.includes(area.toLowerCase())) {
      return 5
    }
  }
  
  return 0
}

function checkGovernanceBoundaries(issue: PilotIssue): number {
  if (issue.labels.includes('governance')) return 25
  if (issue.labels.includes('constitutional')) return 25
  return 0
}

function checkWorkflowModificationRisk(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  if (title.includes('workflow') || body.includes('.github/workflows')) return 20
  if (title.includes('ci/cd') || body.includes('github actions')) return 15
  
  return 0
}

function checkFileProtectionLevel(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  
  for (const path of UNSAFE_PATHS) {
    if (body.includes(path.toLowerCase())) {
      return 20
    }
  }
  
  return 0
}

function estimateMutationRadius(issue: PilotIssue): number {
  const body = issue.body?.toLowerCase() || ''
  
  let score = 3 // Base mutation
  
  if (body.includes('system-wide') || body.includes('global')) score += 12
  if (body.includes('affects all') || body.includes('entire')) score += 10
  if (issue.labels.includes('breaking-change')) score += 8
  
  return Math.min(15, score)
}

function estimateRegressionLikelihood(issue: PilotIssue): number {
  if (issue.labels.includes('bug')) return 8
  if (issue.labels.includes('hotfix')) return 10
  if (issue.labels.includes('refactor')) return 6
  
  return 2
}

function assessBuilderReliability(issue: PilotIssue): number {
  // TODO: Integrate with builder performance registry
  // For now, assume high reliability
  return 0
}

function touchesUnsafePaths(issue: PilotIssue): boolean {
  const body = issue.body?.toLowerCase() || ''
  const title = issue.title.toLowerCase()
  
  for (const path of UNSAFE_PATHS) {
    if (body.includes(path.toLowerCase()) || title.includes(path.toLowerCase())) {
      return true
    }
  }
  
  return false
}
