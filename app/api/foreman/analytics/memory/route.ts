/**
 * Memory Analytics API Endpoint
 * GET /api/foreman/analytics/memory
 * Returns memory health metrics and trends
 */

import { NextRequest, NextResponse } from 'next/server'
import { getMemoryHealthMetrics, getMemoryGrowthTrend } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/memory
 * Returns memory health metrics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating memory analytics...')
    
    const [metrics, trend] = await Promise.all([
      getMemoryHealthMetrics(),
      getMemoryGrowthTrend()
    ])
    
    console.log('[Analytics API] Memory analytics generated successfully')
    
    return NextResponse.json({
      metrics,
      trend
    })
    
  } catch (error) {
    console.error('[Analytics API] Error generating memory analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
