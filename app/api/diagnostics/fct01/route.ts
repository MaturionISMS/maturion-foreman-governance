/**
 * FCT-01 Diagnostic Route
 * 
 * Simple diagnostic endpoint for Foreman capability trial.
 * Returns static diagnostic information.
 * 
 * Architecture: /architecture/runtime/fct01-trial-route.md
 * Tests: /tests/fct01/diagnostic-route.test.ts
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * Response structure for FCT-01 diagnostic endpoint
 */
interface FCT01Response {
  /** Always "ok" to indicate route is functioning */
  status: "ok"
  /** Identifies this as the FCT-01 capability trial */
  trial: "FCT-01"
  /** ISO 8601 timestamp of the request */
  timestamp: string
  /** Optional: Application version */
  version?: string
  /** Optional: Current environment */
  environment?: string
}

/**
 * GET /api/diagnostics/fct01
 * 
 * Returns diagnostic information for FCT-01 capability trial.
 * This endpoint validates the complete Foreman autonomous build cycle.
 * 
 * @returns {FCT01Response} Diagnostic information
 */
export async function GET(request: NextRequest) {
  try {
    const response: FCT01Response = {
      status: "ok",
      trial: "FCT-01",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      environment: process.env.NODE_ENV || "development"
    }
    
    console.log('[FCT-01] Diagnostic endpoint called:', {
      timestamp: response.timestamp,
      environment: response.environment
    })
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
    
  } catch (error) {
    console.error('[FCT-01] Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
