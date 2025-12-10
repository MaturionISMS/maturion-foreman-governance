/**
 * Autonomy Pre-Flight Validation API Endpoint
 * 
 * GET /api/autonomy/preflight
 * 
 * Runs the complete pre-flight validation checklist and returns the results.
 * This endpoint is used to verify that all systems are operational before
 * initiating autonomous execution.
 */

import { NextResponse } from 'next/server'
import { runAutonomyPreflight } from '@/lib/foreman/autonomy/pre-flight'

export async function GET() {
  try {
    const report = await runAutonomyPreflight()
    
    return NextResponse.json(report, {
      status: report.canProceed ? 200 : 503
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        overallStatus: 'FAILED',
        checks: [],
        failedChecks: [],
        warnings: [],
        canProceed: false,
        summary: `Pre-flight validation error: ${error.message}`,
        error: error.message
      },
      { status: 500 }
    )
  }
}
