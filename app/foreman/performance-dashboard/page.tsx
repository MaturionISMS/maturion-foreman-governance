/**
 * CS5 Performance Dashboard
 * 
 * Real-time performance monitoring and violation tracking.
 * Shows current performance score, violations over time, and pending fixes.
 */

import { runPerformanceScan } from '@/lib/foreman/performance/performance-scanner';
import { getAllEntries } from '@/lib/foreman/parking-station/storage';

export const metadata = {
  title: 'Performance Dashboard - CS5',
  description: 'Monitor performance violations and enforcement metrics',
};

interface PerformanceStats {
  totalViolations: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  filesScanned: number;
  blockingViolations: number;
  performanceScore: number;
}

interface ViolationBreakdown {
  pattern: string;
  count: number;
  severity: string;
}

async function getPerformanceData() {
  // Run performance scan
  const scanResult = await runPerformanceScan({
    createParkingStationEntries: false, // Don't create entries in dashboard view
  });

  // Get performance-related Parking Station entries
  const parkingStationEntries = await getAllEntries({
    category: 'Performance',
  });

  // Calculate performance score (100 = perfect, 0 = critical issues)
  const performanceScore = Math.max(
    0,
    100 - (scanResult.criticalCount * 20 + scanResult.highCount * 10 + scanResult.mediumCount * 5 + scanResult.lowCount * 2)
  );

  // Group violations by pattern
  const violationsByPattern = new Map<string, number>();
  for (const violation of scanResult.violations) {
    const key = violation.pattern.name;
    violationsByPattern.set(key, (violationsByPattern.get(key) || 0) + 1);
  }

  const violationBreakdown: ViolationBreakdown[] = Array.from(violationsByPattern.entries())
    .map(([pattern, count]) => {
      const violation = scanResult.violations.find(v => v.pattern.name === pattern);
      return {
        pattern,
        count,
        severity: violation?.pattern.severity || 'unknown',
      };
    })
    .sort((a, b) => b.count - a.count);

  const stats: PerformanceStats = {
    totalViolations: scanResult.violations.length,
    criticalCount: scanResult.criticalCount,
    highCount: scanResult.highCount,
    mediumCount: scanResult.mediumCount,
    lowCount: scanResult.lowCount,
    filesScanned: scanResult.filesScanned,
    blockingViolations: scanResult.blockingViolations.length,
    performanceScore,
  };

  return {
    stats,
    scanResult,
    parkingStationEntries,
    violationBreakdown,
  };
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}

export default async function PerformanceDashboard() {
  const { stats, scanResult, parkingStationEntries, violationBreakdown } = await getPerformanceData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">CS5 Performance Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Real-time monitoring of performance violations and code quality enforcement
        </p>
      </div>

      {/* Performance Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Score</h2>
        <div className="flex items-baseline gap-2">
          <span className={`text-6xl font-bold ${getScoreColor(stats.performanceScore)}`}>
            {stats.performanceScore}
          </span>
          <span className="text-gray-500 text-2xl">/100</span>
        </div>
        <p className="text-gray-600 mt-2">
          {stats.performanceScore >= 90 && '✅ Excellent - Code quality is high'}
          {stats.performanceScore >= 70 && stats.performanceScore < 90 && '⚠️ Good - Minor improvements needed'}
          {stats.performanceScore >= 50 && stats.performanceScore < 70 && '⚠️ Fair - Several issues to address'}
          {stats.performanceScore < 50 && '❌ Poor - Critical issues require immediate attention'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-gray-600 text-sm">Total Violations</div>
          <div className="text-3xl font-bold">{stats.totalViolations}</div>
          <div className="text-gray-500 text-xs mt-1">in {stats.filesScanned} files</div>
        </div>

        <div className="bg-white border border-red-200 rounded-lg p-4">
          <div className="text-red-600 text-sm">Critical</div>
          <div className="text-3xl font-bold text-red-600">{stats.criticalCount}</div>
          <div className="text-gray-500 text-xs mt-1">Blocks PR merge</div>
        </div>

        <div className="bg-white border border-orange-200 rounded-lg p-4">
          <div className="text-orange-600 text-sm">High Priority</div>
          <div className="text-3xl font-bold text-orange-600">{stats.highCount}</div>
          <div className="text-gray-500 text-xs mt-1">Needs attention</div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-lg p-4">
          <div className="text-yellow-600 text-sm">Medium/Low</div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.mediumCount + stats.lowCount}
          </div>
          <div className="text-gray-500 text-xs mt-1">Tracked issues</div>
        </div>
      </div>

      {/* Blocking Violations Alert */}
      {stats.blockingViolations > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 text-2xl">⛔</div>
            <div>
              <h3 className="text-red-800 font-semibold">
                {stats.blockingViolations} Blocking Violation(s) Detected
              </h3>
              <p className="text-red-700 mt-1">
                These critical issues prevent PR merge. They must be fixed immediately.
              </p>
              <div className="mt-3 space-y-2">
                {scanResult.blockingViolations.slice(0, 5).map((violation, idx) => (
                  <div key={idx} className="text-sm text-red-600 font-mono">
                    {violation.file}:{violation.line} - {violation.pattern.name}
                  </div>
                ))}
                {stats.blockingViolations > 5 && (
                  <div className="text-sm text-red-600">
                    ... and {stats.blockingViolations - 5} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Violation Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Violation Breakdown by Pattern</h2>
        {violationBreakdown.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">✅</div>
            <div>No violations detected! Code quality is excellent.</div>
          </div>
        ) : (
          <div className="space-y-2">
            {violationBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                  <span className="font-medium">{item.pattern}</span>
                </div>
                <span className="text-gray-600 font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Parking Station Performance Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Items in Parking Station</h2>
        {parkingStationEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No performance items in Parking Station
          </div>
        ) : (
          <div className="space-y-3">
            {parkingStationEntries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{entry.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{entry.summary}</p>
                    <div className="flex gap-2 mt-2">
                      {entry.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{entry.status}</div>
                    <div className="text-xs text-gray-500">{entry.suggestedWave}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Policy Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">CS5 Performance Policy</h2>
        <div className="space-y-2 text-blue-800">
          <div>✅ <strong>Zero-tolerance</strong> for TODO, FIXME, HACK comments</div>
          <div>✅ <strong>Mandatory optimization</strong> of obvious inefficiencies</div>
          <div>✅ <strong>Automatic blocking</strong> of PRs with critical violations</div>
          <div>✅ <strong>Parking Station tracking</strong> for deferred work</div>
          <div>✅ <strong>Governance memory</strong> logging of all violations</div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-gray-500 text-sm">
        Last scanned: {new Date(scanResult.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
