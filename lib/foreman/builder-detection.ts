/**
 * Builder Detection Utilities
 * Detects and validates availability of Copilot, Local, and Internal builders
 * Supports auto-bootstrap of internal builder when no other builders available
 */

import { checkLocalBuilderHealth, isLocalBuilderEnabled, getLocalBuilderConfig } from './local-builder'
import { recordGovernanceEvent } from './memory'
import * as fs from 'fs'
import * as path from 'path'

export interface BuilderAvailability {
  copilot: {
    available: boolean
    healthy: boolean
    reason?: string
  }
  local: {
    available: boolean
    healthy: boolean
    reason?: string
  }
  internal: {
    available: boolean
    healthy: boolean
    reason?: string
    autoBootstrapped?: boolean
  }
}

export interface BuilderCapabilities {
  builder: 'copilot' | 'local' | 'internal'
  version?: string
  capabilities: string[]
  healthStatus: 'healthy' | 'degraded' | 'unavailable'
  protocolVersion?: string
  repository?: string
  constraints?: string[]
}

export interface InternalBuilderProfile {
  builder: 'internal'
  repository: string
  agentPath: string
  capabilities: string[]
  protocolVersion: string
  constraints: {
    repositoryOnly: boolean
    protectedPaths: string[]
    buildToGreenOnly: boolean
    qicCompliant: boolean
    qielCompliant: boolean
  }
  createdAt: string
  createdBy: string
  healthStatus: 'healthy' | 'degraded' | 'unavailable'
}

/**
 * Check if Copilot builder is available
 * In production, this would check actual Copilot API health
 */
export async function checkCopilotAvailability(): Promise<boolean> {
  // Check for simulation flag
  const simulateFailure = process.env.SIMULATE_COPILOT_FAILURE === 'true'
  if (simulateFailure) {
    console.log('[BuilderDetection] Copilot unavailable (simulated)')
    return false
  }

  // Check if token is exhausted
  const tokenExhausted = process.env.SIMULATE_TOKEN_EXHAUSTION === 'true'
  if (tokenExhausted) {
    console.log('[BuilderDetection] Copilot unavailable (token exhaustion)')
    return false
  }

  // In production, this would:
  // 1. Check Copilot API health endpoint
  // 2. Validate API token quota
  // 3. Check rate limit status
  // For now, assume available
  return true
}

/**
 * Check Copilot builder health and capabilities
 */
export async function getCopilotCapabilities(): Promise<BuilderCapabilities | null> {
  const available = await checkCopilotAvailability()
  
  if (!available) {
    return null
  }

  return {
    builder: 'copilot',
    version: process.env.COPILOT_BUILDER_VERSION || 'latest',
    capabilities: [
      'code_generation',
      'incremental_changes',
      'pr_creation',
      'issue_handling'
    ],
    healthStatus: 'healthy',
    protocolVersion: '1.0.0'
  }
}

/**
 * Check Local builder availability and health
 */
export async function checkLocalAvailability(): Promise<boolean> {
  if (!isLocalBuilderEnabled()) {
    console.log('[BuilderDetection] Local builder disabled in configuration')
    return false
  }

  const healthy = await checkLocalBuilderHealth()
  if (!healthy) {
    console.log('[BuilderDetection] Local builder not healthy')
    return false
  }

  return true
}

/**
 * Check Local builder health and capabilities
 */
export async function getLocalCapabilities(): Promise<BuilderCapabilities | null> {
  if (!isLocalBuilderEnabled()) {
    return null
  }

  const config = getLocalBuilderConfig()
  const healthy = await checkLocalBuilderHealth()

  return {
    builder: 'local',
    capabilities: [
      'code_generation',
      'large_refactors',
      'multi_file_operations',
      'deep_architectural_changes',
      'offline_operation'
    ],
    healthStatus: healthy ? 'healthy' : 'unavailable',
    protocolVersion: '1.0.0'
  }
}

/**
 * Check if internal builder exists in repository
 */
export function checkInternalBuilderExists(): boolean {
  const agentPath = path.join(process.cwd(), '.github', 'agents', 'builder.agent.md')
  return fs.existsSync(agentPath)
}

/**
 * Get internal builder capabilities
 */
export async function getInternalCapabilities(): Promise<BuilderCapabilities | null> {
  if (!checkInternalBuilderExists()) {
    return null
  }

  return {
    builder: 'internal',
    version: '1.0',
    capabilities: [
      'code_generation',
      'build_to_green',
      'qic_compliance',
      'qiel_compliance',
      'pr_creation',
      'repository_only'
    ],
    healthStatus: 'healthy',
    protocolVersion: '1.0.0',
    repository: 'maturion-foreman-app',
    constraints: [
      'repository_boundary',
      'governance_protection',
      'build_to_green_only'
    ]
  }
}

/**
 * Get internal builder profile
 */
