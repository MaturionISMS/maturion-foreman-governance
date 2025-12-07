/**
 * Project Intelligence Analytics API Endpoint
 * GET /api/foreman/analytics/projects
 * Returns project intelligence analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getProjectIntelligenceAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/projects
 * Returns project intelligence analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating project intelligence analytics...')
    
    const analytics = await getProjectIntelligenceAnalytics()
    
    console.log('[Analytics API] Project intelligence analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating project intelligence analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
