/**
 * Type Safety Governance Events
 * 
 * Records type errors, schema mismatches, and build failures for governance tracking
 * Implements Type Cohesion Contract v1.0.0
 */

import fs from 'fs'
import path from 'path'

/**
 * Type error event
 */
export interface TypeErrorEvent {
  type: 'type_error'
  timestamp: string
  location: string           // File path where error occurred
  error: string             // Error message
  engine: string            // Which engine/module failed
  severity: 'warning' | 'error'
  stackTrace?: string       // Optional stack trace
}

/**
 * Schema mismatch event
 */
export interface SchemaMismatchEvent {
  type: 'schema_mismatch'
  timestamp: string
  expectedSchema: string    // Expected type/shape
  actualSchema: string      // Actual type/shape received
  field: string            // Which field mismatched
  engine: string           // Which engine detected mismatch
  severity: 'warning' | 'error'
  affectedOperations?: string[]
}

/**
 * Build failure event
 */
export interface BuildFailureEvent {
  type: 'build_failure'
  timestamp: string
  command: string          // e.g., 'next build' or 'tsc --noEmit'
  exitCode: number
  errorOutput: string
  relatedFiles: string[]
  phase: 'compile' | 'build' | 'deploy'
}

/**
 * Deployment failure event
 */
export interface DeploymentFailureEvent {
  type: 'deployment_failure'
  timestamp: string
  platform: string         // e.g., 'vercel'
  reason: string
  buildLogs?: string
  relatedCommit?: string
}

/**
 * Union type for all type safety governance events
 */
export type TypeSafetyGovernanceEvent = 
  | TypeErrorEvent 
  | SchemaMismatchEvent 
  | BuildFailureEvent
  | DeploymentFailureEvent

/**
 * Get governance events file path
 */
function getGovernanceEventsPath(): string {
  return path.join(process.cwd(), 'memory', 'governance-events.json')
}

/**
 * Load existing governance events
 */
function loadGovernanceEvents(): any[] {
  const eventPath = getGovernanceEventsPath()
  
  if (!fs.existsSync(eventPath)) {
    return []
  }
  
  try {
    const content = fs.readFileSync(eventPath, 'utf-8')
    if (!content.trim()) return []
    
    return JSON.parse(content)
  } catch (error) {
    console.error('[Governance] Error loading events:', error)
    return []
  }
}

/**
 * Save governance events
 */
function saveGovernanceEvents(events: any[]): void {
  const eventPath = getGovernanceEventsPath()
  const dir = path.dirname(eventPath)
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Keep only last 2000 events to prevent file bloat
  const trimmedEvents = events.slice(-2000)
  
  fs.writeFileSync(eventPath, JSON.stringify(trimmedEvents, null, 2), 'utf-8')
}

/**
 * Record type error event
 */
export function recordTypeError(
  location: string,
  error: string,
  engine: string,
  severity: 'warning' | 'error' = 'error',
  stackTrace?: string
): void {
  const event: TypeErrorEvent = {
    type: 'type_error',
    timestamp: new Date().toISOString(),
    location,
    error,
    engine,
    severity,
    stackTrace
  }
  
  const events = loadGovernanceEvents()
  events.push(event)
  saveGovernanceEvents(events)
  
  console.log(`[Governance] Type error recorded: ${location} (${engine})`)
}

/**
 * Record schema mismatch event
 */
export function recordSchemaMismatch(
  expectedSchema: string,
  actualSchema: string,
  field: string,
  engine: string,
  severity: 'warning' | 'error' = 'error',
  affectedOperations?: string[]
): void {
  const event: SchemaMismatchEvent = {
    type: 'schema_mismatch',
    timestamp: new Date().toISOString(),
    expectedSchema,
    actualSchema,
    field,
    engine,
    severity,
    affectedOperations
  }
  
  const events = loadGovernanceEvents()
  events.push(event)
  saveGovernanceEvents(events)
  
  console.log(`[Governance] Schema mismatch recorded: ${field} (${engine})`)
}

/**
 * Record build failure event
 */
export function recordBuildFailure(
  command: string,
  exitCode: number,
  errorOutput: string,
  relatedFiles: string[] = [],
  phase: 'compile' | 'build' | 'deploy' = 'build'
): void {
  const event: BuildFailureEvent = {
    type: 'build_failure',
    timestamp: new Date().toISOString(),
    command,
    exitCode,
    errorOutput,
    relatedFiles,
    phase
  }
  
  const events = loadGovernanceEvents()
  events.push(event)
  saveGovernanceEvents(events)
  
  console.log(`[Governance] Build failure recorded: ${command} (exit code ${exitCode})`)
}

