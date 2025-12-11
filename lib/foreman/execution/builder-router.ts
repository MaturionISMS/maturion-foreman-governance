/**
 * Phase 7: Smart Builder Router
 * 
 * Routes issues to the most appropriate builder based on:
 * - Complexity score
 * - Safety score
 * - Builder capabilities
 * - Performance history
 * - Builder availability
 * - Historical reliability
 * 
 * Implements fallback logic and smart builder selection.
 */

import { PilotIssue } from '../autonomy/pilot-selection'
import { calculateComplexityScore, calculateSafetyScore } from '../analysis/issue-complexity'
import {
  BuilderType,
  BuilderRecommendation,
  getBuilderCapability,
  getBuilderPerformance,
  isBuilderAvailable,
  getHealthyBuilders
} from '../builders/capability-registry'
import { logAutonomousAction } from '../autonomy/pilot-log'

/**
 * Route an issue to the most appropriate builder
 */
export function routeToBuilder(issue: PilotIssue): BuilderRecommendation {
  const complexity = calculateComplexityScore(issue)
  const safety = calculateSafetyScore(issue)
  
  const availableBuilders = getHealthyBuilders()
  
  if (availableBuilders.length === 0) {
    throw new Error('No healthy builders available')
  }
  
  // Score each builder for this issue
  const scores = availableBuilders.map(builderType => ({
    builderType,
    score: scoreBuilderForIssue(builderType, issue, complexity.score, safety.score),
    reason: ''
  }))
  
  // Sort by score descending
  scores.sort((a, b) => b.score - a.score)
  
  const bestBuilder = scores[0]
  const fallbackBuilder = scores.length > 1 ? scores[1].builderType : undefined
  
  // Determine confidence and risk level
  const confidence = Math.min(100, bestBuilder.score)
  const riskLevel = determineRiskLevel(complexity.score, safety.score)
  
  // Estimate duration
  const performance = getBuilderPerformance(bestBuilder.builderType)
  const estimatedDurationMs = estimateDuration(complexity.score, performance.averageLatencyMs)
  
  // Generate reason
  const reason = generateRoutingReason(
    bestBuilder.builderType,
    complexity.score,
    safety.score,
    performance
  )
  
  const recommendation: BuilderRecommendation = {
    builderType: bestBuilder.builderType,
    confidence,
    reason,
    fallbackBuilder,
    estimatedDurationMs,
    riskLevel
  }
  
  // Log routing decision
  logAutonomousAction({
    timestamp: new Date().toISOString(),
    actionType: 'Builder Routing',
    decision: 'allowed',
    builderRouting: {
      builderType: bestBuilder.builderType,
      reason
    },
    details: `Issue #${issue.number}: ${issue.title}`,
    outcome: `Routed to ${bestBuilder.builderType} (confidence: ${confidence}%, estimated: ${(estimatedDurationMs / 60000).toFixed(1)}min)`
  })
  
  return recommendation
}

/**
 * Score a builder for a specific issue
 * Returns 0-100, higher = better fit
 */
function scoreBuilderForIssue(
  builderType: BuilderType,
  issue: PilotIssue,
  complexityScore: number,
  safetyScore: number
): number {
  const capability = getBuilderCapability(builderType)
  const performance = getBuilderPerformance(builderType)
  
  let score = 50 // Base score
  
  // Factor 1: Capability Match (0-20 points)
  score += scoreCapabilityMatch(capability, issue)
  
  // Factor 2: Complexity Handling (0-20 points)
  score += scoreComplexityHandling(capability, complexityScore)
  
  // Factor 3: Performance History (0-20 points)
  score += scorePerformanceHistory(performance)
  
  // Factor 4: Availability (0-15 points)
  score += scoreAvailability(performance)
  
  // Factor 5: Recent Reliability (0-15 points)
  score += scoreRecentReliability(performance)
  
  // Factor 6: Safety Considerations (0-10 points)
  score += scoreSafetyFit(builderType, safetyScore)
  
  return Math.max(0, Math.min(100, score))
}

/**
 * Score how well builder capabilities match the issue
 */
function scoreCapabilityMatch(capability: any, issue: PilotIssue): number {
  let score = 0
  
  // Check if issue type is supported
  if (issue.labels.includes('documentation') && capability.codeDomains.includes('documentation')) {
    score += 8
  }
  
  if (issue.labels.includes('enhancement') && capability.supportedOperations.includes('enhancement')) {
    score += 7
  }
  
  if (issue.labels.includes('bug') && capability.supportedOperations.includes('bug-fixing')) {
    score += 7
  }
  
  if (issue.labels.includes('test') && capability.supportedOperations.includes('test-creation')) {
    score += 6
  }
  
  // Check file type support
  const body = issue.body?.toLowerCase() || ''
  for (const fileType of capability.fileTypes) {
    if (body.includes(fileType)) {
      score += 2
      break
    }
  }
  
  return Math.min(20, score)
}

/**
 * Score builder's ability to handle complexity
 */
