/**
 * CS4 Governance Alerts QIC Test Suite
 * 
 * This test suite validates the CS4 Governance Alert System implementation.
 * According to Build Philosophy: These tests MUST be RED before implementation.
 * 
 * Test Coverage:
 * - Alert model functions
 * - Alert engine core functions
 * - Alert storage operations
 * - Governance memory integration
 * - Alert state transitions
 * - Alert severity enforcement
 * 
 * Quality Gates:
 * - All tests must pass (100%)
 * - Zero errors
 * - Zero warnings
 */

import * as path from 'path';
import * as fs from 'fs/promises';

// Import alert system modules
import {
  createAlert,
  acknowledgeAlert,
  dismissAlert,
  escalateToIncident,
  Alert,
  AlertType,
  AlertCategory,
  AlertSeverity,
  AlertState,
} from '../../lib/foreman/alerts/alert-model';

import {
  raiseAlert,
  raiseCriticalAlert,
  attachAlertToIncident,
  getActiveAlerts,
  getAlert,
  acknowledgeAlertById,
  dismissAlertById,
} from '../../lib/foreman/alerts/alert-engine';

import {
  saveAlert,
  loadAlert,
  listAlerts,
  getActiveAlerts as storageGetActiveAlerts,
  getCriticalAlerts,
} from '../../lib/foreman/alerts/storage';

import {
  queryGovernanceEvents,
  clearGovernanceEvents,
} from '../../lib/foreman/memory/governance-memory';

// Test utilities
interface TestResult {
  passed: boolean;
  message: string;
  error?: any;
}

const testResults: TestResult[] = [];
const tests: Array<{ name: string; fn: () => Promise<void> | void }> = [];

function test(name: string, fn: () => Promise<void> | void): void {
  tests.push({ name, fn });
}

async function runTests(): Promise<void> {
  for (const { name, fn } of tests) {
    try {
      await fn();
      testResults.push({ passed: true, message: `✓ ${name}` });
      console.log(`✓ ${name}`);
    } catch (error) {
      testResults.push({ passed: false, message: `✗ ${name}`, error });
      console.error(`✗ ${name}`);
      console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

async function cleanup(): Promise<void> {
  // Clean up test alert files and index
  const alertsDir = path.join(process.cwd(), 'memory', 'alerts');
  try {
    const files = await fs.readdir(alertsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        await fs.unlink(path.join(alertsDir, file));
      }
    }
  } catch (error) {
    // Directory might not exist yet
  }
  
  // Clear governance events
  clearGovernanceEvents();
}

// ============================================================================
// TEST SUITE: Alert Model
// ============================================================================

test('Alert Model: createAlert() creates alert with all required fields', () => {
  const alert = createAlert({
    type: 'high',
    category: 'qiel',
    message: 'QIEL test failed',
    details: 'QIEL validation detected schema mismatch in environment diff',
    severity: 5,
    requires_ack: true,
    sound: true,
  });

  if (!alert.id) throw new Error('Alert ID not generated');
  if (!alert.timestamp) throw new Error('Alert timestamp not generated');
  if (alert.type !== 'high') throw new Error('Alert type incorrect');
  if (alert.category !== 'qiel') throw new Error('Alert category incorrect');
  if (alert.severity !== 5) throw new Error('Alert severity incorrect');
  if (alert.requires_ack !== true) throw new Error('Alert requires_ack incorrect');
  if (alert.sound !== true) throw new Error('Alert sound incorrect');
  if (alert.state !== 'active') throw new Error('Alert state should default to active');
});

test('Alert Model: createAlert() auto-generates ID with correct format', () => {
  const alert = createAlert({
    type: 'medium',
    category: 'drift',
    message: 'Drift detected',
    details: 'Configuration drift in deployment settings',
    severity: 3,
  });

  if (!alert.id.startsWith('alert_')) throw new Error('Alert ID must start with alert_');
  if (alert.id.length < 20) throw new Error('Alert ID too short');
});

test('Alert Model: acknowledgeAlert() updates alert state correctly', () => {
  const alert = createAlert({
    type: 'high',
    category: 'guardrail',
    message: 'Guardrail violation',
    details: 'Unauthorized modification detected',
    severity: 5,
    requires_ack: true,
  });

  const acknowledged = acknowledgeAlert(alert, 'user_123');

  if (acknowledged.state !== 'acknowledged') throw new Error('Alert state not updated');
  if (acknowledged.acknowledged_by !== 'user_123') throw new Error('acknowledged_by not set');
  if (!acknowledged.acknowledged_at) throw new Error('acknowledged_at not set');
});

test('Alert Model: dismissAlert() fails if requires_ack=true and not acknowledged', () => {
  const alert = createAlert({
    type: 'high',
    category: 'pr',
    message: 'PR validation failed',
    details: 'Missing tests detected',
    severity: 4,
    requires_ack: true,
  });

  try {
    dismissAlert(alert, 'user_123');
    throw new Error('Should have thrown error for dismissing unacknowledged alert');
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('must be acknowledged')) {
      throw new Error('Wrong error type or message');
    }
  }
});

test('Alert Model: dismissAlert() succeeds if acknowledged', () => {
  const alert = createAlert({
    type: 'high',
    category: 'qa',
    message: 'QA failure',
    details: 'Test suite failed',
    severity: 4,
    requires_ack: true,
  });

  const acknowledged = acknowledgeAlert(alert, 'user_123');
  const dismissed = dismissAlert(acknowledged, 'user_123');

  if (!(dismissed instanceof Error)) {
    if (dismissed.state !== 'dismissed') throw new Error('Alert state not updated');
    if (!dismissed.dismissed_at) throw new Error('dismissed_at not set');
    if (dismissed.dismissed_by !== 'user_123') throw new Error('dismissed_by not set');
  } else {
    throw dismissed;
  }
});

test('Alert Model: escalateToIncident() updates alert with incident ID', () => {
  const alert = createAlert({
    type: 'high',
    category: 'builder',
    message: 'Builder violation',
    details: 'Builder attempted forbidden action',
    severity: 5,
  });

  const escalated = escalateToIncident(alert, 'incident_123');

  if (escalated.incident_id !== 'incident_123') throw new Error('incident_id not set');
  if (escalated.state !== 'escalated') throw new Error('Alert state not updated to escalated');
});

// ============================================================================
// TEST SUITE: Alert Engine
// ============================================================================

test('Alert Engine: raiseAlert() creates and persists alert', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'medium',
    category: 'deployment',
    message: 'Deployment check skipped',
    details: 'Preview build check was skipped in CI',
    severity: 3,
  });

  if (!alert.id) throw new Error('Alert not created');
  if (alert.type !== 'medium') throw new Error('Alert type incorrect');
  
  // Verify it was saved
  const loaded = await loadAlert(alert.id);
  if (!loaded) throw new Error('Alert not persisted to storage');
});

