/**
 * CS4 Alerts API - Create Alert
 * POST /api/foreman/alerts/create
 * 
 * Creates a new governance alert
 */

import { NextRequest, NextResponse } from 'next/server';
import { raiseAlert, raiseCriticalAlert } from '../../../../../lib/foreman/alerts/alert-engine';
import { AlertType, AlertCategory, AlertSeverity } from '../../../../../lib/foreman/alerts/alert-model';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.category) {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      );
    }
    
    if (!body.message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    if (!body.details) {
      return NextResponse.json(
        { success: false, error: 'Details are required' },
        { status: 400 }
      );
    }
    
    // Determine if critical alert
    const isCritical = body.severity === 5 || body.type === 'critical';
    
    let alert;
    if (isCritical) {
      alert = await raiseCriticalAlert({
        category: body.category as AlertCategory,
        message: body.message,
        details: body.details,
        metadata: body.metadata,
      });
    } else {
      alert = await raiseAlert({
        type: (body.type || 'medium') as AlertType,
        category: body.category as AlertCategory,
        message: body.message,
        details: body.details,
        severity: (body.severity || 3) as AlertSeverity,
        metadata: body.metadata,
      });
    }
    
    return NextResponse.json({
      success: true,
      alert,
      message: 'Alert created successfully',
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create alert'
      },
      { status: 500 }
    );
  }
}
