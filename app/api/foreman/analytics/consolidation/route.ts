/**
 * Consolidation Analytics API Endpoint
 * GET /api/foreman/analytics/consolidation
 * Returns knowledge consolidation analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getConsolidationAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/consolidation
 * Returns consolidation analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating consolidation analytics...')
    
    const analytics = await getConsolidationAnalytics()
    
    console.log('[Analytics API] Consolidation analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating consolidation analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