test('Alert Engine: raiseCriticalAlert() sets correct defaults', async () => {
  await cleanup();
  
  const alert = await raiseCriticalAlert({
    category: 'unauthorized',
    message: 'Unauthorized action detected',
    details: 'FM attempted privilege escalation',
  });

  if (alert.type !== 'high') throw new Error('Critical alert should be type high');
  if (alert.severity !== 5) throw new Error('Critical alert should be severity 5');
  if (alert.requires_ack !== true) throw new Error('Critical alert should require acknowledgment');
  if (alert.sound !== true) throw new Error('Critical alert should play sound');
});

test('Alert Engine: raiseAlert() logs to governance memory', async () => {
  await cleanup();
  
  await raiseAlert({
    type: 'high',
    category: 'qiel',
    message: 'QIEL failure',
    details: 'QIEL validation failed',
    severity: 5,
  });

  const events = queryGovernanceEvents({ type: 'governance_ping_high', limit: 1 });
  if (events.length === 0) throw new Error('Alert not logged to governance memory');
  if (events[0].type !== 'governance_ping_high') throw new Error('Wrong event type logged');
});

test('Alert Engine: getActiveAlerts() returns only active alerts', async () => {
  await cleanup();
  
  // Create active alert
  const alert1 = await raiseAlert({
    type: 'high',
    category: 'drift',
    message: 'Drift detected',
    details: 'Config drift',
    severity: 4,
  });

  // Create and dismiss another alert
  const alert2 = await raiseAlert({
    type: 'medium',
    category: 'qa',
    message: 'QA warning',
    details: 'Minor issue',
    severity: 2,
  });
  await dismissAlertById(alert2.id, 'user_123');

  const activeAlerts = await getActiveAlerts();
  
  if (activeAlerts.length !== 1) throw new Error('Should return only 1 active alert');
  if (activeAlerts[0].id !== alert1.id) throw new Error('Wrong alert returned');
});

