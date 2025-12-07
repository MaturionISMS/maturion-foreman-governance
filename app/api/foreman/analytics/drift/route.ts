/**
 * Drift Analytics API Endpoint
 * GET /api/foreman/analytics/drift
 * Returns drift monitoring analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getDriftAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/drift
 * Returns drift analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating drift analytics...')
    
    const analytics = await getDriftAnalytics()
    
    console.log('[Analytics API] Drift analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating drift analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
