/**
 * Report Publisher
 * Wave 4A.2 - Drift Telemetry & Time-Series Reporting
 * 
 * Persist telemetry reports to Memory Fabric and filesystem in append-only fashion.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import {
  TelemetryReport,
  PublishResult,
} from '@/types/telemetry';
import { writeMemory, readMemory } from '@/lib/foreman/memory/storage';

/**
 * Get telemetry reports directory path
 * Uses test directory if in test environment
 */
function getReportsDir(subdir?: string): string {
  const isTest = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;
  const baseDir = isTest ? 'telemetry-test' : 'telemetry';
  const fullPath = path.join(process.cwd(), 'memory', 'foreman', 'longitudinal', baseDir);
  
  if (subdir) {
    return path.join(fullPath, subdir);
  }
  
  return fullPath;
}

/**
 * Publish telemetry report to Memory Fabric and filesystem
 * MUST be append-only, no overwrites
 */
export async function publishTelemetryReport(params: {
  report: TelemetryReport;
}): Promise<PublishResult> {
  try {
    const { report } = params;
    const storedAt: string[] = [];

    // Ensure directories exist
    const reportsDir = getReportsDir('reports');
    await fs.mkdir(reportsDir, { recursive: true });

    // Generate unique filename with timestamp and UUID to prevent overwrites
    const timestamp = new Date(report.generatedAt).toISOString().replace(/[:.]/g, '-');
    const baseFilename = `telemetry-${timestamp}-${report.id}`;

    // Store JSON artifact if available
    if (report.artifacts.json) {
      const jsonPath = path.join(reportsDir, `${baseFilename}.json`);
      await fs.writeFile(jsonPath, report.artifacts.json, 'utf-8');
      storedAt.push(jsonPath);
    }

    // Store Markdown artifact if available
    if (report.artifacts.markdown) {
      const mdPath = path.join(reportsDir, `${baseFilename}.md`);
      await fs.writeFile(mdPath, report.artifacts.markdown, 'utf-8');
      storedAt.push(mdPath);
    }

    // Store in Memory Fabric
    await writeMemory({
      scope: 'foreman',
      key: `longitudinal.telemetry.report.${timestamp}.${report.id}`,
      value: {
        type: 'telemetry_report',
        description: `Telemetry report: ${report.summary.overallHealth}`,
        data: {
          id: report.id,
          generatedAt: report.generatedAt,
          window: report.metadata.window,
          signatureCount: report.metadata.signatureCount,
          observationCount: report.metadata.observationCount,
          overallHealth: report.summary.overallHealth,
          driftDirection: report.summary.driftDirection.direction,
          topIssues: report.summary.topIssues,
          recommendations: report.summary.recommendations,
        },
      },
      tags: [
        'telemetry_report',
        'drift_analysis',
        report.summary.overallHealth,
        report.summary.driftDirection.direction,
      ],
      createdBy: 'telemetry-report-publisher',
    });

    storedAt.push('memory-fabric');

    return {
      success: true,
      reportId: report.id,
      storedAt,
    };
  } catch (error) {
    return {
      success: false,
      reportId: params.report.id,
      storedAt: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Retrieve historical telemetry reports
 */
export async function getHistoricalReports(params: {
  since?: Date;
  until?: Date;
  limit?: number;
}): Promise<TelemetryReport[]> {
  try {
    // Query from Memory Fabric
    const memoryResult = await readMemory({
      scope: 'foreman',
      tags: ['telemetry_report'],
    });

    if (!memoryResult.entries || memoryResult.entries.length === 0) {
      return [];
    }

    // Extract reports from memory entries
    let reports: TelemetryReport[] = [];

    for (const entry of memoryResult.entries) {
      try {
        // Try to reconstruct full report from filesystem
        const reportData = entry.value.data;
        const reportId = reportData.id;
        const generatedAt = reportData.generatedAt;

        // Attempt to load full report from filesystem
        const timestamp = new Date(generatedAt).toISOString().replace(/[:.]/g, '-');
        const reportsDir = getReportsDir('reports');
        const jsonPath = path.join(reportsDir, `telemetry-${timestamp}-${reportId}.json`);

        try {
          const jsonContent = await fs.readFile(jsonPath, 'utf-8');
          const fullReport = JSON.parse(jsonContent) as TelemetryReport;
          reports.push(fullReport);
        } catch {
          // If full report not available, create minimal report from memory data
          const minimalReport: TelemetryReport = {
            id: reportId,
            generatedAt,
            reproducible: true,
            metadata: {
              window: reportData.window,
              signatureCount: reportData.signatureCount,
              observationCount: reportData.observationCount,
              dataCompleteness: 1.0,
            },
            timeSeries: {
              window: {
                type: reportData.window.type,
                value: reportData.window.value,
                signatureCount: reportData.signatureCount,
                observationCount: reportData.observationCount,
              },
              series: [],
              summary: {
                overallDirection: reportData.driftDirection,
                averageDrift: 0,
                peakDrift: 0,
                minDrift: 0,
                volatility: 0,
              },
              edgeCases: [],
              infrastructureGaps: [],
            },
            subsystems: [],
            constraints: [],
            summary: {
              overallHealth: reportData.overallHealth,
              driftDirection: {
                direction: reportData.driftDirection,
                confidence: 0,
                trend: {
                  slopeDirection: 'flat',
                  slopeValue: 0,
                  volatility: 0,
                },
                periods: {
                  improving: 0,
                  degrading: 0,
                  stable: 0,
                },
                rationale: '',
              },
              topIssues: reportData.topIssues || [],
              recommendations: reportData.recommendations || [],
            },
            artifacts: {},
            infrastructureGaps: [],
            edgeCases: [],
          };
          reports.push(minimalReport);
        }
      } catch (error) {
        console.error('[Publisher] Error loading report:', error);
        continue;
      }
    }

    // Apply date filters
    if (params.since) {
      reports = reports.filter(r => new Date(r.generatedAt) >= params.since!);
    }

    if (params.until) {
      reports = reports.filter(r => new Date(r.generatedAt) <= params.until!);
    }

    // Sort by generation time (newest first)
    reports.sort((a, b) => 
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );

    // Apply limit
    if (params.limit && reports.length > params.limit) {
      reports = reports.slice(0, params.limit);
    }

    return reports;
  } catch (error) {
    console.error('[Publisher] Error retrieving historical reports:', error);
    return [];
  }
}

/**
 * Link report to source drift observations
 */
export async function linkReportToObservations(params: {
  reportId: string;
  observationIds: string[];
}): Promise<void> {
  try {
    // Store link in Memory Fabric
    await writeMemory({
      scope: 'foreman',
      key: `longitudinal.telemetry.links.${params.reportId}`,
      value: {
        type: 'telemetry_observation_link',
        description: `Links report ${params.reportId} to ${params.observationIds.length} observations`,
        data: {
          reportId: params.reportId,
          observationIds: params.observationIds,
          linkCreatedAt: new Date().toISOString(),
        },
      },
      tags: [
        'telemetry_link',
        'report_observation_link',
      ],
      createdBy: 'telemetry-report-publisher',
    });
  } catch (error) {
    console.error('[Publisher] Error linking report to observations:', error);
    throw error;
  }
}

/**
 * Publish subsystem report
 */
export async function publishSubsystemReport(params: {
  report: any; // SubsystemReport
}): Promise<PublishResult> {
  try {
    const { report } = params;
    const storedAt: string[] = [];

    // Ensure directories exist
    const subsystemDir = getReportsDir('subsystem-reports');
    await fs.mkdir(subsystemDir, { recursive: true });

    // Generate unique filename
    const timestamp = new Date(report.generatedAt).toISOString().replace(/[:.]/g, '-');
    const baseFilename = `subsystem-${report.subsystem}-${timestamp}`;

    // Store JSON artifact if available
    if (report.artifacts.json) {
      const jsonPath = path.join(subsystemDir, `${baseFilename}.json`);
      await fs.writeFile(jsonPath, report.artifacts.json, 'utf-8');
      storedAt.push(jsonPath);
    }

    // Store Markdown artifact if available
    if (report.artifacts.markdown) {
      const mdPath = path.join(subsystemDir, `${baseFilename}.md`);
      await fs.writeFile(mdPath, report.artifacts.markdown, 'utf-8');
      storedAt.push(mdPath);
    }

    return {
      success: true,
      reportId: report.subsystem,
      storedAt,
    };
  } catch (error) {
    return {
      success: false,
      reportId: params.report.subsystem,
      storedAt: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Publish constraint report
 */
export async function publishConstraintReport(params: {
  report: any; // ConstraintReport
}): Promise<PublishResult> {
  try {
    const { report } = params;
    const storedAt: string[] = [];

    // Ensure directories exist
    const constraintDir = getReportsDir('constraint-reports');
    await fs.mkdir(constraintDir, { recursive: true });

    // Generate unique filename
    const timestamp = new Date(report.generatedAt).toISOString().replace(/[:.]/g, '-');
    const baseFilename = `constraint-${report.constraintId}-${timestamp}`;

    // Store JSON artifact if available
    if (report.artifacts.json) {
      const jsonPath = path.join(constraintDir, `${baseFilename}.json`);
      await fs.writeFile(jsonPath, report.artifacts.json, 'utf-8');
      storedAt.push(jsonPath);
    }

    // Store Markdown artifact if available
    if (report.artifacts.markdown) {
      const mdPath = path.join(constraintDir, `${baseFilename}.md`);
      await fs.writeFile(mdPath, report.artifacts.markdown, 'utf-8');
      storedAt.push(mdPath);
    }

    return {
      success: true,
      reportId: report.constraintId,
      storedAt,
    };
  } catch (error) {
    return {
      success: false,
      reportId: params.report.constraintId,
      storedAt: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
