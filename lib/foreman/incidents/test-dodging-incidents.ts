/**
 * Test Dodging Incident System
 * 
 * Handles registration, tracking, and resolution of Test Dodging incidents.
 * Integrates with existing incident system and governance memory.
 * 
 * Architecture: /foreman/architecture/test-dodging-integration-architecture.md
 */

import { TestDodgingSignal } from '../qa/test-dodging-detector';
import { TestDodgingAnalysis } from '../qa/test-dodging-analyzer';
import { logGovernanceEvent } from '../memory/governance-memory';

export interface TestDodgingIncident {
  id: string;
  type: 'test_dodging';
  created: string;
  updated: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'fixing' | 'resolved';
  signals: TestDodgingSignal[];
  analysis?: TestDodgingAnalysis;
  remediationPlan?: any;
  escalated?: boolean;
  escalatedTo?: string;
  resolution?: Resolution;
}

export interface Resolution {
  type: 'tests_corrected' | 'implementation_fixed' | 'false_positive';
  details: string;
  qaPassed: boolean;
  timestamp: string;
}

export interface TestDodgingIncidentSystem {
  registerIncident(signal: TestDodgingSignal, analysis?: TestDodgingAnalysis): Promise<TestDodgingIncident>;
  consolidateIncidents(signals: TestDodgingSignal[]): Promise<TestDodgingIncident>;
  resolveIncident(incidentId: string, resolution: Resolution): Promise<void>;
}

/**
 * Register a new test dodging incident
 */
export async function registerTestDodgingIncident(
  signal: TestDodgingSignal,
  analysis?: TestDodgingAnalysis
): Promise<TestDodgingIncident> {
  const now = new Date().toISOString();
  const id = `test-dodging-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Determine severity from signal confidence and type
  const severity = determineSeverity(signal);

  const incident: TestDodgingIncident = {
    id,
    type: 'test_dodging',
    created: now,
    updated: now,
    severity,
    status: 'open',
    signals: [signal],
    analysis,
    escalated: true,
    escalatedTo: 'Foreman',
  };

  // Log to governance memory
  await logGovernanceEvent({
    type: 'test_dodging_incident_created',
    severity: severity === 'critical' ? 'critical' : 'high',
    description: `Test Dodging incident created: ${signal.type} (${signal.confidence} confidence)`,
    metadata: {
      incidentId: id,
      signalType: signal.type,
      confidence: signal.confidence,
      location: signal.location,
    },
  });

  return incident;
}

/**
 * Resolve a test dodging incident
 */
export async function resolveTestDodgingIncident(
  incidentId: string,
  resolution: Resolution
): Promise<void> {
  // Validate that QA passed before allowing resolution
  if (!resolution.qaPassed) {
    throw new Error('Cannot resolve: QA must pass before incident can be resolved');
  }

  // Log resolution to governance memory
  await logGovernanceEvent({
    type: 'test_dodging_incident_resolved',
    severity: 'info',
    description: `Test Dodging incident ${incidentId} resolved: ${resolution.type}`,
    metadata: {
      incidentId,
      resolutionType: resolution.type,
      details: resolution.details,
      qaPassed: resolution.qaPassed,
    },
  });
}

/**
 * Consolidate multiple signals into a single incident
 */
export async function consolidateIncidents(
  signals: TestDodgingSignal[]
): Promise<TestDodgingIncident> {
  if (signals.length === 0) {
    throw new Error('Cannot consolidate: no signals provided');
  }

  const now = new Date().toISOString();
  const id = `test-dodging-consolidated-${Date.now()}`;

  // Determine overall severity (highest among signals)
  const severity = signals.reduce((highest, signal) => {
    const signalSeverity = determineSeverity(signal);
    if (severityRank(signalSeverity) > severityRank(highest)) {
      return signalSeverity;
    }
    return highest;
  }, 'low' as 'critical' | 'high' | 'medium' | 'low');

  const incident: TestDodgingIncident = {
    id,
    type: 'test_dodging',
    created: now,
    updated: now,
    severity,
    status: 'open',
    signals,
    escalated: true,
    escalatedTo: 'Foreman',
  };

  // Log consolidated incident
  await logGovernanceEvent({
    type: 'test_dodging_incident_created',
    severity: severity === 'critical' ? 'critical' : 'high',
    description: `Consolidated Test Dodging incident created from ${signals.length} signals`,
    metadata: {
      incidentId: id,
      signalCount: signals.length,
      signalTypes: signals.map(s => s.type),
    },
  });

  return incident;
}

/**
 * Determine severity from signal
 */
function determineSeverity(signal: TestDodgingSignal): 'critical' | 'high' | 'medium' | 'low' {
  // Empty tests are always critical
  if (signal.type === 'empty_test' && signal.confidence === 'high') {
    return 'critical';
  }

  // High confidence assertion weakening is critical
  if (signal.type === 'assertion_weakening' && signal.confidence === 'high') {
    return 'critical';
  }

  // High confidence signals are at least high severity
  if (signal.confidence === 'high') {
    return 'high';
  }

  // Medium confidence
  if (signal.confidence === 'medium') {
    return 'medium';
  }

  // Low confidence
  return 'low';
}

/**
 * Get numeric rank for severity (for comparison)
 */
function severityRank(severity: 'critical' | 'high' | 'medium' | 'low'): number {
  switch (severity) {
    case 'critical': return 4;
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
  }
}
