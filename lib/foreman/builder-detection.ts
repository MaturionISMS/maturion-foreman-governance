/**
 * Builder Detection Utilities
 * Detects and validates availability of Copilot and Local builders
 */

import { checkLocalBuilderHealth, isLocalBuilderEnabled, getLocalBuilderConfig } from './local-builder'

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
}

export interface BuilderCapabilities {
  builder: 'copilot' | 'local'
  version?: string
  capabilities: string[]
  healthStatus: 'healthy' | 'degraded' | 'unavailable'
  protocolVersion?: string
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
 * Get availability status for all builders
 */
export async function detectAllBuilders(): Promise<BuilderAvailability> {
  const copilotAvailable = await checkCopilotAvailability()
  const localEnabled = isLocalBuilderEnabled()
  const localHealthy = localEnabled ? await checkLocalBuilderHealth() : false

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
    }
  }
}

/**
 * Detect which builder to use based on availability and task requirements
 */
export async function detectOptimalBuilder(
  taskComplexity?: 'low' | 'medium' | 'high'
): Promise<'copilot' | 'local' | null> {
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
  builder: 'copilot' | 'local'
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
    } else {
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
  builder: 'copilot' | 'local'
): Promise<GovernanceComplianceCheck> {
  // In a full implementation, this would query the builder's governance endpoint
  // For now, we assume compliance based on builder availability
  
  const available = builder === 'copilot' 
    ? await checkCopilotAvailability()
    : await checkLocalAvailability()

  if (!available) {
    return {
      trueNorth: false,
      qic: false,
      qiel: false,
      driftDetector: false,
      sbhc: false
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
  builder: 'copilot' | 'local',
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
