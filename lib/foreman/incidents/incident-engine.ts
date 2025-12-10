/**
 * Incident Engine
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 * 
 * Orchestrates incident lifecycle, Foreman responses, and builder integration
 */

import {
  Incident,
  UserFeedbackType,
  createIncident,
  recordUserFeedback,
  addFixAttempt,
  addLessonLearned,
  markRequiresACR,
  resolveIncident,
  updateIncidentState,
} from './incident-model';
import { saveIncident, loadIncident } from './storage';
import { logGovernanceEvent } from '../memory/governance-memory';

/**
 * Strategy for responding to different feedback types
 */
interface IncidentResponse {
  strategy: string;
  actions: string[];
  requiresBuilder: boolean;
  builderType?: 'ui' | 'api' | 'schema' | 'integration' | 'qa';
}

/**
 * Create an incident for deployment verification
 */
export async function createDeploymentIncident(
  component: string,
  description: string,
  deploymentId?: string,
  prUrl?: string
): Promise<Incident> {
  const incident = await createIncident(component, description, deploymentId, prUrl);
  await saveIncident(incident);
  
  console.log(`[Incident Engine] Created incident ${incident.id} for ${component}`);
  
  return incident;
}

/**
 * Process user feedback and determine next steps
 */
export async function processUserFeedback(
  incidentId: string,
  feedback: UserFeedbackType,
  userId: string = 'user'
): Promise<Incident> {
  const incident = await loadIncident(incidentId);
  
  if (!incident) {
    throw new Error(`Incident ${incidentId} not found`);
  }
  
  // Record feedback
  await recordUserFeedback(incident, feedback, userId);
  await saveIncident(incident);
  
  console.log(`[Incident Engine] User feedback for ${incidentId}: ${feedback}`);
  
  // If resolved, we're done
  if (feedback === 'resolved') {
    await resolveIncident(incident, userId);
    await saveIncident(incident);
    
    // Generate lessons learned
    await generateLessonsLearned(incident);
    
    return incident;
  }
  
  // For non-resolved feedback, initiate fix workflow
  const response = determineResponse(feedback);
  
  await logGovernanceEvent({
    type: 'incident_response_planned',
    severity: 'medium',
    description: `Planned response for incident ${incidentId}: ${response.strategy}`,
    metadata: {
      incidentId,
      feedback,
      strategy: response.strategy,
      actions: response.actions,
      requiresBuilder: response.requiresBuilder,
    },
  });
  
  console.log(`[Incident Engine] Response strategy: ${response.strategy}`);
  console.log(`[Incident Engine] Actions:`, response.actions);
  
  return incident;
}

/**
 * Determine response strategy based on feedback type
 */
function determineResponse(feedback: UserFeedbackType): IncidentResponse {
  switch (feedback) {
    case 'not_visible':
      return {
        strategy: 'Verify build artifacts, routing, and UI generation',
        actions: [
          'Check build artifacts exist',
          'Verify routing configuration',
          'Confirm UI page generation',
          'Check for rendering errors',
          'Re-build if necessary',
          'Re-deploy',
          'Request verification',
        ],
        requiresBuilder: true,
        builderType: 'ui',
      };
    
    case 'not_functional':
      return {
        strategy: 'Inspect logs, re-run tests, diagnose state errors',
        actions: [
          'Inspect runtime logs',
          'Re-run unit tests',
          'Re-run integration tests',
          'Diagnose state management issues',
          'Fix code via builder',
          'Re-test',
          'Re-deploy',
          'Request verification',
        ],
        requiresBuilder: true,
        builderType: 'api',
      };
    
    case 'incorrect_behavior':
      return {
        strategy: 'Compare with expected behavior, check requirements',
        actions: [
          'Review original requirements',
          'Compare actual vs expected behavior',
          'Run requirement diff',
          'Recalculate logic',
          'Determine if ACR needed',
          'Fix implementation or request ACR',
          'Re-test',
          'Re-deploy',
          'Request verification',
        ],
        requiresBuilder: true,
        builderType: 'integration',
      };
    
    default:
      return {
        strategy: 'Unknown feedback type',
        actions: ['Escalate to human'],
        requiresBuilder: false,
      };
  }
}

/**
 * Record a fix attempt
 */
export async function recordFixAttempt(
  incidentId: string,
  strategy: string,
  description: string,
  qicPassed: boolean,
  qielPassed: boolean,
  builderId?: string,
  prUrl?: string
): Promise<Incident> {
  const incident = await loadIncident(incidentId);
  
  if (!incident) {
    throw new Error(`Incident ${incidentId} not found`);
  }
  
  await addFixAttempt(
    incident,
    strategy,
    description,
    qicPassed,
    qielPassed,
    builderId,
    prUrl
  );
  
  await saveIncident(incident);
  
  console.log(`[Incident Engine] Fix attempt #${incident.fix_attempts.length} recorded for ${incidentId}`);
  
  return incident;
}

