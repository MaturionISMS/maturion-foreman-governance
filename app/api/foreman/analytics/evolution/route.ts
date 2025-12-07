/**
 * Evolution Analytics API Endpoint
 * GET /api/foreman/analytics/evolution
 * Returns reasoning pattern evolution analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { getEvolutionAnalytics } from '@/lib/foreman/analytics'

/**
 * GET /api/foreman/analytics/evolution
 * Returns evolution analytics
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Analytics API] Generating evolution analytics...')
    
    const analytics = await getEvolutionAnalytics()
    
    console.log('[Analytics API] Evolution analytics generated successfully')
    
    return NextResponse.json(analytics)
    
  } catch (error) {
    console.error('[Analytics API] Error generating evolution analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
