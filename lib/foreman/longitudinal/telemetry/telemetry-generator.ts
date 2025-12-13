/**
 * Telemetry Generator
 * Wave 4A.2 - Drift Telemetry & Time-Series Reporting
 * 
 * Generate deterministic telemetry reports in machine-readable (JSON) and human-readable (Markdown) formats.
 * MUST be deterministic and reproducible.
 */

import { randomUUID } from 'crypto';
import {
  TimeWindow,
} from '@/types/longitudinal';
import {
  TelemetryReport,
  SubsystemReport,
  ConstraintReport,
  TimeSeriesTelemetry,
} from '@/types/telemetry';
import {
  getTimeSeriesTelemetry,
  getDriftDirection,
  getSubsystemAttribution,
  getConstraintTrends,
} from './time-series-aggregator';

/**
 * Generate complete telemetry report
 * MUST be deterministic and reproducible
 */
export async function generateTelemetryReport(params: {
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<TelemetryReport> {
  try {
    // Gather all telemetry data
    const timeSeries = await getTimeSeriesTelemetry({ window: params.window });
    const subsystems = await getSubsystemAttribution({ window: params.window });
    const constraints = await getConstraintTrends({ window: params.window });
    const driftDirection = await getDriftDirection({ window: params.window });

    // Calculate data completeness
    const dataCompleteness = timeSeries.window.signatureCount >= 3 ? 1.0 :
                            timeSeries.window.signatureCount >= 2 ? 0.7 :
                            timeSeries.window.signatureCount >= 1 ? 0.4 :
                            0.0;

    // Determine overall health
    const overallHealth = determineOverallHealth(timeSeries, subsystems, constraints, driftDirection);

    // Generate top issues
    const topIssues = generateTopIssues(timeSeries, subsystems, constraints);

    // Generate recommendations
    const recommendations = generateRecommendations(timeSeries, subsystems, constraints, driftDirection);

    // Create report structure
    const report: TelemetryReport = {
      id: randomUUID(),
      generatedAt: new Date().toISOString(),
      reproducible: true,
      
      metadata: {
        window: params.window,
        signatureCount: timeSeries.window.signatureCount,
        observationCount: timeSeries.window.observationCount,
        dataCompleteness,
      },
      
      timeSeries,
      subsystems,
      constraints,
      
      summary: {
        overallHealth,
        driftDirection,
        topIssues,
        recommendations,
      },
      
      artifacts: {},
      
      infrastructureGaps: timeSeries.infrastructureGaps,
      edgeCases: timeSeries.edgeCases,
    };

    // Generate artifacts based on format
    if (params.format === 'json' || params.format === 'both') {
      report.artifacts.json = JSON.stringify(report, null, 2);
    }

    if (params.format === 'markdown' || params.format === 'both') {
      report.artifacts.markdown = generateMarkdownReport(report);
    }

    return report;
  } catch (error) {
    console.error('[Telemetry] Error generating telemetry report:', error);
    throw error;
  }
}

/**
 * Generate subsystem-specific report
 */
export async function generateSubsystemReport(params: {
  subsystem: string;
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<SubsystemReport> {
  try {
    // Get subsystem attribution
    const attributions = await getSubsystemAttribution({ window: params.window });
    const attribution = attributions.find(a => a.subsystem === params.subsystem);

    if (!attribution) {
      throw new Error(`Subsystem '${params.subsystem}' not found in current window`);
    }

    // Get related constraints
    const allConstraints = await getConstraintTrends({ window: params.window });
    // Filter constraints that affect this subsystem (simple heuristic)
    const relatedConstraints = allConstraints;

    // Generate recommendations
    const recommendationsList: string[] = [];
    
    if (attribution.stability.classification === 'unstable') {
      recommendationsList.push('Review recent changes to stabilize this subsystem');
      recommendationsList.push('Consider refactoring to reduce complexity');
    }
    
    if (attribution.stability.metrics.violationCount > 0) {
      recommendationsList.push('Address governance constraint violations');
    }
    
    if (attribution.trend === 'degrading') {
      recommendationsList.push('Investigate root cause of degrading stability');
    }

    const report: SubsystemReport = {
      subsystem: params.subsystem,
      generatedAt: new Date().toISOString(),
      
      attribution,
      relatedConstraints,
      
      summary: {
        stability: attribution.stability.classification,
        keyMetrics: {
          averageChurn: attribution.stability.metrics.averageChurn,
          changeFrequency: attribution.stability.metrics.changeFrequency,
          violationCount: attribution.stability.metrics.violationCount,
        },
        recommendations: recommendationsList,
      },
      
      artifacts: {},
    };

    // Generate artifacts
    if (params.format === 'json' || params.format === 'both') {
      report.artifacts.json = JSON.stringify(report, null, 2);
    }

    if (params.format === 'markdown' || params.format === 'both') {
      report.artifacts.markdown = generateSubsystemMarkdown(report);
    }

    return report;
  } catch (error) {
    console.error('[Telemetry] Error generating subsystem report:', error);
    throw error;
  }
}

/**
 * Generate constraint-specific report
 */
export async function generateConstraintReport(params: {
  constraintId: string;
  window: TimeWindow;
  format: 'json' | 'markdown' | 'both';
}): Promise<ConstraintReport> {
  try {
    // Get constraint trends
    const trends = await getConstraintTrends({
      window: params.window,
      constraintId: params.constraintId,
    });

    const trend = trends.find(t => t.constraintId === params.constraintId);

    if (!trend) {
      throw new Error(`Constraint '${params.constraintId}' not found in current window`);
    }

    // Get affected subsystems
    const subsystems = await getSubsystemAttribution({ window: params.window });
    const affectedSubsystems = subsystems
      .filter(s => s.stability.metrics.violationCount > 0)
      .map(s => s.subsystem);

    // Generate recommendations
    const recommendationsList: string[] = [];
    
    if (trend.stress.trend === 'increasing') {
      recommendationsList.push('Urgent: Violation frequency is increasing');
      recommendationsList.push('Review architectural decisions causing violations');
    }
    
    if (trend.prediction.nextPeriodRisk === 'high') {
      recommendationsList.push('High risk of future violations predicted');
      recommendationsList.push('Consider updating constraint or architecture');
    }
    
    if (trend.stress.violationRate > 0.3) {
      recommendationsList.push('Constraint violated in >30% of observations');
    }

    const report: ConstraintReport = {
      constraintId: params.constraintId,
      generatedAt: new Date().toISOString(),
      
      trend,
      affectedSubsystems,
      
      summary: {
        overallTrend: trend.stress.trend,
        riskLevel: trend.prediction.nextPeriodRisk,
        recommendations: recommendationsList,
      },
      
      artifacts: {},
    };

    // Generate artifacts
    if (params.format === 'json' || params.format === 'both') {
      report.artifacts.json = JSON.stringify(report, null, 2);
    }

    if (params.format === 'markdown' || params.format === 'both') {
      report.artifacts.markdown = generateConstraintMarkdown(report);
    }

    return report;
  } catch (error) {
    console.error('[Telemetry] Error generating constraint report:', error);
    throw error;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Determine overall health from telemetry data
 */
function determineOverallHealth(
  timeSeries: TimeSeriesTelemetry,
  subsystems: any[],
  constraints: any[],
  driftDirection: any
): 'healthy' | 'warning' | 'degrading' | 'critical' {
  // Check for critical issues
  const hasHighRiskConstraints = constraints.some(c => c.prediction.nextPeriodRisk === 'high');
  const hasUnstableSubsystems = subsystems.filter(s => s.stability.classification === 'unstable').length;
  const isDegrading = driftDirection.direction === 'degrading';
  
  if (hasHighRiskConstraints && hasUnstableSubsystems > subsystems.length * 0.5) {
    return 'critical';
  }
  
  if (isDegrading || hasUnstableSubsystems > subsystems.length * 0.3) {
    return 'degrading';
  }
  
  if (timeSeries.summary.volatility > 0.5 || hasUnstableSubsystems > 0) {
    return 'warning';
  }
  
  return 'healthy';
}

/**
 * Generate top issues list
 */
function generateTopIssues(
  timeSeries: TimeSeriesTelemetry,
  subsystems: any[],
  constraints: any[]
): string[] {
  const issues: string[] = [];
  
  // High volatility
  if (timeSeries.summary.volatility > 0.5) {
    issues.push(`High drift volatility (${timeSeries.summary.volatility.toFixed(2)})`);
  }
  
  // Unstable subsystems
  const unstable = subsystems.filter(s => s.stability.classification === 'unstable');
  if (unstable.length > 0) {
    issues.push(`${unstable.length} unstable subsystem(s): ${unstable.map(s => s.subsystem).join(', ')}`);
  }
  
  // High-risk constraints
  const highRisk = constraints.filter(c => c.prediction.nextPeriodRisk === 'high');
  if (highRisk.length > 0) {
    issues.push(`${highRisk.length} high-risk constraint(s): ${highRisk.map(c => c.constraintId).join(', ')}`);
  }
  
  // Edge cases
  if (timeSeries.edgeCases.length > 0) {
    const warnings = timeSeries.edgeCases.filter(e => e.severity === 'warning' || e.severity === 'error');
    if (warnings.length > 0) {
      issues.push(`${warnings.length} edge case(s) detected`);
    }
  }
  
  // Infrastructure gaps
  if (timeSeries.infrastructureGaps.length > 0) {
    issues.push(`${timeSeries.infrastructureGaps.length} infrastructure gap(s) identified`);
  }
  
  return issues.slice(0, 5); // Top 5
}

/**
 * Generate recommendations list
 */
function generateRecommendations(
  timeSeries: TimeSeriesTelemetry,
  subsystems: any[],
  constraints: any[],
  driftDirection: any
): string[] {
  const recommendations: string[] = [];
  
  if (driftDirection.direction === 'degrading') {
    recommendations.push('Architecture stability is degrading - review recent changes');
  }
  
  if (timeSeries.summary.volatility > 0.5) {
    recommendations.push('High volatility detected - standardize architectural decisions');
  }
  
  const unstable = subsystems.filter(s => s.stability.classification === 'unstable');
  if (unstable.length > 0) {
    recommendations.push(`Stabilize ${unstable.length} subsystem(s) through refactoring`);
  }
  
  const increasing = constraints.filter(c => c.stress.trend === 'increasing');
  if (increasing.length > 0) {
    recommendations.push('Address increasing constraint violations before they escalate');
  }
  
  if (timeSeries.window.signatureCount < 3) {
    recommendations.push('Collect more historical data to improve trend confidence');
  }
  
  return recommendations.slice(0, 5); // Top 5
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(report: TelemetryReport): string {
  const windowDesc = formatWindowDescription(report.metadata.window);
  
  return `# Drift Telemetry Report

**Generated**: ${report.generatedAt}  
**Window**: ${windowDesc}  
**Signatures**: ${report.metadata.signatureCount} | **Observations**: ${report.metadata.observationCount}  
**Data Completeness**: ${(report.metadata.dataCompleteness * 100).toFixed(0)}%

---

## Executive Summary

**Overall Health**: ${report.summary.overallHealth}  
**Drift Direction**: ${report.summary.driftDirection.direction}  
**Confidence**: ${(report.summary.driftDirection.confidence * 100).toFixed(0)}%

### Key Findings

${report.summary.topIssues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

### Top Recommendations

${report.summary.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---

## Time-Series Analysis

**Average Drift**: ${report.timeSeries.summary.averageDrift.toFixed(3)}  
**Peak Drift**: ${report.timeSeries.summary.peakDrift.toFixed(3)}  
**Volatility**: ${report.timeSeries.summary.volatility.toFixed(3)}

### Drift Timeline

| Timestamp | Source | Classification | Magnitude | Churn Rate |
|-----------|--------|----------------|-----------|------------|
${report.timeSeries.series.slice(0, 10).map(s => 
  `| ${s.timestamp} | ${s.sourceType}:${s.sourceId} | ${s.drift.classification} | ${s.drift.magnitude.toFixed(3)} | ${s.categories.structural.churnRate.toFixed(3)} |`
).join('\n')}

${report.timeSeries.series.length > 10 ? `\n*(Showing 10 of ${report.timeSeries.series.length} observations)*\n` : ''}

---

## Subsystem Attribution

${report.subsystems.slice(0, 5).map(sub => `
### ${sub.subsystem}

**Stability**: ${sub.stability.classification}  
**Trend**: ${sub.trend}  
**Average Churn**: ${sub.stability.metrics.averageChurn.toFixed(3)}  
**Violation Count**: ${sub.stability.metrics.violationCount}

`).join('\n')}

${report.subsystems.length > 5 ? `*(Showing 5 of ${report.subsystems.length} subsystems)*\n` : ''}

---

## Constraint Stress Analysis

${report.constraints.slice(0, 5).map(con => `
### ${con.constraintId}

**Violations**: ${con.stress.totalViolations}  
**Trend**: ${con.stress.trend}  
**Risk Level**: ${con.prediction.nextPeriodRisk}

**Rationale**: ${con.prediction.rationale}

`).join('\n')}

${report.constraints.length > 5 ? `*(Showing 5 of ${report.constraints.length} constraints)*\n` : ''}

---

## Edge Cases & Infrastructure Gaps

${report.edgeCases.length > 0 ? `
### Edge Cases

${report.edgeCases.map((ec, i) => `
${i + 1}. **${ec.type}** (${ec.severity}): ${ec.description}
   - **Recommendation**: ${ec.recommendation}
`).join('\n')}
` : ''}

${report.infrastructureGaps.length > 0 ? `
### Infrastructure Gaps

${report.infrastructureGaps.map((gap, i) => `
${i + 1}. **${gap.type}**: ${gap.description}
   - **Severity**: ${gap.severity}
`).join('\n')}
` : ''}

---

## Methodology

This report was generated using deterministic algorithms over persisted architecture signatures. All metrics are reproducible and computed from historical drift observations.

**Report ID**: ${report.id}  
**Reproducible**: ${report.reproducible}
`;
}

/**
 * Generate subsystem-specific Markdown report
 */
function generateSubsystemMarkdown(report: SubsystemReport): string {
  return `# Subsystem Report: ${report.subsystem}

**Generated**: ${report.generatedAt}  
**Stability**: ${report.summary.stability}

---

## Stability Metrics

**Classification**: ${report.attribution.stability.classification}  
**Confidence**: ${(report.attribution.stability.confidence * 100).toFixed(0)}%  
**Trend**: ${report.attribution.trend}

### Key Metrics

- **Average Churn**: ${report.summary.keyMetrics.averageChurn.toFixed(3)}
- **Change Frequency**: ${report.summary.keyMetrics.changeFrequency.toFixed(3)}
- **Violation Count**: ${report.summary.keyMetrics.violationCount}

---

## Recommendations

${report.summary.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---

## Related Constraints

${report.relatedConstraints.slice(0, 3).map(con => `
- **${con.constraintId}**: ${con.stress.trend} (${con.stress.totalViolations} violations)
`).join('\n')}
`;
}

/**
 * Generate constraint-specific Markdown report
 */
function generateConstraintMarkdown(report: ConstraintReport): string {
  return `# Constraint Report: ${report.constraintId}

**Generated**: ${report.generatedAt}  
**Trend**: ${report.summary.overallTrend}  
**Risk Level**: ${report.summary.riskLevel}

---

## Stress Analysis

**Total Violations**: ${report.trend.stress.totalViolations}  
**Violation Rate**: ${(report.trend.stress.violationRate * 100).toFixed(1)}%  
**Trend**: ${report.trend.stress.trend}

### Prediction

**Next Period Risk**: ${report.trend.prediction.nextPeriodRisk}  
**Rationale**: ${report.trend.prediction.rationale}

---

## Affected Subsystems

${report.affectedSubsystems.map(sub => `- ${sub}`).join('\n')}

---

## Recommendations

${report.summary.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---

## Timeline

| Timestamp | Status | Severity |
|-----------|--------|----------|
${report.trend.timeline.slice(0, 10).map(t => 
  `| ${t.timestamp} | ${t.violated ? 'Violated' : 'Compliant'} | ${t.severity || 'N/A'} |`
).join('\n')}

${report.trend.timeline.length > 10 ? `\n*(Showing 10 of ${report.trend.timeline.length} observations)*\n` : ''}
`;
}

/**
 * Format window description
 */
function formatWindowDescription(window: any): string {
  if (typeof window.value === 'number') {
    return `Last ${window.value} ${window.type}`;
  } else {
    return `${window.value.start} to ${window.value.end}`;
  }
}
