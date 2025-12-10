/**
 * Autonomy Dashboard Page
 * 
 * Centralized dashboard for monitoring autonomous execution.
 * Shows active pilots, builder status, reasoning chains, logs,
 * governance interventions, and wave orchestration status.
 */

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autonomy Dashboard | Foreman',
  description: 'Monitor autonomous build execution, pilots, and governance'
}

export default function AutonomyDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Autonomy Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring of autonomous build execution and governance
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Active Pilots"
            value="0"
            status="idle"
            description="Currently executing"
          />
          <StatusCard
            title="Builders"
            value="2"
            status="ready"
            description="Available builders"
          />
          <StatusCard
            title="Waves Today"
            value="0"
            status="idle"
            description="Executed waves"
          />
          <StatusCard
            title="QA Pass Rate"
            value="100%"
            status="success"
            description="Last 7 days"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Pilots */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Active Pilots</h2>
              <div className="text-gray-500 text-center py-8">
                No active pilots running
              </div>
            </div>
          </div>

          {/* Builder Status */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Builder Status</h2>
              <div className="space-y-4">
                <BuilderStatusItem
                  name="GitHub Copilot"
                  status="ready"
                  lastUsed="N/A"
                />
                <BuilderStatusItem
                  name="Local Builder"
                  status="ready"
                  lastUsed="N/A"
                />
              </div>
            </div>
          </div>

          {/* Execution Logs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Execution Logs</h2>
              <div className="text-gray-500 text-center py-8">
                No execution logs yet
              </div>
            </div>
          </div>

          {/* Governance Interventions */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Governance</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Violations:</span>
                  <span className="font-semibold text-green-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Warnings:</span>
                  <span className="font-semibold text-yellow-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Incidents:</span>
                  <span className="font-semibold text-red-600">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Orchestration */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Wave Orchestration</h2>
              <div className="text-gray-500 text-center py-8">
                No waves scheduled or executed
              </div>
            </div>
          </div>

          {/* QIC/QIEL Output */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">QIC/QIEL Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <QAMetric name="Lint" status="passed" />
                <QAMetric name="TypeCheck" status="passed" />
                <QAMetric name="Build" status="passed" />
                <QAMetric name="Tests" status="passed" />
                <QAMetric name="QIEL" status="passed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Status Card Component
function StatusCard({
  title,
  value,
  status,
  description
}: {
  title: string
  value: string
  status: 'idle' | 'ready' | 'success' | 'warning' | 'error'
  description: string
}) {
  const statusColors = {
    idle: 'bg-gray-100 text-gray-800',
    ready: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}>
        {status.toUpperCase()}
      </div>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  )
}

// Builder Status Item Component
function BuilderStatusItem({
  name,
  status,
  lastUsed
}: {
  name: string
  status: 'ready' | 'busy' | 'offline'
  lastUsed: string
}) {
  const statusColors = {
    ready: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-red-500'
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">Last used: {lastUsed}</div>
        </div>
      </div>
      <div className="text-xs font-semibold text-gray-600 uppercase">
        {status}
      </div>
    </div>
  )
}

// QA Metric Component
function QAMetric({
  name,
  status
}: {
  name: string
  status: 'passed' | 'failed' | 'pending'
}) {
  const statusIcons = {
    passed: '✅',
    failed: '❌',
    pending: '⏳'
  }

  const statusColors = {
    passed: 'text-green-600',
    failed: 'text-red-600',
    pending: 'text-yellow-600'
  }

  return (
    <div className="text-center p-4 bg-gray-50 rounded">
      <div className="text-2xl mb-2">{statusIcons[status]}</div>
      <div className="font-medium">{name}</div>
      <div className={`text-xs font-semibold mt-1 ${statusColors[status]}`}>
        {status.toUpperCase()}
      </div>
    </div>
  )
}
