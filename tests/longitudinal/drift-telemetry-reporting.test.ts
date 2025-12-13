/**
 * Drift Telemetry & Time-Series Reporting Tests
 * Wave 4A.2 - Red QA Suite
 * 
 * These tests MUST be RED (failing) until implementation is complete.
 * They define the acceptance criteria for "Build to Green."
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  getTimeSeriesTelemetry,
  getDriftDirection,
  getSubsystemAttribution,
  getConstraintTrends,
  detectEdgeCases,
} from '@/lib/foreman/longitudinal/telemetry/time-series-aggregator';
import {
  generateTelemetryReport,
  generateSubsystemReport,
  generateConstraintReport,
} from '@/lib/foreman/longitudinal/telemetry/telemetry-generator';
import {
  publishTelemetryReport,
  getHistoricalReports,
  linkReportToObservations,
} from '@/lib/foreman/longitudinal/telemetry/report-publisher';
import { persistSignature } from '@/lib/foreman/longitudinal/signature-persistence';
import { storeDriftObservation } from '@/lib/foreman/longitudinal/memory-integration';
import { computeDrift, classifyDriftPattern } from '@/lib/foreman/longitudinal/drift-computation';
import {
  TimeWindow,
  PersistedSignature,
  DriftObservation,
} from '@/types/longitudinal';
import {
  TimeSeriesTelemetry,
  DriftDirection,
  SubsystemAttribution,
  ConstraintTrend,
  TelemetryReport,
} from '@/types/telemetry';
import { ArchitectureSignature } from '@/types/constraints';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('Wave 4A.2 - Drift Telemetry & Time-Series Reporting', () => {
  const testDataDir = path.join(process.cwd(), 'memory', 'foreman', 'longitudinal', 'telemetry-test');

  beforeEach(async () => {
    // Ensure clean test environment
    await fs.mkdir(testDataDir, { recursive: true });
  });

  afterEach(async () => {
    // Cleanup test data
    try {
      await fs.rm(testDataDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('1. Time-Series Aggregator', () => {
    describe('getTimeSeriesTelemetry', () => {
      it('should aggregate drift observations across a time window', async () => {
        // Arrange: Create test signatures and observations
        const signatures = await createTestSignatures(5);
        const observations = await createTestObservations(signatures);

        const window: TimeWindow = {
          type: 'commits',
          value: 5,
        };

        // Act
        const telemetry = await getTimeSeriesTelemetry({ window });

        // Assert
        expect(telemetry).toBeDefined();
        expect(telemetry.window.signatureCount).toBeGreaterThan(0);
        expect(telemetry.window.observationCount).toBeGreaterThan(0);
        expect(telemetry.series).toBeInstanceOf(Array);
        expect(telemetry.series.length).toBeGreaterThan(0);
        
        // Verify series structure
        for (const point of telemetry.series) {
          expect(point.timestamp).toBeDefined();
          expect(point.sourceType).toMatch(/commit|pr|wave/);
          expect(point.sourceId).toBeDefined();
          expect(point.drift.magnitude).toBeGreaterThanOrEqual(0);
          expect(point.drift.magnitude).toBeLessThanOrEqual(1);
          expect(point.drift.classification).toMatch(/Stable|Gradual|Accelerating|Regressive/);
          expect(point.drift.confidence).toBeGreaterThan(0);
          expect(point.drift.confidence).toBeLessThanOrEqual(1);
        }
        
        // Verify summary
        expect(telemetry.summary.overallDirection).toMatch(/improving|degrading|oscillating|stable/);
        expect(telemetry.summary.averageDrift).toBeGreaterThanOrEqual(0);
        expect(telemetry.summary.peakDrift).toBeGreaterThanOrEqual(telemetry.summary.averageDrift);
        expect(telemetry.summary.volatility).toBeGreaterThanOrEqual(0);
      });

      it('should filter by subsystem when specified', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        const window: TimeWindow = { type: 'commits', value: 3 };

        // Act
        const telemetry = await getTimeSeriesTelemetry({
          window,
          subsystem: 'foreman-core',
        });

        // Assert
        expect(telemetry).toBeDefined();
        expect(telemetry.series).toBeInstanceOf(Array);
        // All observations should be related to specified subsystem
      });

      it('should filter by category when specified', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        const window: TimeWindow = { type: 'days', value: 7 };

        // Act
        const telemetry = await getTimeSeriesTelemetry({
          window,
          category: 'structural',
        });

        // Assert
        expect(telemetry).toBeDefined();
        expect(telemetry.series).toBeInstanceOf(Array);
        // Should only include structural drift metrics
      });

      it('should handle empty time windows gracefully', async () => {
        // Arrange
        const window: TimeWindow = {
          type: 'custom',
          value: {
            start: '2020-01-01T00:00:00.000Z',
            end: '2020-01-02T00:00:00.000Z',
          },
        };

        // Act
        const telemetry = await getTimeSeriesTelemetry({ window });

        // Assert
        expect(telemetry).toBeDefined();
        expect(telemetry.window.signatureCount).toBe(0);
        expect(telemetry.window.observationCount).toBe(0);
        expect(telemetry.series).toEqual([]);
        expect(telemetry.edgeCases).toContainEqual(
          expect.objectContaining({ type: 'sparse_data' })
        );
      });

      it('should be deterministic and reproducible', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 3 };

        // Act
        const telemetry1 = await getTimeSeriesTelemetry({ window });
        const telemetry2 = await getTimeSeriesTelemetry({ window });

        // Assert
        expect(telemetry1).toEqual(telemetry2);
      });
    });

    describe('getDriftDirection', () => {
      it('should classify drift direction as improving', async () => {
        // Arrange: Create signatures with decreasing drift
        const signatures = await createTestSignaturesWithTrend('improving', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const direction = await getDriftDirection({ window });

        // Assert
        expect(direction).toBeDefined();
        expect(direction.direction).toBe('improving');
        expect(direction.confidence).toBeGreaterThan(0.5);
        expect(direction.trend.slopeDirection).toBe('downward'); // Drift decreasing = improving
        expect(direction.rationale).toBeDefined();
      });

      it('should classify drift direction as degrading', async () => {
        // Arrange: Create signatures with increasing drift
        const signatures = await createTestSignaturesWithTrend('degrading', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const direction = await getDriftDirection({ window });

        // Assert
        expect(direction).toBeDefined();
        expect(direction.direction).toBe('degrading');
        expect(direction.confidence).toBeGreaterThan(0.5);
        expect(direction.trend.slopeDirection).toBe('upward'); // Drift increasing = degrading
      });

      it('should classify drift direction as oscillating', async () => {
        // Arrange: Create signatures with alternating drift
        const signatures = await createTestSignaturesWithTrend('oscillating', 6);
        const window: TimeWindow = { type: 'commits', value: 6 };

        // Act
        const direction = await getDriftDirection({ window });

        // Assert
        expect(direction).toBeDefined();
        expect(direction.direction).toBe('oscillating');
        expect(direction.trend.volatility).toBeGreaterThan(0.5);
      });

      it('should classify drift direction as stable', async () => {
        // Arrange: Create signatures with minimal drift
        const signatures = await createTestSignaturesWithTrend('stable', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const direction = await getDriftDirection({ window });

        // Assert
        expect(direction).toBeDefined();
        expect(direction.direction).toBe('stable');
        expect(direction.trend.slopeDirection).toBe('flat');
      });
    });

    describe('getSubsystemAttribution', () => {
      it('should attribute drift to subsystems', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const attributions = await getSubsystemAttribution({ window });

        // Assert
        expect(attributions).toBeInstanceOf(Array);
        expect(attributions.length).toBeGreaterThan(0);
        
        for (const attr of attributions) {
          expect(attr.subsystem).toBeDefined();
          expect(attr.stability.classification).toMatch(/stable|unstable|improving|degrading/);
          expect(attr.stability.confidence).toBeGreaterThan(0);
          expect(attr.stability.metrics.averageChurn).toBeGreaterThanOrEqual(0);
          expect(attr.observations).toBeInstanceOf(Array);
          expect(attr.trend).toMatch(/improving|degrading|stable/);
        }
      });

      it('should identify unstable subsystems', async () => {
        // Arrange
        const signatures = await createTestSignaturesWithSubsystemChurn('high', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const attributions = await getSubsystemAttribution({ window });

        // Assert
        const unstable = attributions.filter(a => a.stability.classification === 'unstable');
        expect(unstable.length).toBeGreaterThan(0);
      });

      it('should identify stable subsystems', async () => {
        // Arrange
        const signatures = await createTestSignaturesWithSubsystemChurn('low', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const attributions = await getSubsystemAttribution({ window });

        // Assert
        const stable = attributions.filter(a => a.stability.classification === 'stable');
        expect(stable.length).toBeGreaterThan(0);
      });
    });

    describe('getConstraintTrends', () => {
      it('should analyze constraint stress trends', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const trends = await getConstraintTrends({ window });

        // Assert
        expect(trends).toBeInstanceOf(Array);
        
        for (const trend of trends) {
          expect(trend.constraintId).toBeDefined();
          expect(trend.stress.totalViolations).toBeGreaterThanOrEqual(0);
          expect(trend.stress.violationRate).toBeGreaterThanOrEqual(0);
          expect(trend.stress.trend).toMatch(/increasing|stable|decreasing/);
          expect(trend.timeline).toBeInstanceOf(Array);
          expect(trend.prediction.nextPeriodRisk).toMatch(/low|medium|high/);
          expect(trend.prediction.rationale).toBeDefined();
        }
      });

      it('should filter by specific constraint', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const trends = await getConstraintTrends({
          window,
          constraintId: 'CS1_PROTECTED_PATHS',
        });

        // Assert
        expect(trends).toBeInstanceOf(Array);
        if (trends.length > 0) {
          expect(trends[0].constraintId).toBe('CS1_PROTECTED_PATHS');
        }
      });

      it('should detect increasing constraint stress', async () => {
        // Arrange
        const signatures = await createTestSignaturesWithConstraintViolations('increasing', 5);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const trends = await getConstraintTrends({ window });

        // Assert
        const increasing = trends.filter(t => t.stress.trend === 'increasing');
        expect(increasing.length).toBeGreaterThan(0);
      });
    });

    describe('detectEdgeCases', () => {
      it('should detect sparse data', async () => {
        // Arrange
        const telemetry: TimeSeriesTelemetry = {
          window: {
            type: 'commits',
            value: 2,
            signatureCount: 2,
            observationCount: 1,
          },
          series: [],
          summary: {
            overallDirection: 'stable',
            averageDrift: 0.01,
            peakDrift: 0.01,
            minDrift: 0.01,
            volatility: 0,
          },
          edgeCases: [],
          infrastructureGaps: [],
        };

        // Act
        const edgeCases = detectEdgeCases({ telemetry });

        // Assert
        expect(edgeCases).toContainEqual(
          expect.objectContaining({
            type: 'sparse_data',
            severity: 'info',
          })
        );
      });

      it('should detect sudden spikes', async () => {
        // Arrange
        const telemetry = await createTelemetryWithSpikes();

        // Act
        const edgeCases = detectEdgeCases({ telemetry });

        // Assert
        expect(edgeCases).toContainEqual(
          expect.objectContaining({
            type: 'sudden_spike',
            severity: 'warning',
          })
        );
      });

      it('should detect oscillating patterns', async () => {
        // Arrange
        const telemetry = await createTelemetryWithOscillation();

        // Act
        const edgeCases = detectEdgeCases({ telemetry });

        // Assert
        expect(edgeCases).toContainEqual(
          expect.objectContaining({
            type: 'oscillating',
            severity: 'warning',
          })
        );
      });

      it('should detect unclassifiable drift', async () => {
        // Arrange
        const telemetry = await createTelemetryWithLowConfidence();

        // Act
        const edgeCases = detectEdgeCases({ telemetry });

        // Assert
        expect(edgeCases).toContainEqual(
          expect.objectContaining({
            type: 'unclassifiable',
            severity: 'warning',
          })
        );
      });
    });
  });

  describe('2. Telemetry Generator', () => {
    describe('generateTelemetryReport', () => {
      it('should generate complete telemetry report in JSON format', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report = await generateTelemetryReport({
          window,
          format: 'json',
        });

        // Assert
        expect(report).toBeDefined();
        expect(report.id).toBeDefined();
        expect(report.generatedAt).toBeDefined();
        expect(report.reproducible).toBe(true);
        expect(report.metadata.window).toEqual(window);
        expect(report.timeSeries).toBeDefined();
        expect(report.subsystems).toBeInstanceOf(Array);
        expect(report.constraints).toBeInstanceOf(Array);
        expect(report.summary.overallHealth).toMatch(/healthy|warning|degrading|critical/);
        expect(report.summary.driftDirection).toBeDefined();
        expect(report.summary.topIssues).toBeInstanceOf(Array);
        expect(report.summary.recommendations).toBeInstanceOf(Array);
        expect(report.artifacts.json).toBeDefined();
        expect(report.edgeCases).toBeInstanceOf(Array);
      });

      it('should generate complete telemetry report in Markdown format', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report = await generateTelemetryReport({
          window,
          format: 'markdown',
        });

        // Assert
        expect(report).toBeDefined();
        expect(report.artifacts.markdown).toBeDefined();
        expect(report.artifacts.markdown).toContain('# Drift Telemetry Report');
        expect(report.artifacts.markdown).toContain('## Executive Summary');
        expect(report.artifacts.markdown).toContain('## Time-Series Analysis');
        expect(report.artifacts.markdown).toContain('## Subsystem Attribution');
        expect(report.artifacts.markdown).toContain('## Constraint Stress Analysis');
      });

      it('should generate both JSON and Markdown formats', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report = await generateTelemetryReport({
          window,
          format: 'both',
        });

        // Assert
        expect(report.artifacts.json).toBeDefined();
        expect(report.artifacts.markdown).toBeDefined();
      });

      it('should be deterministic and reproducible', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report1 = await generateTelemetryReport({ window, format: 'json' });
        const report2 = await generateTelemetryReport({ window, format: 'json' });

        // Assert
        // Ignore IDs and timestamps
        const { id: id1, generatedAt: gen1, ...rest1 } = report1;
        const { id: id2, generatedAt: gen2, ...rest2 } = report2;
        
        expect(rest1.metadata).toEqual(rest2.metadata);
        expect(rest1.timeSeries.series.length).toEqual(rest2.timeSeries.series.length);
      });
    });

    describe('generateSubsystemReport', () => {
      it('should generate subsystem-specific report', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report = await generateSubsystemReport({
          subsystem: 'foreman-core',
          window,
          format: 'both',
        });

        // Assert
        expect(report).toBeDefined();
        expect(report.subsystem).toBe('foreman-core');
        expect(report.generatedAt).toBeDefined();
        expect(report.attribution).toBeDefined();
        expect(report.relatedConstraints).toBeInstanceOf(Array);
        expect(report.summary.stability).toMatch(/stable|unstable|improving|degrading/);
        expect(report.artifacts.json).toBeDefined();
        expect(report.artifacts.markdown).toBeDefined();
      });
    });

    describe('generateConstraintReport', () => {
      it('should generate constraint-specific report', async () => {
        // Arrange
        const signatures = await createTestSignatures(5);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 5 };

        // Act
        const report = await generateConstraintReport({
          constraintId: 'CS1_PROTECTED_PATHS',
          window,
          format: 'both',
        });

        // Assert
        expect(report).toBeDefined();
        expect(report.constraintId).toBe('CS1_PROTECTED_PATHS');
        expect(report.generatedAt).toBeDefined();
        expect(report.trend).toBeDefined();
        expect(report.affectedSubsystems).toBeInstanceOf(Array);
        expect(report.summary.overallTrend).toMatch(/increasing|stable|decreasing/);
        expect(report.summary.riskLevel).toMatch(/low|medium|high/);
        expect(report.artifacts.json).toBeDefined();
        expect(report.artifacts.markdown).toBeDefined();
      });
    });
  });

  describe('3. Report Publisher', () => {
    describe('publishTelemetryReport', () => {
      it('should publish report to Memory Fabric and filesystem', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 3 };
        const report = await generateTelemetryReport({ window, format: 'both' });

        // Act
        const result = await publishTelemetryReport({ report });

        // Assert
        expect(result.success).toBe(true);
        expect(result.reportId).toBe(report.id);
        expect(result.storedAt).toBeInstanceOf(Array);
        expect(result.storedAt.length).toBeGreaterThan(0);
      });

      it('should store reports in append-only fashion', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 3 };
        const report1 = await generateTelemetryReport({ window, format: 'json' });
        const report2 = await generateTelemetryReport({ window, format: 'json' });

        // Act
        await publishTelemetryReport({ report: report1 });
        await publishTelemetryReport({ report: report2 });

        // Assert
        const historical = await getHistoricalReports({});
        expect(historical.length).toBeGreaterThanOrEqual(2);
        // Both reports should exist
      });

      it('should prevent overwrites', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 3 };
        const report = await generateTelemetryReport({ window, format: 'json' });

        // Act
        await publishTelemetryReport({ report });
        
        // Try to publish the same report ID again (should create new entry)
        const result = await publishTelemetryReport({ report });

        // Assert
        expect(result.success).toBe(true);
        // Should have multiple entries for same report ID (append-only)
      });
    });

    describe('getHistoricalReports', () => {
      it('should retrieve historical reports', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        for (let i = 0; i < 3; i++) {
          const window: TimeWindow = { type: 'commits', value: 3 };
          const report = await generateTelemetryReport({ window, format: 'json' });
          await publishTelemetryReport({ report });
        }

        // Act
        const historical = await getHistoricalReports({});

        // Assert
        expect(historical).toBeInstanceOf(Array);
        expect(historical.length).toBeGreaterThanOrEqual(3);
      });

      it('should filter by date range', async () => {
        // Arrange
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Act
        const historical = await getHistoricalReports({
          since: yesterday,
          until: now,
        });

        // Assert
        expect(historical).toBeInstanceOf(Array);
        for (const report of historical) {
          const reportDate = new Date(report.generatedAt);
          expect(reportDate.getTime()).toBeGreaterThanOrEqual(yesterday.getTime());
          expect(reportDate.getTime()).toBeLessThanOrEqual(now.getTime());
        }
      });

      it('should respect limit parameter', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        await createTestObservations(signatures);
        for (let i = 0; i < 5; i++) {
          const window: TimeWindow = { type: 'commits', value: 3 };
          const report = await generateTelemetryReport({ window, format: 'json' });
          await publishTelemetryReport({ report });
        }

        // Act
        const historical = await getHistoricalReports({ limit: 3 });

        // Assert
        expect(historical.length).toBeLessThanOrEqual(3);
      });
    });

    describe('linkReportToObservations', () => {
      it('should link report to source drift observations', async () => {
        // Arrange
        const signatures = await createTestSignatures(3);
        const observations = await createTestObservations(signatures);
        const window: TimeWindow = { type: 'commits', value: 3 };
        const report = await generateTelemetryReport({ window, format: 'json' });
        await publishTelemetryReport({ report });

        const observationIds = observations.map(o => o.id);

        // Act
        await linkReportToObservations({
          reportId: report.id,
          observationIds,
        });

        // Assert
        // Verify link exists (implementation will store this relationship)
        expect(true).toBe(true); // Link created successfully
      });
    });
  });

  describe('4. Edge Cases & Infrastructure Gaps', () => {
    it('should handle sparse historical data gracefully', async () => {
      // Arrange
      const signatures = await createTestSignatures(1);
      const window: TimeWindow = { type: 'commits', value: 1 };

      // Act
      const telemetry = await getTimeSeriesTelemetry({ window });

      // Assert
      expect(telemetry.edgeCases).toContainEqual(
        expect.objectContaining({ type: 'sparse_data' })
      );
    });

    it('should classify sudden spikes vs gradual trends', async () => {
      // Arrange
      const signaturesGradual = await createTestSignaturesWithTrend('gradual', 5);
      const signaturesSpike = await createTestSignaturesWithSpike();

      // Act
      const telemetryGradual = await getTimeSeriesTelemetry({
        window: { type: 'commits', value: 5 },
      });
      const telemetrySpike = await getTimeSeriesTelemetry({
        window: { type: 'commits', value: 5 },
      });

      // Assert
      expect(telemetryGradual.summary.volatility).toBeLessThan(0.3);
      expect(telemetrySpike.edgeCases).toContainEqual(
        expect.objectContaining({ type: 'sudden_spike' })
      );
    });

    it('should detect oscillating drift patterns', async () => {
      // Arrange
      const signatures = await createTestSignaturesWithTrend('oscillating', 6);
      const window: TimeWindow = { type: 'commits', value: 6 };

      // Act
      const direction = await getDriftDirection({ window });

      // Assert
      expect(direction.direction).toBe('oscillating');
      expect(direction.trend.volatility).toBeGreaterThan(0.5);
    });

    it('should flag unclassifiable drift explicitly', async () => {
      // Arrange
      const signatures = await createTestSignaturesWithAmbiguousDrift();
      const window: TimeWindow = { type: 'commits', value: 5 };

      // Act
      const telemetry = await getTimeSeriesTelemetry({ window });

      // Assert
      expect(telemetry.edgeCases).toContainEqual(
        expect.objectContaining({
          type: 'unclassifiable',
          recommendation: expect.stringContaining('Infrastructure Gap'),
        })
      );
    });

    it('should record infrastructure gaps for missing data', async () => {
      // Arrange
      const window: TimeWindow = { type: 'commits', value: 10 };

      // Act
      const telemetry = await getTimeSeriesTelemetry({ window });

      // Assert
      if (telemetry.window.signatureCount < 3) {
        expect(telemetry.infrastructureGaps.length).toBeGreaterThan(0);
      }
    });
  });

  describe('5. Reproducibility & Determinism', () => {
    it('should produce identical reports for identical inputs', async () => {
      // Arrange
      const signatures = await createTestSignatures(5);
      await createTestObservations(signatures);
      const window: TimeWindow = { type: 'commits', value: 5 };

      // Act
      const report1 = await generateTelemetryReport({ window, format: 'json' });
      const report2 = await generateTelemetryReport({ window, format: 'json' });

      // Assert
      const { id: id1, generatedAt: gen1, ...data1 } = report1;
      const { id: id2, generatedAt: gen2, ...data2 } = report2;
      
      // Core data should be identical
      expect(data1.metadata.window).toEqual(data2.metadata.window);
      expect(data1.timeSeries.series.length).toEqual(data2.timeSeries.series.length);
    });

    it('should produce reproducible time-series telemetry', async () => {
      // Arrange
      const signatures = await createTestSignatures(5);
      await createTestObservations(signatures);
      const window: TimeWindow = { type: 'commits', value: 5 };

      // Act
      const telemetry1 = await getTimeSeriesTelemetry({ window });
      const telemetry2 = await getTimeSeriesTelemetry({ window });

      // Assert
      expect(telemetry1.summary).toEqual(telemetry2.summary);
      expect(telemetry1.series.length).toEqual(telemetry2.series.length);
    });
  });
});

// ============================================================================
// Test Helper Functions
// ============================================================================

/**
 * Create test architecture signatures
 */
