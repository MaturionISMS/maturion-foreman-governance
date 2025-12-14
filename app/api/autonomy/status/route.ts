/**
 * GET /api/autonomy/status
 * 
 * Get current autonomy state and execution status.
 */

import { NextRequest, NextResponse } from 'next/server';
import { stateModel } from '@/lib/foreman/autonomy/state-model';
import { executionGuard } from '@/lib/foreman/autonomy/execution-guard';

export async function GET(request: NextRequest) {
  try {
    const state = stateModel.getCurrentState();
    const blockStatus = executionGuard.getBlockStatus();

    return NextResponse.json({
      state,
      blocked: blockStatus.blocked,
      blockReason: blockStatus.reason,
      blockMode: blockStatus.mode,
      executionAllowed: !blockStatus.blocked,
    });
  } catch (error) {
    console.error('[API] Get status failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to get autonomy status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
