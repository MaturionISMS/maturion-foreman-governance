/**
 * POST /api/autonomy/request-reauthorization
 * 
 * Request Owner approval to restore forward execution after correction mode.
 */

import { NextRequest, NextResponse } from 'next/server';
import { reauthorizationEngine } from '@/lib/foreman/autonomy/reauthorization-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { programId } = body;

    if (!programId) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      );
    }

    const result = await reauthorizationEngine.requestReauthorization(programId);

    if (result.error) {
      return NextResponse.json(
        {
          error: result.error,
          validationFailures: result.validationFailures,
          validationResult: result.validationResult,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      requestId: result.requestId,
      systemState: result.systemState,
      validationResult: result.validationResult,
      message: 'Reauthorization request created. Awaiting Owner approval.',
    });
  } catch (error) {
    console.error('[API] Request reauthorization failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to create reauthorization request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
