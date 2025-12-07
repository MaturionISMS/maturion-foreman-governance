'use client';

/**
 * Cognitive Analytics Dashboard
 * Foreman Intelligence Observatory v1
 * Issue #13 - Observability Wave O1
 */

import { useState, useEffect } from 'react';
import type { AnalyticsSummary } from '@/types/analytics';
import Header from '@/components/foreman/Header';
import Sidebar from '@/components/foreman/Sidebar';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load analytics data
  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/foreman/analytics/summary');
      const data = await response.json();
      
      if (response.ok) {
        setAnalytics(data);
        setLastRefresh(new Date());
      } else {
        setError(data.error || 'Failed to load analytics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadAnalytics();
  }, []);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      loadAnalytics();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Format numbers for display
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-foremanOffice-background overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          status="online"
          conversationId={null}
          onRunPilotBuild={undefined}
          isLoading={isLoading}
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Title and Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foremanOffice-text mb-2">
                🔭 Foreman Intelligence Observatory
              </h1>
              <p className="text-sm text-gray-400">
                Cognitive Analytics Dashboard — Real-time AI Governance & Health Monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
              <label className="flex items-center gap-2 text-sm text-foremanOffice-text">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                Auto-refresh (30s)
              </label>
              <button
                onClick={loadAnalytics}
                disabled={isLoading}
                className="px-4 py-2 bg-foremanOffice-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Loading...' : '🔄 Refresh'}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-500">❌ {error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !analytics && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="flex space-x-2 mb-4 justify-center">
                  <div className="h-3 w-3 bg-foremanOffice-primary rounded-full animate-bounce"></div>
                  <div className="h-3 w-3 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-3 w-3 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-gray-400">Loading analytics...</p>
              </div>
            </div>
          )}

          {/* Dashboard Panels */}
          {analytics && (
            <div className="space-y-6">
              {/* System Health Overview */}
              <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                  🏥 System Health
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getStatusColor(analytics.systemHealth.status)}`}>
                      {analytics.systemHealth.overallScore}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getStatusColor(analytics.systemHealth.status)}`}>
                      {analytics.systemHealth.status.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">System Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foremanOffice-accent">
                      {analytics.systemHealth.alerts.length}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">Active Alerts</div>
                  </div>
                </div>
                {analytics.systemHealth.alerts.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {analytics.systemHealth.alerts.map((alert, idx) => (
                      <div key={idx} className="bg-yellow-900/20 border border-yellow-500 rounded px-3 py-2 text-sm text-yellow-500">
                        ⚠️ {alert}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid Layout for Analytics Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Memory Health Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    🧠 Memory Health
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Entries:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.memory.activeCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Consolidated:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.memory.consolidatedCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Archived:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.memory.archivedCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Drift Status:</span>
                      <span className={`font-semibold ${getStatusColor(analytics.memory.driftStatus)}`}>
                        {analytics.memory.driftStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Stale Entries:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.memory.stalenessIndicators.staleEntries)}</span>
                    </div>
                  </div>
                </div>

                {/* Drift Monitor Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    ⚠️ Drift Monitor
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Alerts:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.drift.activeDriftAlerts)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-500">Critical:</span>
                      <span className="text-red-500 font-semibold">{formatNumber(analytics.drift.criticalCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500">Errors:</span>
                      <span className="text-orange-500 font-semibold">{formatNumber(analytics.drift.errorCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500">Warnings:</span>
                      <span className="text-yellow-500 font-semibold">{formatNumber(analytics.drift.warningCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Info:</span>
                      <span className="text-gray-400 font-semibold">{formatNumber(analytics.drift.infoCount)}</span>
                    </div>
                  </div>
                </div>

                {/* Consolidation Activity Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    🔮 Consolidation Activity
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Knowledge Blocks:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.consolidation.knowledgeBlocksCreated)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Cycles Executed:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.consolidation.consolidationCyclesExecuted)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Compression Ratio:</span>
                      <span className="text-foremanOffice-text font-semibold">{analytics.consolidation.compressionRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">High Confidence:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.consolidation.highConfidencePatterns)}</span>
                    </div>
                  </div>
                </div>

                {/* Knowledge Retirement Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    ♻️ Knowledge Retirement
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Retired Entries:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.retirement.retiredEntries)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Superseded Lessons:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.retirement.supersededLessons)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Deprecated Patterns:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.retirement.deprecatedPatterns)}</span>
                    </div>
                  </div>
                </div>

                {/* Reasoning Evolution Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    🤖 Reasoning Evolution
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Patterns Improved:</span>
                      <span className="text-green-500 font-semibold">{formatNumber(analytics.evolution.patternsImproved)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Patterns Removed:</span>
                      <span className="text-red-500 font-semibold">{formatNumber(analytics.evolution.patternsRemoved)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Evolution Cycles:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.evolution.evolutionCycles)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">New Heuristics:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.evolution.newHeuristicsCreated)}</span>
                    </div>
                  </div>
                </div>

                {/* Builder Performance Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    🔧 Builder Performance
                  </h2>
                  <div className="space-y-3">
                    {analytics.builders.builderMetrics.slice(0, 5).map((builder, idx) => (
                      <div key={idx} className="border-b border-foremanOffice-border pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-sm">{builder.builderId}</span>
                          <span className="text-foremanOffice-text font-semibold text-sm">
                            {(builder.successRate * 100).toFixed(0)}% success
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Iterations: {builder.avgIterationCount.toFixed(1)}</span>
                          <span>QA Pass: {(builder.qaPassRate * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                    {analytics.builders.builderMetrics.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        No builder data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Intelligence Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    📁 Project Intelligence
                  </h2>
                  <div className="space-y-3">
                    {analytics.projects.projects.slice(0, 5).map((project, idx) => (
                      <div key={idx} className="border-b border-foremanOffice-border pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-sm">{project.projectName}</span>
                          <span className="text-foremanOffice-text font-semibold text-sm">
                            {project.progressPercentage}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Phase: {project.phase}</span>
                          <span>Blockers: {project.blockerCount}</span>
                          <span>Drift: {project.driftIssues}</span>
                        </div>
                      </div>
                    ))}
                    {analytics.projects.projects.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        No project data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Governance Alignment Panel */}
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foremanOffice-text mb-4">
                    🏛 Governance Alignment
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Violations Detected:</span>
                      <span className="text-red-500 font-semibold">{formatNumber(analytics.governance.violationsDetected)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Rules Referenced:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.governance.rulesReferencedCount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Governance Updates:</span>
                      <span className="text-foremanOffice-text font-semibold">{formatNumber(analytics.governance.governanceUpdatesAffectingMemory)}</span>
                    </div>
                    {analytics.governance.topViolatedRules.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-400 mb-2">Top Violated Rules:</div>
                        {analytics.governance.topViolatedRules.slice(0, 3).map((rule, idx) => (
                          <div key={idx} className="text-xs text-gray-500 py-1">
                            • {rule.rule} ({rule.violationCount})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 lg:hidden w-12 h-12 bg-foremanOffice-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-50"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  );
}