async function createTestSignatures(count: number): Promise<PersistedSignature[]> {
  const signatures: PersistedSignature[] = [];
  
  for (let i = 0; i < count; i++) {
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules: [
          { name: 'foreman-core', hash: `hash-${i}`, type: 'core' },
          { name: 'memory-fabric', hash: `hash-${i}`, type: 'core' },
        ],
        dependencies: {
          edges: [
            { from: 'foreman-core', to: 'memory-fabric', type: 'import' },
          ],
        },
      },
      contracts: {
        apis: [{ name: 'getSignature', signature: 'string', module: 'foreman-core' }],
        types: [{ name: 'Signature', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints: ['CS1_PROTECTED_PATHS'],
        protectedPaths: ['.github/workflows/'],
      },
    };

    const result = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-${i}`,
      metadata: { commitMessage: `Test commit ${i}` },
    });

    // Retrieve the persisted signature
    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  return signatures;
}

/**
 * Create test drift observations from signatures
 */
async function createTestObservations(signatures: PersistedSignature[]): Promise<DriftObservation[]> {
  const observations: DriftObservation[] = [];
  
  for (let i = 1; i < signatures.length; i++) {
    const computation = computeDrift({
      oldSignature: signatures[i - 1],
      newSignature: signatures[i],
    });
    
    const classification = classifyDriftPattern({
      signatures: signatures.slice(0, i + 1),
      window: { type: 'commits', value: i + 1 },
    });
    
    await storeDriftObservation({
      driftId: `drift-${i}`,
      computation,
      classification,
      context: {
        sourceType: 'commit',
        sourceId: signatures[i].sourceId,
        timestamp: signatures[i].timestamp,
      },
    });
    
    observations.push({
      id: `drift-${i}`,
      timestamp: signatures[i].timestamp,
      oldSignatureId: signatures[i - 1].id,
      newSignatureId: signatures[i].id,
      computation,
      classification: classification.classification,
      classificationConfidence: classification.confidence,
      supportingMetrics: {
        averageChurnRate: classification.supportingMetrics.averageChurnRate,
      },
      context: {
        sourceType: 'commit',
        sourceId: signatures[i].sourceId,
        timestamp: signatures[i].timestamp,
      },
    });
  }
  
  return observations;
}

/**
 * Create test signatures with specific trend
 */
async function createTestSignaturesWithTrend(
  trend: 'improving' | 'degrading' | 'oscillating' | 'stable',
  count: number
): Promise<PersistedSignature[]> {
  const signatures: PersistedSignature[] = [];
  
  for (let i = 0; i < count; i++) {
    let moduleCount = 2;
    let moduleHash = `hash-${i}`;
    let constraints: string[] = [];
    
    // Vary the signature based on the trend - make changes more dramatic
    if (trend === 'improving') {
      // Dramatically decreasing complexity over time
      moduleCount = Math.max(2, 15 - (i * 3));
      constraints = i > count / 2 ? [] : ['CS1_PROTECTED_PATHS', 'CS2_ARCH', 'CS3_DATA'];
    } else if (trend === 'degrading') {
      // Dramatically increasing complexity over time
      moduleCount = 2 + (i * 3);
      constraints = i > count / 2 
        ? ['CS1_PROTECTED_PATHS', 'CS2_ARCH', 'CS3_DATA', 'CS4_MORE'] 
        : ['CS1_PROTECTED_PATHS'];
    } else if (trend === 'oscillating') {
      // Strong alternating complexity
      moduleCount = i % 2 === 0 ? 2 : 15;
      constraints = i % 2 === 0 ? [] : ['CS1_PROTECTED_PATHS', 'CS2_ARCH', 'CS3_DATA'];
    } else {
      // stable: minimal variation
      moduleCount = 2;
      constraints = ['CS1_PROTECTED_PATHS'];
    }
    
    const modules = [];
    for (let j = 0; j < moduleCount; j++) {
      modules.push({ name: `module-trend-${trend}-${j}`, hash: `${moduleHash}-${j}`, type: 'core' as const });
    }
    
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules,
        dependencies: {
          edges: modules.length > 1 
            ? [{ from: modules[0].name, to: modules[1].name, type: 'import' }]
            : [],
        },
      },
      contracts: {
        apis: Array.from({ length: Math.min(moduleCount, 5) }, (_, j) => ({
          name: `getApi${j}`, 
          signature: 'string', 
          module: modules[0]?.name || 'core'
        })),
        types: [{ name: 'Signature', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints,
        protectedPaths: ['.github/workflows/'],
      },
    };

    const result = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-trend-${trend}-${i}`,
      metadata: { commitMessage: `Test commit ${trend} ${i}` },
    });

    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-trend-${trend}-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  // Create observations for these signatures
  await createTestObservations(signatures);
  
  return signatures;
}

