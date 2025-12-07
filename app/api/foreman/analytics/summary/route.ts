/**
 * Analytics Summary API Endpoint
 * GET /api/foreman/analytics/summary
 * Returns complete analytics summary for the dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/summary
 * Returns complete analytics summary
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating analytics summary...')
    
    const summary = await getAnalyticsSummary()
    
    console.log('[Analytics API] Analytics summary generated successfully')
    
    return NextResponse.json(summary)
    
  } catch (error) {
    console.error('[Analytics API] Error generating analytics summary:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