function scoreComplexityHandling(capability: any, complexityScore: number): number {
  const maxComplexity = capability.performanceCharacteristics.maxComplexitySupported
  
  if (complexityScore > maxComplexity) {
    // Complexity exceeds capability
    return 0
  }
  
  // Score based on how well complexity fits within capability
  const utilizationRatio = complexityScore / maxComplexity
  
  if (utilizationRatio < 0.5) {
    // Well within capability
    return 20
  } else if (utilizationRatio < 0.7) {
    // Good fit
    return 15
  } else if (utilizationRatio < 0.9) {
    // Acceptable fit
    return 10
  } else {
    // Near limit
    return 5
  }
}

/**
 * Score builder's historical performance
 */
function scorePerformanceHistory(performance: any): number {
  let score = 0
  
  // Success rate (0-10 points)
  if (performance.successRate >= 90) score += 10
  else if (performance.successRate >= 80) score += 7
  else if (performance.successRate >= 70) score += 4
  else score += 0
  
  // QA pass rates (0-5 points)
  if (performance.qicPassRate >= 95 && performance.qielPassRate >= 95) {
    score += 5
  } else if (performance.qicPassRate >= 85 && performance.qielPassRate >= 85) {
    score += 3
  } else {
    score += 1
  }
  
  // Drift frequency (0-5 points deducted)
  if (performance.driftFrequency === 0) {
    score += 5
  } else if (performance.driftFrequency < 3) {
    score += 2
  } else {
    score += 0
  }
  
  return Math.min(20, score)
}

/**
 * Score builder availability
 */
function scoreAvailability(performance: any): number {
  const availability = performance.availability
  
  if (availability >= 95) return 15
  if (availability >= 85) return 12
  if (availability >= 75) return 8
  if (availability >= 60) return 4
  return 0
}

/**
 * Score recent reliability
 */
function scoreRecentReliability(performance: any): number {
  let score = 15 // Start with full score
  
  // Deduct for recent failures
  score -= performance.recentFailures.length * 2
  
  // Check for drift
  if (performance.driftSeverity === 'high') {
    score -= 10
  } else if (performance.driftSeverity === 'medium') {
    score -= 5
  }
  
  // Check for security incidents
  if (performance.securityIncidents > 0) {
    score -= 10
  }
  
  return Math.max(0, score)
}

/**
 * Score safety fit
 */
function scoreSafetyFit(builderType: BuilderType, safetyScore: number): number {
  // GitHub Copilot is trusted for higher-risk tasks
  if (builderType === 'github-copilot') {
    return safetyScore >= 70 ? 10 : 5
  }
  
  // Local builder should only handle very safe tasks
  if (builderType === 'local-builder') {
    return safetyScore >= 80 ? 10 : 0
  }
  
  return 5
}

/**
 * Determine risk level based on complexity and safety
 */
function determineRiskLevel(complexityScore: number, safetyScore: number): 'low' | 'medium' | 'high' {
  if (complexityScore > 70 || safetyScore < 50) return 'high'
  if (complexityScore > 50 || safetyScore < 70) return 'medium'
  return 'low'
}

/**
 * Estimate build duration
 */
function estimateDuration(complexityScore: number, averageLatencyMs: number): number {
  // Scale duration based on complexity
  const complexityMultiplier = 1 + (complexityScore / 100)
  return Math.round(averageLatencyMs * complexityMultiplier)
}

/**
 * Generate human-readable routing reason
 */
function generateRoutingReason(
  builderType: BuilderType,
  complexityScore: number,
  safetyScore: number,
  performance: any
): string {
  const reasons: string[] = []
  
  // Primary selection reason
  if (builderType === 'github-copilot') {
    if (complexityScore > 50) {
      reasons.push('High complexity requires GitHub Copilot capabilities')
    } else if (safetyScore < 80) {
      reasons.push('Moderate safety score best handled by GitHub Copilot')
    } else {
      reasons.push('GitHub Copilot selected for optimal performance')
    }
  } else {
    reasons.push('Low complexity suitable for local builder')
  }
  
  // Performance factors
  if (performance.successRate >= 90) {
    reasons.push(`High success rate (${performance.successRate.toFixed(1)}%)`)
  }
  
  if (performance.availability >= 95) {
    reasons.push('Excellent availability')
  }
  
  // Risk factors
  if (performance.recentFailures.length > 0) {
    reasons.push(`Note: ${performance.recentFailures.length} recent failures`)
  }
  
  if (performance.driftFrequency > 0) {
    reasons.push(`Drift detected ${performance.driftFrequency} times`)
  }
  
  return reasons.join('. ')
}

/**
 * Get fallback builder if primary fails
 */
export function getFallbackBuilder(primaryBuilder: BuilderType): BuilderType | null {
  const healthyBuilders = getHealthyBuilders()
  const alternatives = healthyBuilders.filter(b => b !== primaryBuilder)
  
  if (alternatives.length === 0) return null
  
  // Return first alternative
  return alternatives[0]
}

/**
 * Check if builder can handle issue
 */
export function canBuilderHandle(builderType: BuilderType, issue: PilotIssue): boolean {
  if (!isBuilderAvailable(builderType)) return false
  
  const complexity = calculateComplexityScore(issue)
  const capability = getBuilderCapability(builderType)
  
  return complexity.score <= capability.performanceCharacteristics.maxComplexitySupported
}
