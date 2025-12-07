/**
 * Builder Performance Analytics API Endpoint
 * GET /api/foreman/analytics/builders
 * Returns builder performance analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getBuilderPerformanceAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/builders
 * Returns builder performance analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating builder performance analytics...')
    
    const analytics = await getBuilderPerformanceAnalytics()
    
    console.log('[Analytics API] Builder performance analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating builder performance analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