test('Alert Engine: acknowledgeAlertById() updates alert state', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'high',
    category: 'architecture',
    message: 'Architecture violation',
    details: 'Change without ACR',
    severity: 5,
    metadata: { requiresAck: true },
  });

  const acknowledged = await acknowledgeAlertById(alert.id, 'user_123');
  
  if (acknowledged.state !== 'acknowledged') throw new Error('Alert not acknowledged');
  if (acknowledged.acknowledged_by !== 'user_123') throw new Error('acknowledged_by not set');
});

test('Alert Engine: attachAlertToIncident() links alert to incident', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'high',
    category: 'deployment',
    message: 'Deployment failed',
    details: 'Build check failed',
    severity: 4,
  });

  const linked = await attachAlertToIncident(alert.id, 'incident_456');
  
  if (linked.incident_id !== 'incident_456') throw new Error('Alert not linked to incident');
  if (linked.state !== 'escalated') throw new Error('Alert state not updated');
});

// ============================================================================
// TEST SUITE: Alert Storage
// ============================================================================

test('Alert Storage: saveAlert() persists alert to file', async () => {
  await cleanup();
  
  const alert = createAlert({
    type: 'high',
    category: 'suppression',
    message: 'Suppression attempt detected',
    details: 'Error suppression detected in logs',
    severity: 5,
  });

  await saveAlert(alert);

  const alertPath = path.join(process.cwd(), 'memory', 'alerts', `${alert.id}.json`);
  const fileExists = await fs.access(alertPath).then(() => true).catch(() => false);
  
  if (!fileExists) throw new Error('Alert file not created');
});

test('Alert Storage: loadAlert() retrieves alert from file', async () => {
  await cleanup();
  
  const alert = createAlert({
    type: 'medium',
    category: 'drift',
    message: 'Config drift',
    details: 'Environment configuration changed',
    severity: 3,
  });

  await saveAlert(alert);
  const loaded = await loadAlert(alert.id);

  if (!loaded) throw new Error('Alert not loaded');
  if (loaded.id !== alert.id) throw new Error('Wrong alert loaded');
  if (loaded.message !== alert.message) throw new Error('Alert message incorrect');
});

test('Alert Storage: loadAlert() returns null for non-existent alert', async () => {
  const loaded = await loadAlert('alert_nonexistent_123');
  if (loaded !== null) throw new Error('Should return null for non-existent alert');
});

test('Alert Storage: listAlerts() returns all alerts', async () => {
  await cleanup();
  
  // Create multiple alerts
  const alert1 = createAlert({
    type: 'high',
    category: 'qiel',
    message: 'QIEL 1',
    details: 'Details 1',
    severity: 5,
  });
  const alert2 = createAlert({
    type: 'medium',
    category: 'drift',
    message: 'Drift 1',
    details: 'Details 2',
    severity: 3,
  });

  await saveAlert(alert1);
  await saveAlert(alert2);

  const alerts = await listAlerts();
  
  if (alerts.length < 2) throw new Error('Not all alerts returned');
  const ids = alerts.map(a => a.id);
  if (!ids.includes(alert1.id)) throw new Error('Alert 1 not in list');
  if (!ids.includes(alert2.id)) throw new Error('Alert 2 not in list');
});

test('Alert Storage: listAlerts() filters by category', async () => {
  await cleanup();
  
  const alert1 = createAlert({
    type: 'high',
    category: 'qiel',
    message: 'QIEL alert',
    details: 'QIEL details',
    severity: 5,
  });
  const alert2 = createAlert({
    type: 'medium',
    category: 'drift',
    message: 'Drift alert',
    details: 'Drift details',
    severity: 3,
  });

  await saveAlert(alert1);
  await saveAlert(alert2);

  const qielAlerts = await listAlerts({ category: 'qiel' });
  
  if (qielAlerts.length === 0) throw new Error('No QIEL alerts returned');
  if (qielAlerts.some(a => a.category !== 'qiel')) throw new Error('Non-QIEL alerts returned');
});

test('Alert Storage: getCriticalAlerts() returns only high-severity alerts', async () => {
  await cleanup();
  
  const alert1 = createAlert({
    type: 'high',
    category: 'guardrail',
    message: 'Critical alert',
    details: 'Details',
    severity: 5,
  });
  const alert2 = createAlert({
    type: 'low',
    category: 'qa',
    message: 'Low priority alert',
    details: 'Details',
    severity: 1,
  });

  await saveAlert(alert1);
  await saveAlert(alert2);

  const criticalAlerts = await getCriticalAlerts();
  
  if (criticalAlerts.length === 0) throw new Error('No critical alerts returned');
  if (criticalAlerts.some(a => a.severity < 4)) throw new Error('Non-critical alerts returned');
});

