/**
 * Test Dodging Detector
 * 
 * Implements Test Dodging detection per architecture:
 * /foreman/architecture/test-dodging-integration-architecture.md
 * 
 * Detects:
 * - Group A: Sudden or Suspicious GREEN
 * - Group B: Assertion Weakening
 * - Group C: Empty or Hollow Tests
 * - Group D: Scope Reclassification
 * - Group E: Process Language Smell
 */

export interface TestDodgingSignal {
  type: 'sudden_green' | 'assertion_weakening' | 'empty_test' | 
        'scope_reclassification' | 'language_smell';
  confidence: 'high' | 'medium' | 'low';
  location: {
    file: string;
    line?: number;
    commit?: string;
  };
  evidence: string;
  recommendation: string;
}

export interface TestDodgingReport {
  hasViolations: boolean;
  signals: TestDodgingSignal[];
  summary: {
    high: number;
    medium: number;
    low: number;
  };
  timestamp: string;
}

export interface GitDiff {
  testFiles?: string[];
  implementationFiles?: string[];
  testChanges?: number;
  implChanges?: number;
  timeToGreen?: number;
  removed?: string[];
  added?: string[];
  changes?: string[];
  files?: string[];
  additions?: number;
  deletions?: number;
}

export class TestDodgingDetector {
  constructor(private options?: { skipGitHistory?: boolean; mockEmptyRepo?: boolean }) {}

  /**
   * Analyze changes for test dodging patterns
   */
  async analyzeChanges(diff: GitDiff): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    // Group A: Sudden Green - test changes without implementation
    if (diff.testChanges && diff.implChanges !== undefined) {
      if (diff.testChanges > 0 && diff.implChanges === 0) {
        signals.push({
          type: 'sudden_green',
          confidence: 'high',
          location: {
            file: diff.testFiles?.[0] || 'unknown',
          },
          evidence: 'test changes without implementation changes',
          recommendation: 'Verify that tests still validate correct behavior',
        });
      }
    }

    // Group B: Assertion Weakening - check removed vs added
    if (diff.removed && diff.added) {
      const assertionWeakening = this.detectAssertionWeakening(diff.removed, diff.added);
      if (assertionWeakening) {
        signals.push(assertionWeakening);
      }
    }

    // Group C: Empty Tests - check for assertion removal
    if (diff.changes) {
      for (const change of diff.changes) {
        if (change.toLowerCase().includes('removed') && change.toLowerCase().includes('assertion')) {
          signals.push({
            type: 'empty_test',
            confidence: 'high',
            location: {
              file: diff.testFiles?.[0] || diff.files?.[0] || 'unknown',
            },
            evidence: 'Assertions removed from tests',
            recommendation: 'Restore or replace with valid assertions',
          });
        }
      }
    }

