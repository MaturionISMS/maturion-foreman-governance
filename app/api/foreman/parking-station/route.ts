/**
 * Parking Station API Route
 * GET /api/foreman/parking-station
 * 
 * Retrieve parking station entries with optional filtering
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAllEntries, getStats } from '@/lib/foreman/parking-station/storage'
import type { ParkingStationFilter } from '@/types/parking-station'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Build filter from query params
    const filter: ParkingStationFilter = {}
    
    if (searchParams.has('category')) {
      filter.category = searchParams.get('category') as any
    }
    
    if (searchParams.has('status')) {
      filter.status = searchParams.get('status') as any
    }
    
    if (searchParams.has('source')) {
      filter.source = searchParams.get('source') as any
    }
    
    if (searchParams.has('suggestedWave')) {
      filter.suggestedWave = searchParams.get('suggestedWave') as any
    }
    
    if (searchParams.has('search')) {
      filter.search = searchParams.get('search') || undefined
    }
    
    if (searchParams.has('minPriority')) {
      filter.minPriority = parseInt(searchParams.get('minPriority') || '0')
    }
    
    if (searchParams.has('maxPriority')) {
      filter.maxPriority = parseInt(searchParams.get('maxPriority') || '100')
    }
    
    if (searchParams.has('tags')) {
      filter.tags = searchParams.get('tags')?.split(',')
    }
    
    // Get entries and stats
    const entries = await getAllEntries(filter)
    const stats = await getStats()
    
    return NextResponse.json({
      success: true,
      entries,
      stats,
      total: entries.length,
    })
  } catch (error) {
    console.error('Error fetching parking station entries:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch entries',
      },
      { status: 500 }
    )
  }
}
