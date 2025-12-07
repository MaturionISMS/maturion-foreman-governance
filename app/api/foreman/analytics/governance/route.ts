/**
 * Governance Alignment Analytics API Endpoint
 * GET /api/foreman/analytics/governance
 * Returns governance alignment analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGovernanceAlignmentAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/governance
 * Returns governance alignment analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating governance alignment analytics...')
    
    const analytics = await getGovernanceAlignmentAnalytics()
    
    console.log('[Analytics API] Governance alignment analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating governance alignment analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
