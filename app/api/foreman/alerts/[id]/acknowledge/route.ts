/**
 * CS4 Alerts API - Acknowledge Alert
 * POST /api/foreman/alerts/:id/acknowledge
 */

import { NextRequest, NextResponse } from 'next/server';
import { acknowledgeAlertById } from '../../../../../../lib/foreman/alerts/alert-engine';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const userId = body.userId || 'system';
    
    const alert = await acknowledgeAlertById(params.id, userId);
    
    return NextResponse.json({
      success: true,
      alert,
      message: 'Alert acknowledged successfully',
    });
  } catch (error) {
    console.error('Error acknowledging alert:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to acknowledge alert'
      },
      { status: 500 }
    );
  }
}