/**
 * Mark incident as requiring ACR
 */
export async function flagForACR(
  incidentId: string,
  acrId?: string
): Promise<Incident> {
  const incident = await loadIncident(incidentId);
  
  if (!incident) {
    throw new Error(`Incident ${incidentId} not found`);
  }
  
  await markRequiresACR(incident, acrId);
  await saveIncident(incident);
  
  console.log(`[Incident Engine] Incident ${incidentId} flagged for ACR`);
  
  return incident;
}

/**
 * Generate lessons learned from resolved incident
 */
async function generateLessonsLearned(incident: Incident): Promise<void> {
  const lessons: string[] = [];
  
  // Analyze fix attempts
  if (incident.fix_attempts.length > 0) {
    lessons.push(`Resolved after ${incident.fix_attempts.length} fix attempt(s)`);
    
    const failedAttempts = incident.fix_attempts.filter(
      a => !a.qicPassed || !a.qielPassed
    );
    
    if (failedAttempts.length > 0) {
      lessons.push(`${failedAttempts.length} attempt(s) failed QA validation`);
    }
  }
  
  // Check for patterns
  if (incident.user_feedback === 'not_visible') {
    lessons.push('Initial deployment had visibility issues - strengthen build verification');
  } else if (incident.user_feedback === 'not_functional') {
    lessons.push('Functional issues found - enhance runtime testing');
  } else if (incident.user_feedback === 'incorrect_behavior') {
    lessons.push('Behavior mismatch - improve requirement validation');
  }
  
  // Add ACR flag if needed
  if (incident.requires_acr) {
    lessons.push('Architectural change required - consider preventive architecture review');
  }
  
  // Save lessons to incident
  for (const lesson of lessons) {
    await addLessonLearned(incident, lesson);
  }
  
  await saveIncident(incident);
  
  // Save to lessons-learned directory
  await saveLessonsToMemory(incident);
  
  console.log(`[Incident Engine] Generated ${lessons.length} lessons from incident ${incident.id}`);
}

/**
 * Save lessons learned to memory directory
 */
async function saveLessonsToMemory(incident: Incident): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const lessonsDir = path.join(process.cwd(), 'memory', 'lessons-learned');
  await fs.mkdir(lessonsDir, { recursive: true });
  
  const lessonFile = path.join(
    lessonsDir,
    `incident-${incident.id}.md`
  );
  
  const content = `# Lessons Learned: ${incident.component}

**Incident ID:** ${incident.id}
**Created:** ${incident.created_at}
**Resolved:** ${incident.resolved_at}
**Component:** ${incident.component}

## Description

${incident.description}

## User Feedback

${incident.user_feedback}

## Fix Attempts

${incident.fix_attempts.length > 0 
  ? incident.fix_attempts.map(a => `
### Attempt #${a.attemptNumber} - ${a.timestamp}

**Strategy:** ${a.strategy}
**Description:** ${a.description}
**QIC Passed:** ${a.qicPassed ? '✓' : '✗'}
**QIEL Passed:** ${a.qielPassed ? '✓' : '✗'}
${a.prUrl ? `**PR:** ${a.prUrl}` : ''}
`).join('\n')
  : 'No fix attempts required'}

## Lessons Learned

${incident.lessons_learned.map(l => `- ${l}`).join('\n')}

${incident.requires_acr ? `\n## Architecture Change Required\n\n${incident.acr_id ? `ACR ID: ${incident.acr_id}` : 'ACR pending'}` : ''}
`;
  
  await fs.writeFile(lessonFile, content, 'utf-8');
  
  console.log(`[Incident Engine] Saved lessons to ${lessonFile}`);
}

/**
 * Check if incident can be auto-closed (should always return false per CS3)
 */
export function canAutoClose(incident: Incident): boolean {
  // Per CS3 requirements: incidents CANNOT auto-close
  // Only user confirmation via "Resolved" button can close incidents
  return false;
}

/**
 * Get recommended next action for an incident
 */
export function getNextAction(incident: Incident): string {
  switch (incident.state) {
    case 'pending':
      return 'Awaiting user verification';
    case 'investigating':
      return 'Foreman is analyzing the issue';
    case 'fixing':
      return 'Foreman is applying fixes via builder';
    case 'awaiting-verification':
      return 'Fix deployed - awaiting user re-verification';
    case 'resolved':
      return 'Incident resolved by user';
    default:
      return 'Unknown state';
  }
}
