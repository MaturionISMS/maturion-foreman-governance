/**
 * Incident Storage
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 * 
 * Manages persistent storage of incidents in the memory directory
 */

import fs from 'fs/promises';
import path from 'path';
import { Incident } from './incident-model';

const INCIDENTS_DIR = path.join(process.cwd(), 'memory', 'incidents');

/**
 * Ensure incidents directory exists
 */
async function ensureIncidentsDirectory(): Promise<void> {
  try {
    await fs.mkdir(INCIDENTS_DIR, { recursive: true });
  } catch (error) {
    console.error('[Incident Storage] Failed to create incidents directory:', error);
    throw error;
  }
}

/**
 * Get incident file path
 */
function getIncidentPath(incidentId: string): string {
  return path.join(INCIDENTS_DIR, `${incidentId}.json`);
}

/**
 * Save an incident to storage
 */
export async function saveIncident(incident: Incident): Promise<void> {
  await ensureIncidentsDirectory();
  
  const incidentPath = getIncidentPath(incident.id);
  
  try {
    await fs.writeFile(
      incidentPath,
      JSON.stringify(incident, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error(`[Incident Storage] Failed to save incident ${incident.id}:`, error);
    throw error;
  }
}

/**
 * Load an incident from storage
 */
export async function loadIncident(incidentId: string): Promise<Incident | null> {
  const incidentPath = getIncidentPath(incidentId);
  
  try {
    const data = await fs.readFile(incidentPath, 'utf-8');
    return JSON.parse(data) as Incident;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    console.error(`[Incident Storage] Failed to load incident ${incidentId}:`, error);
    throw error;
  }
}

/**
 * List all incidents
 */
export async function listIncidents(): Promise<Incident[]> {
  await ensureIncidentsDirectory();
  
  try {
    const files = await fs.readdir(INCIDENTS_DIR);
    const incidentFiles = files.filter(f => f.endsWith('.json'));
    
    const incidents: Incident[] = [];
    
    for (const file of incidentFiles) {
      const incidentPath = path.join(INCIDENTS_DIR, file);
      const data = await fs.readFile(incidentPath, 'utf-8');
      incidents.push(JSON.parse(data) as Incident);
    }
    
    // Sort by creation date (newest first)
    incidents.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    return incidents;
  } catch (error) {
    console.error('[Incident Storage] Failed to list incidents:', error);
    throw error;
  }
}

/**
 * Get active (unresolved) incidents
 */
export async function getActiveIncidents(): Promise<Incident[]> {
  const allIncidents = await listIncidents();
  return allIncidents.filter(i => i.state !== 'resolved');
}

/**
 * Get resolved incidents
 */
export async function getResolvedIncidents(): Promise<Incident[]> {
  const allIncidents = await listIncidents();
  return allIncidents.filter(i => i.state === 'resolved');
}

/**
 * Delete an incident (use with caution - mainly for testing)
 */
export async function deleteIncident(incidentId: string): Promise<void> {
  const incidentPath = getIncidentPath(incidentId);
  
  try {
    await fs.unlink(incidentPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`[Incident Storage] Failed to delete incident ${incidentId}:`, error);
      throw error;
    }
  }
}

/**
 * Get incidents for a specific component
 */
export async function getIncidentsByComponent(component: string): Promise<Incident[]> {
  const allIncidents = await listIncidents();
  return allIncidents.filter(i => i.component === component);
}

/**
 * Get incidents requiring ACR
 */
export async function getIncidentsRequiringACR(): Promise<Incident[]> {
  const allIncidents = await listIncidents();
  return allIncidents.filter(i => i.requires_acr && !i.acr_id);
}
