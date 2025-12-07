/**
 * Builder Feedback API Endpoint
 * POST /api/foreman/feedback
 * 
 * Receives structured feedback from builder agents
 * Part of Issue #14: Multi-Agent Reasoning Feedback Loop
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  processFeedback,
  validateFeedback
} from '@/lib/foreman/feedback/processor'
import { BuilderFeedback } from '@/types/builder-feedback'

/**
 * POST /api/foreman/feedback
 * Submit builder feedback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      )
    }
    
    const feedback: BuilderFeedback = body
    
    // Validate feedback structure
    const validation = validateFeedback(feedback)
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Invalid feedback structure',
          details: validation.errors,
          warnings: validation.warnings
        },
        { status: 400 }
      )
    }
    
    // Process feedback
    const result = await processFeedback(feedback)
    
    if (!result.processed) {
      return NextResponse.json(
        {
          error: 'Failed to process feedback',
          details: result.errors
        },
        { status: 500 }
      )
    }
    
    // Return processing result
    return NextResponse.json({
      success: true,
      feedbackId: result.feedbackId,
      processed: result.processed,
      patternsDetected: result.patternsDetected,
      driftIssuesIdentified: result.driftIssuesIdentified,
      memoryUpdates: result.memoryUpdates,
      evolutionTriggered: result.evolutionTriggered,
      consolidationTriggered: result.consolidationTriggered,
      warnings: validation.warnings,
      timestamp: result.timestamp
    })
  } catch (error) {
    console.error('[Feedback API] Error processing feedback:', error)
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/foreman/feedback
 * Get feedback statistics (optional - for monitoring)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const daysParam = searchParams.get('days') || '30'
    const days = parseInt(daysParam, 10)
    
    // Validate days parameter
    if (isNaN(days) || days < 1 || days > 365) {
      return NextResponse.json(
        {
          error: 'Invalid days parameter',
          message: 'Days must be between 1 and 365'
        },
        { status: 400 }
      )
    }
    
    // Import getFeedbackStatistics dynamically to avoid circular dependencies
    const { getFeedbackStatistics } = await import('@/lib/foreman/feedback/processor')
    
    const stats = await getFeedbackStatistics(days)
    
    return NextResponse.json({
      success: true,
      statistics: stats,
      period: `Last ${days} days`
    })
  } catch (error) {
    console.error('[Feedback API] Error retrieving statistics:', error)
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