/**
 * Record deployment failure event
 */
export function recordDeploymentFailure(
  platform: string,
  reason: string,
  buildLogs?: string,
  relatedCommit?: string
): void {
  const event: DeploymentFailureEvent = {
    type: 'deployment_failure',
    timestamp: new Date().toISOString(),
    platform,
    reason,
    buildLogs,
    relatedCommit
  }
  
  const events = loadGovernanceEvents()
  events.push(event)
  saveGovernanceEvents(events)
  
  console.log(`[Governance] Deployment failure recorded: ${platform}`)
}

/**
 * Get recent type safety events
 */
export function getRecentTypeSafetyEvents(limit: number = 50): TypeSafetyGovernanceEvent[] {
  const events = loadGovernanceEvents()
  
  const typeSafetyEvents = events.filter((e: any) => 
    e.type === 'type_error' || 
    e.type === 'schema_mismatch' || 
    e.type === 'build_failure' ||
    e.type === 'deployment_failure'
  )
  
  return typeSafetyEvents.slice(-limit) as TypeSafetyGovernanceEvent[]
}

/**
 * Get type safety statistics
 */
export interface TypeSafetyStatistics {
  totalTypeErrors: number
  totalSchemaMismatches: number
  totalBuildFailures: number
  totalDeploymentFailures: number
  last24Hours: {
    typeErrors: number
    schemaMismatches: number
    buildFailures: number
    deploymentFailures: number
  }
  mostCommonErrors: Array<{
    error: string
    count: number
  }>
  mostAffectedEngines: Array<{
    engine: string
    count: number
  }>
}

/**
 * Calculate type safety statistics
 */
export function getTypeSafetyStatistics(): TypeSafetyStatistics {
  const events = getRecentTypeSafetyEvents(1000)
  const now = Date.now()
  const last24Hours = now - (24 * 60 * 60 * 1000)
  
  const stats: TypeSafetyStatistics = {
    totalTypeErrors: 0,
    totalSchemaMismatches: 0,
    totalBuildFailures: 0,
    totalDeploymentFailures: 0,
    last24Hours: {
      typeErrors: 0,
      schemaMismatches: 0,
      buildFailures: 0,
      deploymentFailures: 0
    },
    mostCommonErrors: [],
    mostAffectedEngines: []
  }
  
  const errorCounts: Map<string, number> = new Map()
  const engineCounts: Map<string, number> = new Map()
  
  for (const event of events) {
    const eventTime = new Date(event.timestamp).getTime()
    const isRecent = eventTime >= last24Hours
    
    switch (event.type) {
      case 'type_error':
        stats.totalTypeErrors++
        if (isRecent) stats.last24Hours.typeErrors++
        errorCounts.set(event.error, (errorCounts.get(event.error) || 0) + 1)
        engineCounts.set(event.engine, (engineCounts.get(event.engine) || 0) + 1)
        break
      
      case 'schema_mismatch':
        stats.totalSchemaMismatches++
        if (isRecent) stats.last24Hours.schemaMismatches++
        errorCounts.set(`${event.field} mismatch`, (errorCounts.get(`${event.field} mismatch`) || 0) + 1)
        engineCounts.set(event.engine, (engineCounts.get(event.engine) || 0) + 1)
        break
      
      case 'build_failure':
        stats.totalBuildFailures++
        if (isRecent) stats.last24Hours.buildFailures++
        errorCounts.set(event.command, (errorCounts.get(event.command) || 0) + 1)
        break
      
      case 'deployment_failure':
        stats.totalDeploymentFailures++
        if (isRecent) stats.last24Hours.deploymentFailures++
        errorCounts.set(event.platform, (errorCounts.get(event.platform) || 0) + 1)
        break
    }
  }
  
  // Sort and get top 5 most common errors
  stats.mostCommonErrors = Array.from(errorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([error, count]) => ({ error, count }))
  
  // Sort and get top 5 most affected engines
  stats.mostAffectedEngines = Array.from(engineCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([engine, count]) => ({ engine, count }))
  
  return stats
}

/**
 * Check if type safety is degrading
 */
export function isTypeSafetyDegrading(): boolean {
  const stats = getTypeSafetyStatistics()
  
  // Type safety is degrading if we have more than 5 issues in the last 24 hours
  const recentIssues = 
    stats.last24Hours.typeErrors +
    stats.last24Hours.schemaMismatches +
    stats.last24Hours.buildFailures +
    stats.last24Hours.deploymentFailures
  
  return recentIssues > 5
}
