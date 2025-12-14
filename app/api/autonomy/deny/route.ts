/**
 * POST /api/autonomy/deny
 * 
 * Owner denies forward execution restoration.
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

    if (!reason) {
      return NextResponse.json(
        { error: 'Reason is required for denial' },
        { status: 400 }
      );
    }

    const result = await reauthorizationEngine.processOwnerDecision(
      requestId,
      'DENY',
      ownerId,
      reason
    );

    return NextResponse.json({
      state: result.state,
      decision: result.decision,
      timestamp: result.timestamp,
      message: 'Reauthorization denied. System remains in CORRECTION_MODE.',
    });
  } catch (error) {
    console.error('[API] Denial failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to process denial',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
