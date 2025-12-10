/**
 * CS4 Alerts API - Escalate Alert to Incident
 * POST /api/foreman/alerts/:id/escalate
 */

import { NextRequest, NextResponse } from 'next/server';
import { attachAlertToIncident } from '../../../../../../lib/foreman/alerts/alert-engine';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    if (!body.incidentId) {
      return NextResponse.json(
        { success: false, error: 'Incident ID is required' },
        { status: 400 }
      );
    }
    
    const alert = await attachAlertToIncident(params.id, body.incidentId);
    
    return NextResponse.json({
      success: true,
      alert,
      message: 'Alert escalated to incident successfully',
    });
  } catch (error) {
    console.error('Error escalating alert:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to escalate alert'
      },
      { status: 500 }
    );
  }
}