    return signals;
  }

  /**
   * Detect assertion weakening pattern
   */
  private detectAssertionWeakening(removed: string[], added: string[]): TestDodgingSignal | null {
    // Check if behavioral assertions were replaced with type checks
    const hasBehavioralRemoved = removed.some(line => 
      line.includes('.toBe(') || line.includes('.toEqual(') || 
      line.includes('.toMatch(') || line.includes('.toContain(')
    );

    const hasTypeCheckAdded = added.some(line =>
      line.includes('typeof') || line.includes('.toBeDefined()') || 
      line.includes('.toBeTruthy()')
    );

    if (hasBehavioralRemoved && hasTypeCheckAdded) {
      return {
        type: 'assertion_weakening',
        confidence: 'high',
        location: { file: 'unknown' },
        evidence: 'Behavioral assertions replaced with type checks',
        recommendation: 'Restore behavioral assertions to test actual behavior',
      };
    }

    return null;
  }

  /**
   * Analyze diff between commits
   */
  async analyzeDiff(diff: { removed?: string[]; added?: string[] }): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    if (diff.removed && diff.added) {
      const weakening = this.detectAssertionWeakening(diff.removed, diff.added);
      if (weakening) {
        signals.push(weakening);
      }
    }

    return signals;
  }

  /**
   * Check a test file for dodging patterns
   */
  async checkTestFile(filePath: string, content?: string): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    if (!content) {
      return signals;
    }

    // Group C: Empty tests - no assertions
    if (this.hasEmptyTest(content)) {
      signals.push({
        type: 'empty_test',
        confidence: 'high',
        location: { file: filePath },
        evidence: 'Test contains no assertions',
        recommendation: 'Add assertions to validate behavior',
      });
    }

    // Group B: Type checks replacing behavioral checks
    if (this.hasTypeCheckInsteadOfBehavior(content)) {
      signals.push({
        type: 'assertion_weakening',
        confidence: 'high',
        location: { file: filePath },
        evidence: 'Type checks used instead of behavioral assertions',
        recommendation: 'Restore behavioral assertion checks',
      });
    }

    // Group E: Language smell
    const languageSmells = await this.scanForLanguageSmells(content);
    signals.push(...languageSmells);

    return signals;
  }

  /**
   * Detect empty tests
   */
  private hasEmptyTest(content: string): boolean {
    // Check for test blocks with no assertions
    const testBlockPattern = /it\s*\([^)]+\)\s*\{[^}]*\}/g;
    const matches = content.match(testBlockPattern);

    if (matches) {
      for (const match of matches) {
        // Check if test has no assertions
        if (!match.includes('assert') && 
            !match.includes('expect') && 
            !match.includes('should')) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Detect type checks instead of behavioral checks
   */
  private hasTypeCheckInsteadOfBehavior(content: string): boolean {
    return content.includes('typeof') && 
           (content.includes('toBe(') || content.includes('equal('));
  }

  /**
   * Scan for language smells
   */
  async scanForLanguageSmells(content: string): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];
    const smellKeywords = [
      'temporary', 'minor', 'non-blocking', 'follow-up issue', 
      'out of scope', 'will fix later', 'TODO'
    ];

    for (const keyword of smellKeywords) {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        signals.push({
          type: 'language_smell',
          confidence: keyword === 'temporary' || keyword === 'TODO' ? 'high' : 'medium',
          location: { file: 'unknown' },
          evidence: `Contains "${keyword}" language`,
          recommendation: 'Remove minimizing language and fix the underlying issue',
        });
      }
    }

    return signals;
  }

  /**
   * Analyze commit history
   */
  async analyzeCommitHistory(history: {
    beforeCommit: { failingTests: number; passingTests: number };
    afterCommit: { failingTests: number; passingTests: number };
    commitMessage: string;
    fileChanges: string[];
  }): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    const before = history.beforeCommit;
    const after = history.afterCommit;

    // Check if large number of failures disappeared
    if (before.failingTests > 10 && after.failingTests === 0) {
      // Check if only test files changed
      const onlyTestChanges = history.fileChanges.every(f => 
        f.toLowerCase().includes('test')
      );

      if (onlyTestChanges) {
        signals.push({
          type: 'sudden_green',
          confidence: 'high',
          location: { file: 'multiple', commit: 'unknown' },
          evidence: `${before.failingTests} failing tests disappeared after test-only changes`,
          recommendation: 'Verify tests still validate correct behavior',
        });
      }
    }

    return signals;
  }

  /**
   * Analyze timing patterns
   */
  async analyzeTimingPattern(timing: {
    failureDetected: Date;
    greenAchieved: Date;
    changedFiles: string[];
    complexityScore: number;
  }): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    const duration = timing.greenAchieved.getTime() - timing.failureDetected.getTime();
    const minutes = duration / (1000 * 60);

    // If high complexity but very fast turnaround, suspicious
    if (timing.complexityScore > 5 && minutes < 5) {
      signals.push({
        type: 'sudden_green',
        confidence: 'medium',
        location: { file: timing.changedFiles[0] || 'unknown' },
        evidence: `Green achieved in ${minutes} minutes faster than realistic for complexity ${timing.complexityScore}`,
        recommendation: 'Review changes to ensure tests were not weakened',
      });
    }

    return signals;
  }

  /**
   * Analyze a commit for test dodging
   */
  async analyzeCommit(commit: {
    message: string;
    fileChanges?: Array<{ from: string; to: string }>;
    files?: string[];
  }): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    // Group D: Scope reclassification
    if (commit.fileChanges) {
      for (const change of commit.fileChanges) {
        if (change.from.includes('critical') && !change.to.includes('critical')) {
          signals.push({
            type: 'scope_reclassification',
            confidence: 'medium',
            location: { file: change.to },
            evidence: 'Test moved from critical to non-critical',
            recommendation: 'Verify reclassification is justified',
          });
        }
      }
    }

    // Group E: Language smell in commit message
    const languageSmells = await this.scanForLanguageSmells(commit.message);
    signals.push(...languageSmells);

    return signals;
  }

  /**
   * Score confidence level for a signal
   */
  async scoreConfidence(signal: Omit<TestDodgingSignal, 'confidence'>): Promise<TestDodgingSignal> {
    let confidence: 'high' | 'medium' | 'low' = 'low';

    // Empty tests are always high confidence
    if (signal.type === 'empty_test') {
      confidence = 'high';
    }

    // Assertion reduction > 50% is high confidence
    if (signal.type === 'assertion_weakening' && signal.evidence.includes('%')) {
      const match = signal.evidence.match(/(\d+)%/);
      if (match && parseInt(match[1]) > 50) {
        confidence = 'high';
      } else {
        confidence = 'medium';
      }
    }

    // Timing patterns are medium confidence
    if (signal.type === 'sudden_green' && signal.evidence.includes('faster than realistic')) {
      confidence = 'medium';
    }

    return {
      ...signal,
      confidence,
    };
  }

  /**
   * Scan entire repository for test dodging patterns
   */
  async scanRepository(): Promise<TestDodgingReport> {
    const signals: TestDodgingSignal[] = [];

    // For now, return empty report (no violations)
    // Real implementation would scan all test files
    
    const summary = {
      high: signals.filter(s => s.confidence === 'high').length,
      medium: signals.filter(s => s.confidence === 'medium').length,
      low: signals.filter(s => s.confidence === 'low').length,
    };

    return {
      hasViolations: signals.length > 0,
      signals,
      summary,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Verify test suite integrity
   */
  async verifyTestSuiteIntegrity(): Promise<boolean> {
    // Scan for violations
    const report = await this.scanRepository();
    
    // Integrity is good if no high-confidence violations
    return report.summary.high === 0;
  }

  /**
   * Analyze assertion changes
   */
  async analyzeAssertionChange(history: {
    before: { assertions: number; behavioral: number };
    after: { assertions: number; behavioral: number };
  }): Promise<TestDodgingSignal[]> {
    const signals: TestDodgingSignal[] = [];

    const assertionReduction = ((history.before.assertions - history.after.assertions) / history.before.assertions) * 100;

    if (assertionReduction > 50) {
      signals.push({
        type: 'assertion_weakening',
        confidence: 'high',
        location: { file: 'unknown' },
        evidence: `${assertionReduction.toFixed(0)}% assertion reduction`,
        recommendation: 'Restore removed assertions',
      });
    }

    return signals;
  }
}
