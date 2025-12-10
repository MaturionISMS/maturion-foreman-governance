/**
 * Incident Model & Governance Memory Integration
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 * 
 * This module defines the incident data model and integrates with governance memory
 * to track deployment verification, user feedback, and incident lifecycle.
 */

import { logGovernanceEvent } from '../memory/governance-memory';

/**
 * Incident States
 * Represents the lifecycle of an incident from creation to resolution
 */
export type IncidentState = 
  | 'pending'           // Awaiting initial user verification
  | 'investigating'     // FM is analyzing the issue
  | 'fixing'            // FM is applying fixes via builder
  | 'awaiting-verification' // Fix deployed, awaiting user re-verification
  | 'resolved';         // User confirmed resolution

/**
 * User Feedback Types
 * The four feedback options available to users for verification
 */
export type UserFeedbackType =
  | 'not_visible'       // Feature not visible in UI
  | 'not_functional'    // Feature visible but not working
  | 'incorrect_behavior' // Feature works but behaves incorrectly
  | 'resolved';         // Feature working as expected

/**
 * Fix Attempt Log
 * Records each attempt FM makes to resolve an incident
 */
export interface FixAttempt {
  attemptNumber: number;
  timestamp: string;
  strategy: string;
  builderId?: string;
  prUrl?: string;
  description: string;
  qicPassed: boolean;
  qielPassed: boolean;
  notes?: string;
}

/**
 * Incident Record
 * Complete incident data structure
 */
export interface Incident {
  id: string;
  created_at: string;
  updated_at: string;
  component: string;
  description: string;
  
  // State tracking
  state: IncidentState;
  user_feedback: UserFeedbackType | null;
  
  // Fix tracking
  fix_attempts: FixAttempt[];
  
  // Learning and improvement
  lessons_learned: string[];
  requires_acr: boolean;
  acr_id?: string;
  
  // References
  deployment_id?: string;
  pr_url?: string;
  
  // Resolution
  resolved_at?: string;
  resolved_by?: string;
}

/**
 * Create a new incident
 */
export async function createIncident(
  component: string,
  description: string,
  deploymentId?: string,
  prUrl?: string
): Promise<Incident> {
  const now = new Date().toISOString();
  const id = `incident_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  
  const incident: Incident = {
    id,
    created_at: now,
    updated_at: now,
    component,
    description,
    state: 'pending',
    user_feedback: null,
    fix_attempts: [],
    lessons_learned: [],
    requires_acr: false,
    deployment_id: deploymentId,
    pr_url: prUrl,
  };
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_created',
    severity: 'medium',
    description: `New incident created for ${component}: ${description}`,
    metadata: {
      incidentId: id,
      component,
      deploymentId,
      prUrl,
    },
  });
  
  return incident;
}

/**
 * Update incident state
 */
export async function updateIncidentState(
  incident: Incident,
  newState: IncidentState,
  notes?: string
): Promise<Incident> {
  const oldState = incident.state;
  
  incident.state = newState;
  incident.updated_at = new Date().toISOString();
  
  // Log state transition to governance memory
  await logGovernanceEvent({
    type: 'incident_state_changed',
    severity: newState === 'resolved' ? 'low' : 'medium',
    description: `Incident ${incident.id} state changed: ${oldState} → ${newState}`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      oldState,
      newState,
      notes,
    },
  });
  
  return incident;
}

/**
 * Record user feedback on an incident
 */
export async function recordUserFeedback(
  incident: Incident,
  feedback: UserFeedbackType,
  userId?: string
): Promise<Incident> {
  incident.user_feedback = feedback;
  incident.updated_at = new Date().toISOString();
  
  // Update state based on feedback
  if (feedback === 'resolved') {
    incident.state = 'resolved';
    incident.resolved_at = new Date().toISOString();
    if (userId) {
      incident.resolved_by = userId;
    }
  } else {
    // Non-resolved feedback triggers investigation or fixing
    incident.state = incident.state === 'pending' ? 'investigating' : 'fixing';
  }
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_user_feedback',
    severity: feedback === 'resolved' ? 'low' : 'high',
    description: `User feedback received for incident ${incident.id}: ${feedback}`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      feedback,
      currentState: incident.state,
    },
  });
  
  return incident;
}

/**
 * Add a fix attempt to an incident
 */
export async function addFixAttempt(
  incident: Incident,
  strategy: string,
  description: string,
  qicPassed: boolean,
  qielPassed: boolean,
  builderId?: string,
  prUrl?: string
): Promise<Incident> {
  const attemptNumber = incident.fix_attempts.length + 1;
  
  const fixAttempt: FixAttempt = {
    attemptNumber,
    timestamp: new Date().toISOString(),
    strategy,
    builderId,
    prUrl,
    description,
    qicPassed,
    qielPassed,
  };
  
  incident.fix_attempts.push(fixAttempt);
  incident.updated_at = new Date().toISOString();
  
  // If fix passed QA, move to awaiting verification
  if (qicPassed && qielPassed) {
    incident.state = 'awaiting-verification';
  }
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_fix_attempt',
    severity: qicPassed && qielPassed ? 'low' : 'medium',
    description: `Fix attempt #${attemptNumber} for incident ${incident.id}: ${strategy}`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      attemptNumber,
      strategy,
      qicPassed,
      qielPassed,
      builderId,
      prUrl,
    },
  });
  
  return incident;
}

/**
 * Add a lesson learned to an incident
 */
export async function addLessonLearned(
  incident: Incident,
  lesson: string
): Promise<Incident> {
  incident.lessons_learned.push(lesson);
  incident.updated_at = new Date().toISOString();
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_lesson_learned',
    severity: 'info',
    description: `Lesson learned recorded for incident ${incident.id}`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      lesson,
    },
  });
  
  return incident;
}

/**
 * Mark incident as requiring Architecture Change Request (ACR)
 */
export async function markRequiresACR(
  incident: Incident,
  acrId?: string
): Promise<Incident> {
  incident.requires_acr = true;
  if (acrId) {
    incident.acr_id = acrId;
  }
  incident.updated_at = new Date().toISOString();
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_requires_acr',
    severity: 'high',
    description: `Incident ${incident.id} flagged for Architecture Change Request`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      acrId,
      reason: 'Structural issue detected requiring architectural changes',
    },
  });
  
  return incident;
}

/**
 * Resolve an incident (only called when user confirms resolution)
 */
export async function resolveIncident(
  incident: Incident,
  resolvedBy: string
): Promise<Incident> {
  if (incident.state === 'resolved') {
    return incident;
  }
  
  incident.state = 'resolved';
  incident.resolved_at = new Date().toISOString();
  incident.resolved_by = resolvedBy;
  incident.updated_at = new Date().toISOString();
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'incident_resolved',
    severity: 'low',
    description: `Incident ${incident.id} resolved by ${resolvedBy}`,
    metadata: {
      incidentId: incident.id,
      component: incident.component,
      resolvedBy,
      totalFixAttempts: incident.fix_attempts.length,
      lessonsLearned: incident.lessons_learned.length,
      requiresACR: incident.requires_acr,
    },
  });
  
  return incident;
}
