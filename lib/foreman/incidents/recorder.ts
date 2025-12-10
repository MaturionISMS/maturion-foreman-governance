/**
 * Incident Recorder
 * Simple wrapper for recording incidents to CS3 Incident Feedback Loop
 */

import { createIncident } from './incident-model'
import { saveIncident } from './storage'

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
  // Use type as component name
  const incident = await createIncident(
    input.type,
    input.description,
    input.metadata?.deploymentId,
    input.metadata?.prUrl
  )
  
  await saveIncident(incident)
}
