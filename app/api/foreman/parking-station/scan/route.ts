/**
 * Parking Station Scan API Route
 * POST /api/foreman/parking-station/scan
 * 
 * Trigger a scan to discover new upgrade suggestions
 */

import { NextResponse } from 'next/server'
import { runFullScan } from '@/lib/foreman/parking-station/discovery-engine'

export async function POST() {
  try {
    const scanResult = await runFullScan()
    
    return NextResponse.json({
      success: true,
      scanResult,
    })
  } catch (error) {
    console.error('Error running parking station scan:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run scan',
      },
      { status: 500 }
    )
  }
}