// ============================================================================
// TEST SUITE: Governance Integration
// ============================================================================

test('Governance: Alert creation logs governance_ping_high event', async () => {
  await cleanup();
  
  await raiseCriticalAlert({
    category: 'guardrail',
    message: 'Critical violation',
    details: 'Guardrail hash mismatch',
  });

  const events = queryGovernanceEvents({ type: 'governance_ping_high', limit: 1 });
  
  if (events.length === 0) throw new Error('No governance event logged');
  if (events[0].severity !== 'critical') throw new Error('Wrong severity logged');
});

test('Governance: Alert acknowledgment logs alert_acknowledged event', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'high',
    category: 'pr',
    message: 'PR issue',
    details: 'Missing tests',
    severity: 4,
  });

  await acknowledgeAlertById(alert.id, 'user_123');

  const events = queryGovernanceEvents({ type: 'alert_acknowledged', limit: 1 });
  
  if (events.length === 0) throw new Error('Acknowledgment not logged');
});

test('Governance: Alert dismissal logs alert_dismissed event', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'medium',
    category: 'qa',
    message: 'QA warning',
    details: 'Deprecated API',
    severity: 2,
  });

  await dismissAlertById(alert.id, 'user_123');

  const events = queryGovernanceEvents({ type: 'alert_dismissed', limit: 1 });
  
  if (events.length === 0) throw new Error('Dismissal not logged');
});

test('Governance: Alert escalation logs alert_escalated_to_incident event', async () => {
  await cleanup();
  
  const alert = await raiseAlert({
    type: 'high',
    category: 'builder',
    message: 'Builder violation',
    details: 'Forbidden action',
    severity: 5,
  });

  await attachAlertToIncident(alert.id, 'incident_789');

  const events = queryGovernanceEvents({ type: 'alert_escalated_to_incident', limit: 1 });
  
  if (events.length === 0) throw new Error('Escalation not logged');
});

// ============================================================================
// TEST SUITE: Alert Categories
// ============================================================================

test('Alert Categories: All 10 categories are supported', () => {
  const categories: AlertCategory[] = [
    'qiel',
    'drift',
    'guardrail',
    'pr',
    'qa',
    'builder',
    'deployment',
    'architecture',
    'suppression',
    'unauthorized',
  ];

  for (const category of categories) {
    const alert = createAlert({
      type: 'high',
      category,
      message: `${category} alert`,
      details: 'Test details',
      severity: 3,
    });
    
    if (alert.category !== category) {
      throw new Error(`Category ${category} not supported`);
    }
  }
});

// ============================================================================
// TEST SUITE: Alert Severity
// ============================================================================

test('Alert Severity: Severity levels 1-5 are supported', () => {
  const severities: AlertSeverity[] = [1, 2, 3, 4, 5];

  for (const severity of severities) {
    const alert = createAlert({
      type: severity >= 4 ? 'high' : severity >= 3 ? 'medium' : 'low',
      category: 'qa',
      message: `Severity ${severity}`,
      details: 'Test',
      severity,
    });
    
    if (alert.severity !== severity) {
      throw new Error(`Severity ${severity} not supported`);
    }
  }
});

test('Alert Severity: High severity (4-5) sets sound=true by default', () => {
  const alert = createAlert({
    type: 'high',
    category: 'guardrail',
    message: 'Critical issue',
    details: 'Details',
    severity: 5,
  });

  // When sound is not explicitly provided, high severity should default to true
  if (alert.sound !== true) {
    throw new Error('High severity alert should have sound=true');
  }
});

// ============================================================================
// TEST RESULTS SUMMARY
// ============================================================================

(async () => {
  await runTests();
  
  console.log('\n' + '='.repeat(80));
  console.log('CS4 GOVERNANCE ALERTS QIC TEST RESULTS');
  console.log('='.repeat(80));
  
  const passed = testResults.filter(r => r.passed).length;
  const failed = testResults.filter(r => !r.passed).length;
  const total = testResults.length;
  
  console.log(`\nTotal Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Pass Rate: ${((passed / total) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\nFailed Tests:');
    testResults.filter(r => !r.passed).forEach(r => {
      console.log(`  ✗ ${r.message}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
  
  if (failed > 0) {
    console.log('❌ QIC GATE: FAILED');
    console.log('Build Philosophy: Implementation incomplete. Tests must be 100% green.');
    process.exit(1);
  } else {
    console.log('✅ QIC GATE: PASSED');
    console.log('Build Philosophy: All tests passing. CS4 implementation complete.');
    process.exit(0);
  }
})();
