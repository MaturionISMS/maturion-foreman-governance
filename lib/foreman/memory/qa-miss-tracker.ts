/**
 * QA Miss Tracker
 * 
 * Tracks instances where QA passed but failures were present.
 * Stores missed signals, root causes, gaps, and enforcement rules
 * to prevent recurrence.
 * 
 * Part of Foreman's learning mechanism for continuous improvement.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface QAMissEvent {
  id: string;
  timestamp: string;
  missedSignal: MissedSignal;
  rootCause: RootCause;
  architecturalGap: ArchitecturalGap;
  qaGap: QAGap;
  enforcementRuleAdded: EnforcementRule;
  projectId?: string;
  buildSequenceId?: string;
  preventionStatus: 'pending' | 'implemented' | 'verified';
}

export interface MissedSignal {
  errorType: string; // e.g., "build_error", "lint_warning", "runtime_error"
  errorMessage: string;
  logFile: string; // Which log file contained the error
  lineNumber?: number;
  detectedBy?: string; // How was it eventually detected
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
}

export interface RootCause {
  category:
    | 'missing_pattern'
    | 'incomplete_parsing'
    | 'whitelist_too_permissive'
    | 'log_not_checked'
    | 'exit_code_masked'
    | 'other';
  description: string;
  whyMissed: string;
}

export interface ArchitecturalGap {
  gapType: string; // e.g., "missing_qa_rule", "incomplete_validation"
  description: string;
  documentationNeeded: string[];
  architectureUpdate: string;
}

export interface QAGap {
  checkMissing: string;
  checkType: 'log_parsing' | 'pattern_matching' | 'validation' | 'simulation';
  howToDetect: string;
  implementationPlan: string;
}

export interface EnforcementRule {
  ruleType: 'error_pattern' | 'qa_check' | 'validation_step' | 'policy';
  ruleName: string;
  ruleDescription: string;
  implementation: string;
  filesModified: string[];
  testAdded?: string;
  verificationMethod: string;
}

/**
 * Record a QA miss event
 */
export function recordQAMiss(event: Omit<QAMissEvent, 'id' | 'timestamp'>): QAMissEvent {
  const qaEvent: QAMissEvent = {
    id: generateQAMissId(),
    timestamp: new Date().toISOString(),
    ...event,
  };

  // Save to governance memory
  saveQAMissToMemory(qaEvent);

  // Log the event
  console.error('[QA Miss Tracker] QA miss recorded:', {
    id: qaEvent.id,
    errorType: qaEvent.missedSignal.errorType,
    impactLevel: qaEvent.missedSignal.impactLevel,
    preventionStatus: qaEvent.preventionStatus,
  });

  return qaEvent;
}

/**
 * Generate unique ID for QA miss event
 */
function generateQAMissId(): string {
  // Use crypto.randomUUID() for guaranteed uniqueness
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `qa_miss_${crypto.randomUUID()}`;
  }
  // Fallback for environments without crypto.randomUUID
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `qa_miss_${timestamp}_${random}`;
}

/**
 * Save QA miss event to memory storage
 */
function saveQAMissToMemory(event: QAMissEvent): void {
  const memoryDir = path.join(process.cwd(), 'memory', 'qa-misses');

  // Ensure directory exists
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }

  // Save individual event file
  const eventFile = path.join(memoryDir, `${event.id}.json`);
  fs.writeFileSync(eventFile, JSON.stringify(event, null, 2), 'utf-8');

  // Update index file
  updateQAMissIndex(event);
}

/**
 * Update QA miss index for quick lookups
 */
function updateQAMissIndex(event: QAMissEvent): void {
  const indexPath = path.join(
    process.cwd(),
    'memory',
    'qa-misses',
    'index.json'
  );

  let index: {
    totalMisses: number;
    byErrorType: Record<string, number>;
    byImpactLevel: Record<string, number>;
    byPreventionStatus: Record<string, number>;
    recent: Array<{ id: string; timestamp: string; errorType: string }>;
  } = {
    totalMisses: 0,
    byErrorType: {},
    byImpactLevel: {},
    byPreventionStatus: {},
    recent: [],
  };

  // Load existing index if it exists
  if (fs.existsSync(indexPath)) {
    try {
      index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    } catch (error) {
      console.error('[QA Miss Tracker] Failed to load index:', error);
    }
  }

  // Update counts
  index.totalMisses++;
  index.byErrorType[event.missedSignal.errorType] =
    (index.byErrorType[event.missedSignal.errorType] || 0) + 1;
  index.byImpactLevel[event.missedSignal.impactLevel] =
    (index.byImpactLevel[event.missedSignal.impactLevel] || 0) + 1;
  index.byPreventionStatus[event.preventionStatus] =
    (index.byPreventionStatus[event.preventionStatus] || 0) + 1;

  // Add to recent list (keep last 100)
  index.recent.unshift({
    id: event.id,
    timestamp: event.timestamp,
    errorType: event.missedSignal.errorType,
  });
  index.recent = index.recent.slice(0, 100);

  // Save updated index
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
}

