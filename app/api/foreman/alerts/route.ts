/**
 * CS4 Alerts API - List Alerts
 * GET /api/foreman/alerts
 * 
 * Lists all alerts with optional filtering
 */

import { NextRequest, NextResponse } from 'next/server';
import { getActiveAlerts, getAlert } from '../../../../lib/foreman/alerts/alert-engine';
import { listAlerts } from '../../../../lib/foreman/alerts/storage';
import { AlertCategory, AlertType, AlertState } from '../../../../lib/foreman/alerts/alert-model';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if requesting specific alert
    const id = searchParams.get('id');
    if (id) {
      const alert = await getAlert(id);
      if (!alert) {
        return NextResponse.json(
          { success: false, error: 'Alert not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        alert,
      });
    }
    
    // Build filter from query params
    const filter: any = {};
    
    const category = searchParams.get('category');
    if (category) {
      filter.category = category as AlertCategory;
    }
    
    const type = searchParams.get('type');
    if (type) {
      filter.type = type as AlertType;
    }
    
    const state = searchParams.get('state');
    if (state) {
      filter.state = state as AlertState;
    }
    
    const limit = searchParams.get('limit');
    if (limit) {
      filter.limit = parseInt(limit, 10);
    }
    
    // Get alerts
    const alerts = await listAlerts(filter);
    
    return NextResponse.json({
      success: true,
      alerts,
      total: alerts.length,
    });
  } catch (error) {
    console.error('Error listing alerts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to list alerts'
      },
      { status: 500 }
    );
  }
}
