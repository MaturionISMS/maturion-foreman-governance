/**
 * POST /api/autonomy/approve
 * 
 * Owner approves forward execution restoration.
 */

import { NextRequest, NextResponse } from 'next/server';
import { reauthorizationEngine } from '@/lib/foreman/autonomy/reauthorization-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId, ownerId, reason } = body;

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    if (!ownerId) {
      return NextResponse.json(
        { error: 'Owner ID is required' },
        { status: 400 }
      );
    }

    const result = await reauthorizationEngine.processOwnerDecision(
      requestId,
      'APPROVE',
      ownerId,
      reason
    );

    return NextResponse.json({
      state: result.state,
      decision: result.decision,
      timestamp: result.timestamp,
      message: 'Forward execution restored. System is now in FORWARD_EXECUTION mode.',
    });
  } catch (error) {
    console.error('[API] Approval failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to process approval',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
