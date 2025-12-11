/**
 * Phase 7: Builder Capability & Performance Registry
 * 
 * Tracks builders as first-class governed entities with:
 * - Capabilities and supported operations
 * - Performance metrics and reliability
 * - Failure modes and recovery patterns
 * - Historical success rates
 * 
 * Enables smart builder selection and fallback logic.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { logAutonomousAction } from '../autonomy/pilot-log'

export type BuilderType = 'github-copilot' | 'local-builder'

export interface BuilderCapability {
  builderType: BuilderType
  supportedOperations: string[]
  fileTypes: string[]
  codeDomains: string[]
  performanceCharacteristics: {
    averageCompletionTimeMs: number
    maxComplexitySupported: number
    optimalFileCount: number
    parallelExecutionCapable: boolean
  }
  failureModes: string[]
  lastUpdated: string
}

export interface BuilderPerformanceProfile {
  builderType: BuilderType
  
  // Success Metrics
  totalBuilds: number
  successfulBuilds: number
  failedBuilds: number
  successRate: number
  
  // Iteration Metrics
  averageBuildIterations: number
  maxIterationsObserved: number
  
  // QA Metrics
  qicPassRate: number
  qielPassRate: number
  
  // Recovery Metrics
  averageRecoveryTimeMs: number
  recoverySuccessRate: number
  
  // Drift Metrics
  driftFrequency: number
  driftSeverity: 'low' | 'medium' | 'high'
  
  // Security Metrics
  securityIncidents: number
  lastSecurityIncident?: string
  
  // Latency Metrics
  averageLatencyMs: number
  p95LatencyMs: number
  p99LatencyMs: number
  
  // Recent Performance
  recentFailures: BuilderFailure[]
  recentSuccesses: BuilderSuccess[]
  
  // Status
  isHealthy: boolean
  lastHealthCheck: string
  availability: number // 0-100
  
  lastUpdated: string
}

export interface BuilderFailure {
  timestamp: string
  issueNumber: number
  reason: string
  errorType: string
  recoverable: boolean
  recoveryAttempted: boolean
}

export interface BuilderSuccess {
  timestamp: string
  issueNumber: number
  durationMs: number
  iterationsRequired: number
  qaPassed: boolean
}

export interface BuilderRecommendation {
  builderType: BuilderType
  confidence: number // 0-100
  reason: string
  fallbackBuilder?: BuilderType
  estimatedDurationMs: number
  riskLevel: 'low' | 'medium' | 'high'
}

const BUILDER_PROFILES_PATH = join(process.cwd(), 'foreman', 'data', 'builder-profiles.json')

/**
 * Default capabilities for each builder type
 */
const DEFAULT_CAPABILITIES: Record<BuilderType, BuilderCapability> = {
  'github-copilot': {
    builderType: 'github-copilot',
    supportedOperations: [
      'code-generation',
      'refactoring',
      'test-creation',
      'documentation',
      'bug-fixing',
      'enhancement',
      'integration'
    ],
    fileTypes: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.md',
      '.json',
      '.yml',
      '.yaml'
    ],
    codeDomains: [
      'frontend',
      'backend',
      'api',
      'ui',
      'testing',
      'documentation',
      'configuration'
    ],
    performanceCharacteristics: {
      averageCompletionTimeMs: 120000, // 2 minutes
      maxComplexitySupported: 80,
      optimalFileCount: 5,
      parallelExecutionCapable: true
    },
    failureModes: [
      'token-limit-exceeded',
      'complexity-too-high',
      'context-loss',
      'rate-limit'
    ],
    lastUpdated: new Date().toISOString()
  },
  'local-builder': {
    builderType: 'local-builder',
    supportedOperations: [
      'code-generation',
      'simple-refactoring',
      'documentation',
      'bug-fixing',
      'small-enhancement'
    ],
    fileTypes: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.md',
      '.json'
    ],
    codeDomains: [
      'frontend',
      'ui',
      'documentation',
      'testing'
    ],
    performanceCharacteristics: {
      averageCompletionTimeMs: 180000, // 3 minutes
      maxComplexitySupported: 50,
      optimalFileCount: 3,
      parallelExecutionCapable: false
    },
    failureModes: [
      'complexity-too-high',
      'insufficient-context',
      'dependency-issues'
    ],
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Initialize builder profiles if they don't exist
 */
