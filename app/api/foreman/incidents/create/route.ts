/**
 * Incident Creation API
 * POST /api/foreman/incidents/create
 * 
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { createDeploymentIncident } from '@/lib/foreman/incidents/incident-engine';

/**
 * POST /api/foreman/incidents/create
 * Create a new incident for deployment verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { component, description, deploymentId, prUrl } = body;
    
    // Validate required fields
    if (!component || !description) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'component and description are required',
        },
        { status: 400 }
      );
    }
    
    // Create incident
    const incident = await createDeploymentIncident(
      component,
      description,
      deploymentId,
      prUrl
    );
    
    return NextResponse.json({
      success: true,
      incident,
      message: 'Incident created successfully',
    });
  } catch (error) {
    console.error('[Incident Create API] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to create incident',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