export async function getInternalBuilderProfile(): Promise<InternalBuilderProfile | null> {
  if (!checkInternalBuilderExists()) {
    return null
  }

  const agentPath = path.join(process.cwd(), '.github', 'agents', 'builder.agent.md')
  
  return {
    builder: 'internal',
    repository: 'maturion-foreman-app',
    agentPath,
    capabilities: [
      'code_generation',
      'build_to_green',
      'qic_compliance',
      'qiel_compliance',
      'pr_creation'
    ],
    protocolVersion: '1.0.0',
    constraints: {
      repositoryOnly: true,
      protectedPaths: [
        '.github/workflows/',
        '.github/foreman/agent-contract.md',
        'BUILD_PHILOSOPHY.md',
        'foreman/constitution/',
        'foreman/governance/'
      ],
      buildToGreenOnly: true,
      qicCompliant: true,
      qielCompliant: true
    },
    createdAt: new Date().toISOString(),
    createdBy: 'foreman',
    healthStatus: 'healthy'
  }
}

/**
 * Auto-bootstrap internal builder if no other builders available
 */
export async function autoBootstrapInternalBuilder(organisationId?: string): Promise<{
  success: boolean
  profile?: InternalBuilderProfile
  reason?: string
}> {
  console.log('[BuilderDetection] Auto-bootstrapping internal builder...')

  // Check if already exists
  if (checkInternalBuilderExists()) {
    console.log('[BuilderDetection] Internal builder already exists')
    const profile = await getInternalBuilderProfile()
    return { 
      success: true, 
      profile: profile || undefined,
      reason: 'Already exists'
    }
  }

  // Internal builder agent should already be created
  // This function validates and registers it
  if (!checkInternalBuilderExists()) {
    return {
      success: false,
      reason: 'Internal builder agent file not found at .github/agents/builder.agent.md'
    }
  }

  // Get profile
  const profile = await getInternalBuilderProfile()
  if (!profile) {
    return {
      success: false,
      reason: 'Failed to load internal builder profile'
    }
  }

  // Log creation event
  try {
    if (organisationId) {
      await recordGovernanceEvent(
        'internal_builder_bootstrapped',
        {
          timestamp: new Date().toISOString(),
          builder: 'internal',
          repository: 'maturion-foreman-app',
          agentPath: profile.agentPath,
          capabilities: profile.capabilities,
          protocolVersion: profile.protocolVersion,
          autoBootstrapped: true
        },
        { organisationId }
      )
    }
    console.log('[BuilderDetection] Internal builder bootstrap event logged')
  } catch (error) {
    console.error('[BuilderDetection] Failed to log bootstrap event:', error)
    // Don't fail bootstrap if logging fails
  }

  console.log('[BuilderDetection] Internal builder auto-bootstrapped successfully')
  
  return {
    success: true,
    profile,
    reason: 'Auto-bootstrapped'
  }
}

/**
 * Get availability status for all builders
 */
export async function detectAllBuilders(): Promise<BuilderAvailability> {
  const copilotAvailable = await checkCopilotAvailability()
  const localEnabled = isLocalBuilderEnabled()
  const localHealthy = localEnabled ? await checkLocalBuilderHealth() : false
  const internalExists = checkInternalBuilderExists()

  // Auto-bootstrap internal builder if no other builders available
  let internalAutoBootstrapped = false
  if (!copilotAvailable && !localHealthy && !internalExists) {
    console.log('[BuilderDetection] No builders available - auto-bootstrapping internal builder')
    const bootstrapResult = await autoBootstrapInternalBuilder()
    internalAutoBootstrapped = bootstrapResult.success
  }

  return {
    copilot: {
      available: copilotAvailable,
      healthy: copilotAvailable,
      reason: copilotAvailable ? undefined : 'API unavailable or token exhausted'
    },
    local: {
      available: localEnabled,
      healthy: localHealthy,
      reason: !localEnabled ? 'Disabled in configuration' : 
              !localHealthy ? 'Health check failed' : undefined
    },
    internal: {
      available: internalExists || internalAutoBootstrapped,
      healthy: internalExists || internalAutoBootstrapped,
      reason: internalExists ? 'Available' : 
              internalAutoBootstrapped ? 'Auto-bootstrapped' : 
              'Not available',
      autoBootstrapped: internalAutoBootstrapped
    }
  }
}

/**
 * Detect which builder to use based on availability and task requirements
 */
export async function detectOptimalBuilder(
  taskComplexity?: 'low' | 'medium' | 'high'
): Promise<'copilot' | 'local' | 'internal' | null> {
  const availability = await detectAllBuilders()

  // If high complexity, prefer local builder
  if (taskComplexity === 'high' && availability.local.healthy) {
    return 'local'
  }

  // If Copilot is available, use it for normal tasks
  if (availability.copilot.available) {
    return 'copilot'
  }

  // Fall back to local builder if Copilot is unavailable
  if (availability.local.healthy) {
    return 'local'
  }

  // Fall back to internal builder if both Copilot and local are unavailable
  if (availability.internal.healthy) {
    console.log('[BuilderDetection] Using internal builder (fallback)')
    return 'internal'
  }

  // No builder available
  console.error('[BuilderDetection] No builders available')
  return null
}