export function initializeBuilderProfiles(): void {
  const profileDir = join(process.cwd(), 'foreman', 'data')
  
  if (!existsSync(profileDir)) {
    mkdirSync(profileDir, { recursive: true })
  }
  
  if (!existsSync(BUILDER_PROFILES_PATH)) {
    const initialProfiles: Record<BuilderType, BuilderPerformanceProfile> = {
      'github-copilot': {
        builderType: 'github-copilot',
        totalBuilds: 0,
        successfulBuilds: 0,
        failedBuilds: 0,
        successRate: 100,
        averageBuildIterations: 1,
        maxIterationsObserved: 1,
        qicPassRate: 100,
        qielPassRate: 100,
        averageRecoveryTimeMs: 0,
        recoverySuccessRate: 100,
        driftFrequency: 0,
        driftSeverity: 'low',
        securityIncidents: 0,
        averageLatencyMs: 120000,
        p95LatencyMs: 180000,
        p99LatencyMs: 240000,
        recentFailures: [],
        recentSuccesses: [],
        isHealthy: true,
        lastHealthCheck: new Date().toISOString(),
        availability: 100,
        lastUpdated: new Date().toISOString()
      },
      'local-builder': {
        builderType: 'local-builder',
        totalBuilds: 0,
        successfulBuilds: 0,
        failedBuilds: 0,
        successRate: 100,
        averageBuildIterations: 1,
        maxIterationsObserved: 1,
        qicPassRate: 100,
        qielPassRate: 100,
        averageRecoveryTimeMs: 0,
        recoverySuccessRate: 100,
        driftFrequency: 0,
        driftSeverity: 'low',
        securityIncidents: 0,
        averageLatencyMs: 180000,
        p95LatencyMs: 240000,
        p99LatencyMs: 300000,
        recentFailures: [],
        recentSuccesses: [],
        isHealthy: true,
        lastHealthCheck: new Date().toISOString(),
        availability: 100,
        lastUpdated: new Date().toISOString()
      }
    }
    
    writeFileSync(BUILDER_PROFILES_PATH, JSON.stringify(initialProfiles, null, 2), 'utf-8')
  }
}

/**
 * Load builder profiles from disk
 */
