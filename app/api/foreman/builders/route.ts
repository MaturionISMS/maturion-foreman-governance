/**
 * Builder Status API Endpoint
 * Returns current builder availability, capabilities, and health status
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  detectAllBuilders,
  detectOptimalBuilder,
  getCopilotCapabilities,
  getLocalCapabilities,
  getInternalCapabilities,
  getInternalBuilderProfile,
  validateBuilderProtocol,
  checkGovernanceCompliance,
  autoBootstrapInternalBuilder
} from '@/lib/foreman/builder-detection'

export interface BuilderStatusResponse {
  availability: {
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
  capabilities: {
    copilot?: {
      version?: string
      capabilities: string[]
      healthStatus: string
      protocolVersion?: string
    }
    local?: {
      capabilities: string[]
      healthStatus: string
      protocolVersion?: string
    }
    internal?: {
      version?: string
      capabilities: string[]
      healthStatus: string
      protocolVersion?: string
      repository?: string
      constraints?: string[]
    }
  }
  optimalBuilder: 'copilot' | 'local' | 'internal' | null
  internalBuilderProfile?: {
    builder: string
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
    healthStatus: string
  }
  protocolCompliance: {
    copilot?: {
      compliant: boolean
      issues: string[]
      warnings: string[]
    }
    local?: {
      compliant: boolean
      issues: string[]
      warnings: string[]
    }
    internal?: {
      compliant: boolean
      issues: string[]
      warnings: string[]
    }
  }
  governanceCompliance: {
    copilot?: {
      trueNorth: boolean
      qic: boolean
      qiel: boolean
      driftDetector: boolean
      sbhc: boolean
    }
    local?: {
      trueNorth: boolean
      qic: boolean
      qiel: boolean
      driftDetector: boolean
      sbhc: boolean
    }
    internal?: {
      trueNorth: boolean
      qic: boolean
      qiel: boolean
      driftDetector: boolean
      sbhc: boolean
    }
  }
  timestamp: string
}

/**
 * GET /api/foreman/builders
 * Returns builder availability, capabilities, and health status
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[BuilderStatus] Checking builder availability...')

    // Detect all builders
    const availability = await detectAllBuilders()

    // Get optimal builder for normal complexity tasks
    const optimalBuilder = await detectOptimalBuilder('medium')

    // Get capabilities for each builder
    const copilotCapabilities = await getCopilotCapabilities()
    const localCapabilities = await getLocalCapabilities()
    const internalCapabilities = await getInternalCapabilities()

    // Get internal builder profile if available
    const internalProfile = await getInternalBuilderProfile()

    // Validate protocol compliance for available builders
    const protocolCompliance: BuilderStatusResponse['protocolCompliance'] = {}
    if (availability.copilot.available) {
      protocolCompliance.copilot = await validateBuilderProtocol('copilot')
    }
    if (availability.local.available) {
      protocolCompliance.local = await validateBuilderProtocol('local')
    }
    if (availability.internal.available) {
      protocolCompliance.internal = await validateBuilderProtocol('internal')
    }

    // Check governance compliance for available builders
    const governanceCompliance: BuilderStatusResponse['governanceCompliance'] = {}
    if (availability.copilot.available) {
      governanceCompliance.copilot = await checkGovernanceCompliance('copilot')
    }
    if (availability.local.available) {
      governanceCompliance.local = await checkGovernanceCompliance('local')
    }
    if (availability.internal.available) {
      governanceCompliance.internal = await checkGovernanceCompliance('internal')
    }

    const response: BuilderStatusResponse = {
      availability,
      capabilities: {
        ...(copilotCapabilities && { copilot: copilotCapabilities }),
        ...(localCapabilities && { local: localCapabilities }),
        ...(internalCapabilities && { internal: internalCapabilities })
      },
      optimalBuilder,
      ...(internalProfile && { internalBuilderProfile: internalProfile }),
      protocolCompliance,
      governanceCompliance,
      timestamp: new Date().toISOString()
    }

    console.log('[BuilderStatus] Builder status:', {
      availability,
      optimalBuilder,
      hasInternalBuilder: !!internalProfile
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('[BuilderStatus] Error getting builder status:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/foreman/builders/bootstrap
 * Auto-bootstrap internal builder if not available
 */
export async function POST(request: NextRequest) {
  try {
    console.log('[BuilderStatus] Auto-bootstrapping internal builder...')

    // Get organisation ID from query or body
    const url = new URL(request.url)
    const organisationId = url.searchParams.get('organisationId') || undefined

    // Auto-bootstrap internal builder
    const result = await autoBootstrapInternalBuilder(organisationId)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.reason || 'Failed to bootstrap internal builder'
        },
        { status: 500 }
      )
    }

    console.log('[BuilderStatus] Internal builder bootstrapped:', result)

    return NextResponse.json({
      success: true,
      profile: result.profile,
      reason: result.reason,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[BuilderStatus] Error bootstrapping internal builder:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