/**
 * Validate builder protocol compliance
 */
export interface ProtocolComplianceResult {
  compliant: boolean
  issues: string[]
  warnings: string[]
}

export async function validateBuilderProtocol(
  builder: 'copilot' | 'local' | 'internal'
): Promise<ProtocolComplianceResult> {
  const issues: string[] = []
  const warnings: string[] = []

  try {
    if (builder === 'copilot') {
      const capabilities = await getCopilotCapabilities()
      if (!capabilities) {
        issues.push('Copilot builder not available')
        return { compliant: false, issues, warnings }
      }

      if (capabilities.protocolVersion !== '1.0.0') {
        warnings.push(`Protocol version mismatch: expected 1.0.0, got ${capabilities.protocolVersion}`)
      }

      if (!capabilities.capabilities.includes('code_generation')) {
        issues.push('Missing required capability: code_generation')
      }
    } else if (builder === 'local') {
      const capabilities = await getLocalCapabilities()
      if (!capabilities) {
        issues.push('Local builder not available')
        return { compliant: false, issues, warnings }
      }

      if (capabilities.healthStatus === 'unavailable') {
        issues.push('Local builder health check failed')
      }

      if (capabilities.protocolVersion !== '1.0.0') {
        warnings.push(`Protocol version mismatch: expected 1.0.0, got ${capabilities.protocolVersion}`)
      }

      if (!capabilities.capabilities.includes('code_generation')) {
        issues.push('Missing required capability: code_generation')
      }
    } else if (builder === 'internal') {
      const capabilities = await getInternalCapabilities()
      if (!capabilities) {
        issues.push('Internal builder not available')
        return { compliant: false, issues, warnings }
      }

      if (capabilities.healthStatus === 'unavailable') {
        issues.push('Internal builder health check failed')
      }

      if (capabilities.protocolVersion !== '1.0.0') {
        warnings.push(`Protocol version mismatch: expected 1.0.0, got ${capabilities.protocolVersion}`)
      }

      if (!capabilities.capabilities.includes('code_generation')) {
        issues.push('Missing required capability: code_generation')
      }

      if (!capabilities.capabilities.includes('build_to_green')) {
        issues.push('Missing required capability: build_to_green')
      }

      if (!capabilities.capabilities.includes('qic_compliance')) {
        issues.push('Missing required capability: qic_compliance')
      }
    }
  } catch (error) {
    issues.push(`Protocol validation error: ${error instanceof Error ? error.message : String(error)}`)
  }

  return {
    compliant: issues.length === 0,
    issues,
    warnings
  }
}

/**
 * Check if builders are synchronized with governance frameworks
 */
export interface GovernanceComplianceCheck {
  trueNorth: boolean
  qic: boolean
  qiel: boolean
  driftDetector: boolean
  sbhc: boolean
}

export async function checkGovernanceCompliance(
  builder: 'copilot' | 'local' | 'internal'
): Promise<GovernanceComplianceCheck> {
  // In a full implementation, this would query the builder's governance endpoint
  // For now, we assume compliance based on builder availability
  
  const available = builder === 'copilot' 
    ? await checkCopilotAvailability()
    : builder === 'local'
    ? await checkLocalAvailability()
    : checkInternalBuilderExists()

  if (!available) {
    return {
      trueNorth: false,
      qic: false,
      qiel: false,
      driftDetector: false,
      sbhc: false
    }
  }

  // Internal builder has explicit governance compliance requirements
  if (builder === 'internal') {
    return {
      trueNorth: true,
      qic: true,
      qiel: true,
      driftDetector: true,
      sbhc: true
    }
  }

  // Assume compliance if builder is available
  // In production, this would validate actual compliance
  return {
    trueNorth: true,
    qic: true,
    qiel: true,
    driftDetector: true,
    sbhc: true
  }
}

/**
 * Log builder detection event
 */
export function logBuilderDetection(
  builder: 'copilot' | 'local' | 'internal',
  available: boolean,
  reason?: string
): void {
  console.log('[BuilderDetection]', {
    builder,
    available,
    reason,
    timestamp: new Date().toISOString()
  })
}

/**
 * Store internal builder profile in memory fabric
 */
export async function storeInternalBuilderProfile(
  profile: InternalBuilderProfile,
  organisationId?: string
): Promise<void> {
  try {
    if (organisationId) {
      await recordGovernanceEvent(
        'internal_builder_profile_stored',
        {
          timestamp: new Date().toISOString(),
          profile
        },
        { organisationId }
      )
    }
    console.log('[BuilderDetection] Internal builder profile stored in memory fabric')
  } catch (error) {
    console.error('[BuilderDetection] Failed to store builder profile:', error)
    // Don't fail if memory storage fails
  }
}
