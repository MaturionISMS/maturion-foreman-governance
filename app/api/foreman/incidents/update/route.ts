/**
 * Incident Update API
 * POST /api/foreman/incidents/update
 * 
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadIncident, saveIncident } from '@/lib/foreman/incidents/storage';
import { updateIncidentState } from '@/lib/foreman/incidents/incident-model';
import type { IncidentState } from '@/lib/foreman/incidents/incident-model';

/**
 * POST /api/foreman/incidents/update
 * Update an incident's state or properties
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { incidentId, state, notes } = body;
    
    // Validate required fields
    if (!incidentId) {
      return NextResponse.json(
        {
          error: 'Missing required field',
          details: 'incidentId is required',
        },
        { status: 400 }
      );
    }
    
    // Load incident
    const incident = await loadIncident(incidentId);
    
    if (!incident) {
      return NextResponse.json(
        {
          error: 'Incident not found',
          details: `No incident found with ID ${incidentId}`,
        },
        { status: 404 }
      );
    }
    
    // Update state if provided
    if (state) {
      await updateIncidentState(incident, state as IncidentState, notes);
    }
    
    // Save updated incident
    await saveIncident(incident);
    
    return NextResponse.json({
      success: true,
      incident,
      message: 'Incident updated successfully',
    });
  } catch (error) {
    console.error('[Incident Update API] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to update incident',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
