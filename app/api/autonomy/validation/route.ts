/**
 * GET /api/autonomy/validation
 * 
 * Get current system validation state.
 */

import { NextRequest, NextResponse } from 'next/server';
import { systemValidator } from '@/lib/foreman/autonomy/system-validator';

export async function GET(request: NextRequest) {
  try {
    const validation = await systemValidator.validateSystemState();

    return NextResponse.json({
      validation,
      isClean: validation.isClean,
      violations: validation.violations,
      timestamp: validation.timestamp,
    });
  } catch (error) {
    console.error('[API] Get validation failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to get system validation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