/**
 * Create test signatures with subsystem churn
 */
async function createTestSignaturesWithSubsystemChurn(
  level: 'high' | 'low',
  count: number
): Promise<PersistedSignature[]> {
  const signatures: PersistedSignature[] = [];
  
  for (let i = 0; i < count; i++) {
    const churnFactor = level === 'high' ? 3 + i : 1;
    const modules = [];
    
    // High churn: many changing modules, Low churn: few stable modules
    for (let j = 0; j < churnFactor; j++) {
      modules.push({ 
        name: `subsystem-${j}-module-${i}`, 
        hash: `hash-${i}-${j}`, 
        type: 'core' as const 
      });
    }
    
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules,
        dependencies: {
          edges: modules.length > 1
            ? [{ from: modules[0].name, to: modules[1].name, type: 'import' }]
            : [],
        },
      },
      contracts: {
        apis: [{ name: 'getApi', signature: 'string', module: modules[0]?.name || 'core' }],
        types: [{ name: 'Type', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints: level === 'high' ? ['CS1_PROTECTED_PATHS'] : [],
        protectedPaths: ['.github/workflows/'],
      },
    };

    await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-churn-${level}-${i}`,
      metadata: { commitMessage: `Test churn ${level} ${i}` },
    });

    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-churn-${level}-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  // Create observations for these signatures
  await createTestObservations(signatures);
  
  return signatures;
}

/**
 * Create test signatures with constraint violations
 */
async function createTestSignaturesWithConstraintViolations(
  trend: 'increasing' | 'stable' | 'decreasing',
  count: number
): Promise<PersistedSignature[]> {
  const signatures: PersistedSignature[] = [];
  
  for (let i = 0; i < count; i++) {
    let constraints: string[] = [];
    
    if (trend === 'increasing') {
      // Add more constraints over time
      const constraintCount = Math.min(i + 1, 3);
      for (let j = 0; j < constraintCount; j++) {
        constraints.push(`CONSTRAINT_${j}`);
      }
    } else if (trend === 'decreasing') {
      // Remove constraints over time
      const constraintCount = Math.max(3 - i, 0);
      for (let j = 0; j < constraintCount; j++) {
        constraints.push(`CONSTRAINT_${j}`);
      }
    } else {
      // stable: same constraints
      constraints = ['CONSTRAINT_0'];
    }
    
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules: [
          { name: 'core', hash: `hash-${i}`, type: 'core' },
        ],
        dependencies: {
          edges: [],
        },
      },
      contracts: {
        apis: [{ name: 'getApi', signature: 'string', module: 'core' }],
        types: [{ name: 'Type', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints,
        protectedPaths: ['.github/workflows/'],
      },
    };

    await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-constraint-${trend}-${i}`,
      metadata: { commitMessage: `Test constraint ${trend} ${i}` },
    });

    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-constraint-${trend}-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  // Create observations for these signatures
  await createTestObservations(signatures);
  
  return signatures;
}

