/**
 * Incident Verification API
 * POST /api/foreman/incidents/verify
 * 
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 * Receives user verification feedback and triggers appropriate FM response
 */

import { NextRequest, NextResponse } from 'next/server';
import { processUserFeedback } from '@/lib/foreman/incidents/incident-engine';
import type { UserFeedbackType } from '@/lib/foreman/incidents/incident-model';

/**
 * POST /api/foreman/incidents/verify
 * Submit user verification feedback for an incident
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { incidentId, feedback, userId } = body;
    
    // Validate required fields
    if (!incidentId || !feedback) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'incidentId and feedback are required',
        },
        { status: 400 }
      );
    }
    
    // Validate feedback type
    const validFeedback: UserFeedbackType[] = [
      'not_visible',
      'not_functional',
      'incorrect_behavior',
      'resolved',
    ];
    
    if (!validFeedback.includes(feedback)) {
      return NextResponse.json(
        {
          error: 'Invalid feedback type',
          details: `Feedback must be one of: ${validFeedback.join(', ')}`,
        },
        { status: 400 }
      );
    }
    
    // Process feedback
    const incident = await processUserFeedback(
      incidentId,
      feedback as UserFeedbackType,
      userId || 'user'
    );
    
    return NextResponse.json({
      success: true,
      incident,
      message: `Feedback '${feedback}' recorded successfully`,
      nextAction: incident.state === 'resolved' 
        ? 'Incident resolved'
        : 'Foreman will investigate and apply fixes',
    });
  } catch (error) {
    console.error('[Incident Verify API] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to process verification',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
