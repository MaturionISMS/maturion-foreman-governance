/**
 * Incidents API
 * GET /api/foreman/incidents - List all incidents
 * GET /api/foreman/incidents?id=xxx - Get specific incident
 * 
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { listIncidents, loadIncident, getActiveIncidents } from '@/lib/foreman/incidents/storage';

/**
 * GET /api/foreman/incidents
 * List incidents or get a specific incident
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const activeOnly = searchParams.get('active') === 'true';
    
    // Get specific incident
    if (id) {
      const incident = await loadIncident(id);
      
      if (!incident) {
        return NextResponse.json(
          {
            error: 'Incident not found',
            details: `No incident found with ID ${id}`,
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        incident,
      });
    }
    
    // List incidents
    const incidents = activeOnly 
      ? await getActiveIncidents()
      : await listIncidents();
    
    return NextResponse.json({
      success: true,
      incidents,
      count: incidents.length,
    });
  } catch (error) {
    console.error('[Incidents API] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to retrieve incidents',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
