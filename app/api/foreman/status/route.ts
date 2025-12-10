/**
 * Foreman Status API Endpoint
 * Returns current Foreman operational status and configuration
 */

import { NextRequest, NextResponse } from 'next/server'
import { isAutonomousModeEnabled, getAutonomousSafeguards } from '@/lib/foreman/dispatch'
import { checkInitializationStatus, getInitializationSummary, InitializationStatus } from '@/lib/foreman/initialization'
import { getBuilderAuthorizationStatus, type BuilderAuthorizationStatus } from '@/lib/foreman/constitution/external-builder-protection'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface ForemanStatusResponse {
  autonomousMode: boolean
  qaGateRequired: boolean
  qaOfQaGateRequired: boolean
  complianceGateRequired: boolean
  testGateRequired: boolean
  safeguards: string[]
  gitSha?: string
  currentWave?: string
  version: string
  environment: string
  uptime: number
  timestamp: string
  initialization: InitializationStatus
  initializationSummary: string
  builderAuthorization: BuilderAuthorizationStatus
}

/**
 * GET /api/foreman/status
 * Returns Foreman operational status
 */
export async function GET(request: NextRequest) {
  try {
    // Get git SHA (if available)
    let gitSha: string | undefined
    let currentWave: string | undefined
    
    try {
      const { stdout: sha } = await execAsync('git rev-parse --short HEAD')
      gitSha = sha.trim()
      
      // Try to get current branch/wave
      const { stdout: branch } = await execAsync('git rev-parse --abbrev-ref HEAD')
      currentWave = branch.trim()
    } catch (error) {
      // Git not available or not a git repository
      console.log('[Status] Git info not available:', error)
    }
    
    // Get autonomous mode configuration
    const autonomousMode = isAutonomousModeEnabled()
    const safeguards = getAutonomousSafeguards()
    
    // Determine which gates are required
    // QA and QA-of-QA are always required regardless of safeguards config
    const qaGateRequired = true
    const qaOfQaGateRequired = true
    const complianceGateRequired = safeguards.includes('compliance')
    const testGateRequired = safeguards.includes('tests')
    
    // Check initialization status
    const initialization = checkInitializationStatus()
    const initializationSummary = getInitializationSummary(initialization)
    
    // Get builder authorization status
    const builderAuthorization = await getBuilderAuthorizationStatus()
    
    const status: ForemanStatusResponse = {
      autonomousMode,
      qaGateRequired,
      qaOfQaGateRequired,
      complianceGateRequired,
      testGateRequired,
      safeguards,
      gitSha,
      currentWave,
      version: '0.1.0', // TODO: Import from package.json
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      initialization,
      initializationSummary,
      builderAuthorization
    }
    
    console.log('[Status] Foreman status requested:', {
      autonomousMode,
      safeguards,
      gitSha,
      currentWave,
      initializationSummary
    })
    
    return NextResponse.json(status)
    
  } catch (error) {
    console.error('[Status] Error getting Foreman status:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
