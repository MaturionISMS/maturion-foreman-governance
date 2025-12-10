/**
 * Builder Authorization Status API Endpoint
 * Returns current builder authorization status and tracking data
 */

import { NextRequest, NextResponse } from 'next/server'
import { getBuilderAuthorizationStatus } from '@/lib/foreman/constitution/external-builder-protection'

/**
 * GET /api/foreman/builder-authorization
 * Returns builder authorization status
 */
export async function GET(request: NextRequest) {
  try {
    const status = await getBuilderAuthorizationStatus()
    
    console.log('[Builder Authorization API] Status requested:', {
      activeBuilders: status.activeBuilders.length,
      unauthorizedAttempts: status.unauthorizedAttempts,
      totalOverrides: status.totalOverrides
    })
    
    return NextResponse.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('[Builder Authorization API] Error getting status:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