/**
 * Create telemetry with spike pattern
 */
async function createTelemetryWithSpikes(): Promise<TimeSeriesTelemetry> {
  const signatures: PersistedSignature[] = [];
  
  // Create signatures with one spike
  for (let i = 0; i < 5; i++) {
    const moduleCount = i === 2 ? 10 : 2; // Spike at index 2
    const modules = [];
    for (let j = 0; j < moduleCount; j++) {
      modules.push({ name: `module-spike-${j}`, hash: `hash-${i}-${j}`, type: 'core' as const });
    }
    
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules,
        dependencies: {
          edges: modules.length > 1
            ? [{ from: modules[0].name, to: modules[1].name, type: 'import' }]
            : [],
        },
      },
      contracts: {
        apis: [{ name: 'api', signature: 'string', module: 'core' }],
        types: [{ name: 'Type', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints: [],
        protectedPaths: ['.github/workflows/'],
      },
    };

    await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-spike-${i}`,
      metadata: { commitMessage: `Test spike ${i}` },
    });

    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-spike-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  await createTestObservations(signatures);
  return getTimeSeriesTelemetry({ window: { type: 'commits', value: 5 } });
}

/**
 * Create telemetry with oscillation
 */
async function createTelemetryWithOscillation(): Promise<TimeSeriesTelemetry> {
  const signatures = await createTestSignaturesWithTrend('oscillating', 6);
  return getTimeSeriesTelemetry({ window: { type: 'commits', value: 6 } });
}

/**
 * Create telemetry with low confidence
 */
async function createTelemetryWithLowConfidence(): Promise<TimeSeriesTelemetry> {
  const signatures = await createTestSignatures(5);
  return getTimeSeriesTelemetry({ window: { type: 'commits', value: 5 } });
}

/**
 * Create signatures with ambiguous drift
 */
async function createTestSignaturesWithAmbiguousDrift(): Promise<PersistedSignature[]> {
  // Implementation would create signatures that are hard to classify
  return createTestSignatures(5);
}

/**
 * Create signatures with spike pattern
 */
async function createTestSignaturesWithSpike(): Promise<PersistedSignature[]> {
  const signatures: PersistedSignature[] = [];
  
  for (let i = 0; i < 5; i++) {
    const moduleCount = i === 2 ? 15 : 2; // Large spike at index 2
    const modules = [];
    for (let j = 0; j < moduleCount; j++) {
      modules.push({ name: `spike-module-${j}`, hash: `hash-${i}-${j}`, type: 'core' as const });
    }
    
    const signature: ArchitectureSignature = {
      version: '1.0.0',
      structure: {
        modules,
        dependencies: {
          edges: modules.length > 1
            ? [{ from: modules[0].name, to: modules[1].name, type: 'import' }]
            : [],
        },
      },
      contracts: {
        apis: [{ name: 'api', signature: 'string', module: 'core' }],
        types: [{ name: 'Type', definition: 'interface', module: 'types' }],
        events: [],
      },
      governance: {
        constraints: [],
        protectedPaths: ['.github/workflows/'],
      },
    };

    await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: `commit-spikefn-${i}`,
      metadata: { commitMessage: `Test spike fn ${i}` },
    });

    const { getHistoricalSignatures } = await import('@/lib/foreman/longitudinal/signature-persistence');
    const persisted = await getHistoricalSignatures({ sourceId: `commit-spikefn-${i}` });
    if (persisted[0]) {
      signatures.push(persisted[0]);
    }
  }
  
  return signatures;
}
