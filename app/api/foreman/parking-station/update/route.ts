/**
 * Parking Station Update API Route
 * PATCH /api/foreman/parking-station/update
 * 
 * Update an entry's status or properties
 */

import { NextRequest, NextResponse } from 'next/server'
import { updateEntry } from '@/lib/foreman/parking-station/storage'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, updates } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Entry ID is required' },
        { status: 400 }
      )
    }
    
    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Updates are required' },
        { status: 400 }
      )
    }
    
    await updateEntry(id, updates)
    
    return NextResponse.json({
      success: true,
      message: 'Entry updated successfully',
    })
  } catch (error) {
    console.error('Error updating parking station entry:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update entry',
      },
      { status: 500 }
    )
  }
}