export function loadBuilderProfiles(): Record<BuilderType, BuilderPerformanceProfile> {
  initializeBuilderProfiles()
  
  try {
    const data = readFileSync(BUILDER_PROFILES_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load builder profiles:', error)
    // Return default profiles if load fails
    return {
      'github-copilot': DEFAULT_CAPABILITIES['github-copilot'] as unknown as BuilderPerformanceProfile,
      'local-builder': DEFAULT_CAPABILITIES['local-builder'] as unknown as BuilderPerformanceProfile
    }
  }
}

/**
 * Save builder profiles to disk
 */
export function saveBuilderProfiles(profiles: Record<BuilderType, BuilderPerformanceProfile>): void {
  initializeBuilderProfiles()
  
  try {
    writeFileSync(BUILDER_PROFILES_PATH, JSON.stringify(profiles, null, 2), 'utf-8')
  } catch (error) {
    console.error('Failed to save builder profiles:', error)
  }
}

/**
 * Get capability information for a builder
 */
export function getBuilderCapability(builderType: BuilderType): BuilderCapability {
  return DEFAULT_CAPABILITIES[builderType]
}

/**
 * Get performance profile for a builder
 */
export function getBuilderPerformance(builderType: BuilderType): BuilderPerformanceProfile {
  const profiles = loadBuilderProfiles()
  return profiles[builderType]
}

/**
 * Update builder performance after a build
 */
export function updateBuilderPerformance(
  builderType: BuilderType,
  success: boolean,
  durationMs: number,
  iterations: number,
  qaPassed: boolean,
  issueNumber: number,
  error?: string
): void {
  const profiles = loadBuilderProfiles()
  const profile = profiles[builderType]
  
  // Update totals
  profile.totalBuilds++
  
  if (success) {
    profile.successfulBuilds++
    profile.recentSuccesses.push({
      timestamp: new Date().toISOString(),
      issueNumber,
      durationMs,
      iterationsRequired: iterations,
      qaPassed
    })
    
    // Keep only last 10 successes
    if (profile.recentSuccesses.length > 10) {
      profile.recentSuccesses.shift()
    }
  } else {
    profile.failedBuilds++
    profile.recentFailures.push({
      timestamp: new Date().toISOString(),
      issueNumber,
      reason: error || 'Unknown error',
      errorType: categorizeError(error || ''),
      recoverable: isRecoverable(error || ''),
      recoveryAttempted: false
    })
    
    // Keep only last 10 failures
    if (profile.recentFailures.length > 10) {
      profile.recentFailures.shift()
    }
  }
  
  // Recalculate metrics
  profile.successRate = (profile.successfulBuilds / profile.totalBuilds) * 100
  profile.averageBuildIterations = calculateAverageIterations(profile)
  profile.maxIterationsObserved = Math.max(profile.maxIterationsObserved, iterations)
  profile.qicPassRate = qaPassed ? profile.qicPassRate : profile.qicPassRate * 0.95
  profile.averageLatencyMs = calculateAverageLatency(profile, durationMs)
  
  // Update health status
  profile.isHealthy = assessBuilderHealth(profile)
  profile.availability = calculateAvailability(profile)
  profile.lastHealthCheck = new Date().toISOString()
  profile.lastUpdated = new Date().toISOString()
  
  // Save updated profiles
  saveBuilderProfiles(profiles)
  
  // Log to autonomy pilot log
  logAutonomousAction({
    timestamp: new Date().toISOString(),
    actionType: 'Builder Performance Update',
    decision: 'allowed',
    builderRouting: {
      builderType,
      reason: `Build ${success ? 'succeeded' : 'failed'} in ${durationMs}ms`
    },
    details: `Issue #${issueNumber}, Iterations: ${iterations}, QA: ${qaPassed ? 'passed' : 'failed'}`,
    outcome: `Builder profile updated, Success rate: ${profile.successRate.toFixed(1)}%`
  })
}

/**
 * Record a drift event for a builder
 */
export function recordBuilderDrift(builderType: BuilderType, severity: 'low' | 'medium' | 'high'): void {
  const profiles = loadBuilderProfiles()
  const profile = profiles[builderType]
  
  profile.driftFrequency++
  profile.driftSeverity = severity
  profile.isHealthy = severity !== 'high'
  profile.lastUpdated = new Date().toISOString()
  
  saveBuilderProfiles(profiles)
}

/**
 * Record a security incident for a builder
 */
export function recordSecurityIncident(builderType: BuilderType): void {
  const profiles = loadBuilderProfiles()
  const profile = profiles[builderType]
  
  profile.securityIncidents++
  profile.lastSecurityIncident = new Date().toISOString()
  profile.isHealthy = false
  profile.lastUpdated = new Date().toISOString()
  
  saveBuilderProfiles(profiles)
}

/**
 * Check if a builder is available and healthy
 */
export function isBuilderAvailable(builderType: BuilderType): boolean {
  const profile = getBuilderPerformance(builderType)
  return profile.isHealthy && profile.availability > 50
}

/**
 * Get all healthy builders
 */
export function getHealthyBuilders(): BuilderType[] {
  const builders: BuilderType[] = ['github-copilot', 'local-builder']
  return builders.filter(builder => isBuilderAvailable(builder))
}

// ===== Helper Functions =====

function categorizeError(error: string): string {
  const errorLower = error.toLowerCase()
  
  if (errorLower.includes('token') || errorLower.includes('limit')) return 'token-limit'
  if (errorLower.includes('timeout')) return 'timeout'
  if (errorLower.includes('complexity')) return 'complexity-exceeded'
  if (errorLower.includes('context')) return 'context-loss'
  if (errorLower.includes('rate')) return 'rate-limit'
  if (errorLower.includes('dependency')) return 'dependency-error'
  
  return 'unknown'
}

function isRecoverable(error: string): boolean {
  const errorType = categorizeError(error)
  const recoverableTypes = ['timeout', 'rate-limit', 'context-loss']
  return recoverableTypes.includes(errorType)
}

function calculateAverageIterations(profile: BuilderPerformanceProfile): number {
  if (profile.recentSuccesses.length === 0) return profile.averageBuildIterations
  
  const totalIterations = profile.recentSuccesses.reduce((sum, s) => sum + s.iterationsRequired, 0)
  return totalIterations / profile.recentSuccesses.length
}

function calculateAverageLatency(profile: BuilderPerformanceProfile, newLatency: number): number {
  const alpha = 0.2 // Exponential moving average weight
  return profile.averageLatencyMs * (1 - alpha) + newLatency * alpha
}

function assessBuilderHealth(profile: BuilderPerformanceProfile): boolean {
  // Builder is unhealthy if:
  // 1. Success rate < 70%
  // 2. Recent failures > 5
  // 3. Drift severity is high
  // 4. Security incidents > 0
  
  if (profile.successRate < 70) return false
  if (profile.recentFailures.length > 5) return false
  if (profile.driftSeverity === 'high') return false
  if (profile.securityIncidents > 0) return false
  
  return true
}

function calculateAvailability(profile: BuilderPerformanceProfile): number {
  let availability = 100
  
  // Deduct for failures
  if (profile.successRate < 90) availability -= (90 - profile.successRate)
  
  // Deduct for recent failures
  availability -= profile.recentFailures.length * 5
  
  // Deduct for drift
  if (profile.driftSeverity === 'medium') availability -= 10
  if (profile.driftSeverity === 'high') availability -= 30
  
  // Deduct for security incidents
  availability -= profile.securityIncidents * 20
  
  return Math.max(0, Math.min(100, availability))
}
