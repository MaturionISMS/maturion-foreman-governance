/**
 * Incident Recorder
 * Simple wrapper for recording incidents to CS3 Incident Feedback Loop
 */

import { recordIncident as engineRecordIncident } from './incident-engine'
import { Incident } from './incident-model'

export interface IncidentInput {
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  metadata?: Record<string, any>
}

/**
 * Record an incident to the CS3 Incident Feedback Loop
 */
export async function recordIncident(input: IncidentInput): Promise<void> {
  const incident: Partial<Incident> = {
    type: input.type,
    severity: input.severity,
    description: input.description,
    metadata: input.metadata,
    timestamp: new Date().toISOString(),
    status: 'open'
  }
  
  await engineRecordIncident(incident as Incident)
}