/**
 * Retrieve QA miss events
 */
export function getQAMisses(filters?: {
  errorType?: string;
  impactLevel?: string;
  preventionStatus?: string;
  limit?: number;
}): QAMissEvent[] {
  const memoryDir = path.join(process.cwd(), 'memory', 'qa-misses');

  if (!fs.existsSync(memoryDir)) {
    return [];
  }

  const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.json') && f !== 'index.json');
  const events: QAMissEvent[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(memoryDir, file), 'utf-8');
      const event: QAMissEvent = JSON.parse(content);

      // Apply filters
      if (filters) {
        if (
          filters.errorType &&
          event.missedSignal.errorType !== filters.errorType
        ) {
          continue;
        }
        if (
          filters.impactLevel &&
          event.missedSignal.impactLevel !== filters.impactLevel
        ) {
          continue;
        }
        if (
          filters.preventionStatus &&
          event.preventionStatus !== filters.preventionStatus
        ) {
          continue;
        }
      }

      events.push(event);
    } catch (error) {
      console.error(`[QA Miss Tracker] Failed to load event ${file}:`, error);
    }
  }

  // Sort by timestamp (newest first)
  events.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Apply limit if specified
  if (filters?.limit) {
    return events.slice(0, filters.limit);
  }

  return events;
}

/**
 * Get QA miss statistics
 */
export function getQAMissStatistics(): {
  totalMisses: number;
  byErrorType: Record<string, number>;
  byImpactLevel: Record<string, number>;
  byPreventionStatus: Record<string, number>;
  recentMisses: Array<{ id: string; timestamp: string; errorType: string }>;
} {
  const indexPath = path.join(
    process.cwd(),
    'memory',
    'qa-misses',
    'index.json'
  );

  if (!fs.existsSync(indexPath)) {
    return {
      totalMisses: 0,
      byErrorType: {},
      byImpactLevel: {},
      byPreventionStatus: {},
      recentMisses: [],
    };
  }

  try {
    return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  } catch (error) {
    console.error('[QA Miss Tracker] Failed to load statistics:', error);
    return {
      totalMisses: 0,
      byErrorType: {},
      byImpactLevel: {},
      byPreventionStatus: {},
      recentMisses: [],
    };
  }
}

/**
 * Mark a QA miss as prevented (rule implemented and verified)
 */
export function markQAMissAsPrevented(missId: string): boolean {
  const eventPath = path.join(
    process.cwd(),
    'memory',
    'qa-misses',
    `${missId}.json`
  );

  if (!fs.existsSync(eventPath)) {
    console.error(`[QA Miss Tracker] Event ${missId} not found`);
    return false;
  }

  try {
    const event: QAMissEvent = JSON.parse(
      fs.readFileSync(eventPath, 'utf-8')
    );
    event.preventionStatus = 'verified';
    fs.writeFileSync(eventPath, JSON.stringify(event, null, 2), 'utf-8');

    console.log(`[QA Miss Tracker] Event ${missId} marked as prevented`);
    return true;
  } catch (error) {
    console.error(
      `[QA Miss Tracker] Failed to update event ${missId}:`,
      error
    );
    return false;
  }
}

/**
 * Generate QA miss report
 */
export function generateQAMissReport(events?: QAMissEvent[]): string {
  const misses = events || getQAMisses({ limit: 50 });
  const stats = getQAMissStatistics();

  const sections: string[] = [];

  sections.push('# QA Miss Tracker Report\n');
  sections.push(`**Total Misses Recorded**: ${stats.totalMisses}\n`);

  sections.push('## Statistics\n');
  sections.push('### By Error Type\n');
  Object.entries(stats.byErrorType).forEach(([type, count]) => {
    sections.push(`- ${type}: ${count}`);
  });
  sections.push('');

  sections.push('### By Impact Level\n');
  Object.entries(stats.byImpactLevel).forEach(([level, count]) => {
    sections.push(`- ${level}: ${count}`);
  });
  sections.push('');

  sections.push('### By Prevention Status\n');
  Object.entries(stats.byPreventionStatus).forEach(([status, count]) => {
    sections.push(`- ${status}: ${count}`);
  });
  sections.push('');

  if (misses.length > 0) {
    sections.push('## Recent QA Misses\n');
    misses.slice(0, 10).forEach(miss => {
      sections.push(`### ${miss.id}\n`);
      sections.push(`- **Timestamp**: ${miss.timestamp}`);
      sections.push(`- **Error Type**: ${miss.missedSignal.errorType}`);
      sections.push(`- **Impact**: ${miss.missedSignal.impactLevel}`);
      sections.push(`- **Log File**: ${miss.missedSignal.logFile}`);
      sections.push(`- **Root Cause**: ${miss.rootCause.category}`);
      sections.push(`- **Prevention Status**: ${miss.preventionStatus}`);
      sections.push('');
    });
  }

  return sections.join('\n');
}
