'use client';

/**
 * Parking Station UI
 * Centralized dashboard for viewing and managing proposed upgrades
 */

import { useState, useEffect } from 'react';
import type { 
  ParkingStationEntry, 
  ParkingStationStats,
  UpgradeCategory,
  UpgradeStatus,
  ImplementationWave 
} from '@/types/parking-station';

export default function ParkingStationPage() {
  const [entries, setEntries] = useState<ParkingStationEntry[]>([]);
  const [stats, setStats] = useState<ParkingStationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<UpgradeCategory | ''>('');
  const [statusFilter, setStatusFilter] = useState<UpgradeStatus | ''>('');
  const [waveFilter, setWaveFilter] = useState<ImplementationWave | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());

  // Load entries
  const loadEntries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.set('category', categoryFilter);
      if (statusFilter) params.set('status', statusFilter);
      if (waveFilter) params.set('suggestedWave', waveFilter);
      if (searchQuery) params.set('search', searchQuery);
      
      const response = await fetch(`/api/foreman/parking-station?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setEntries(data.entries);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Run scan
  const runScan = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/foreman/parking-station/scan', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        alert(`Scan complete! Found ${data.scanResult.upgradesFound} new upgrades from ${data.scanResult.filesScanned} files.`);
        await loadEntries();
      }
    } catch (error) {
      console.error('Error running scan:', error);
      alert('Failed to run scan');
    } finally {
      setScanning(false);
    }
  };

  // Update entry status
  const updateEntryStatus = async (id: string, status: UpgradeStatus) => {
    try {
      const response = await fetch('/api/foreman/parking-station/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status } }),
      });
      
      if (response.ok) {
        await loadEntries();
      }
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  // Toggle selection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedEntries);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEntries(newSelection);
  };

  // Load on mount and filter changes
  useEffect(() => {
    loadEntries();
  }, [categoryFilter, statusFilter, waveFilter, searchQuery]);

  // Get priority color
  const getPriorityColor = (priority: number): string => {
    if (priority >= 80) return 'text-red-400';
    if (priority >= 65) return 'text-orange-400';
    if (priority >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  // Get status badge color
  const getStatusColor = (status: UpgradeStatus): string => {
    switch (status) {
      case 'Parked': return 'bg-blue-900/30 text-blue-400 border-blue-700/50';
      case 'Promoted': return 'bg-purple-900/30 text-purple-400 border-purple-700/50';
      case 'Implemented': return 'bg-green-900/30 text-green-400 border-green-700/50';
      case 'Rejected': return 'bg-gray-900/30 text-gray-400 border-gray-700/50';
    }
  };

  return (
    <div className="min-h-screen bg-foremanOffice-background text-foremanOffice-text">
      {/* Header */}
      <div className="bg-foremanOffice-panel border-b border-foremanOffice-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-4xl">🅿️</span>
              Parking Station
            </h1>
            <p className="text-gray-400 mt-1">
              Centralized roadmap planning and upgrade management
            </p>
          </div>
          <button
            onClick={runScan}
            disabled={scanning}
            className="px-6 py-3 bg-foremanOffice-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {scanning ? '🔄 Scanning...' : '🔍 Run Discovery Scan'}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-foremanOffice-background border border-foremanOffice-border rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-foremanOffice-primary">{stats.total}</div>
              <div className="text-xs text-gray-400">Total Items</div>
            </div>
            <div className="bg-foremanOffice-background border border-foremanOffice-border rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-blue-400">{stats.byStatus.Parked}</div>
              <div className="text-xs text-gray-400">Parked</div>
            </div>
            <div className="bg-foremanOffice-background border border-foremanOffice-border rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-purple-400">{stats.byStatus.Promoted}</div>
              <div className="text-xs text-gray-400">Promoted</div>
            </div>
            <div className="bg-foremanOffice-background border border-foremanOffice-border rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-green-400">{stats.byStatus.Implemented}</div>
              <div className="text-xs text-gray-400">Implemented</div>
            </div>
            <div className="bg-foremanOffice-background border border-foremanOffice-border rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-yellow-400">{stats.averagePriority.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Avg Priority</div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-foremanOffice-panel border-b border-foremanOffice-border px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search upgrades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-foremanOffice-background border border-foremanOffice-border rounded-lg text-foremanOffice-text placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-foremanOffice-primary"
          />
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as UpgradeCategory | '')}
            className="px-4 py-2 bg-foremanOffice-background border border-foremanOffice-border rounded-lg text-foremanOffice-text focus:outline-none focus:ring-2 focus:ring-foremanOffice-primary"
          >
            <option value="">All Categories</option>
            <option value="UI">UI</option>
            <option value="Governance">Governance</option>
            <option value="Mutation Layer">Mutation Layer</option>
            <option value="Builders">Builders</option>
            <option value="QA">QA</option>
            <option value="Memory">Memory</option>
            <option value="Architecture">Architecture</option>
            <option value="Performance">Performance</option>
            <option value="Security">Security</option>
            <option value="Documentation">Documentation</option>
            <option value="Testing">Testing</option>
            <option value="Analytics">Analytics</option>
            <option value="Workflow">Workflow</option>
            <option value="Other">Other</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UpgradeStatus | '')}
            className="px-4 py-2 bg-foremanOffice-background border border-foremanOffice-border rounded-lg text-foremanOffice-text focus:outline-none focus:ring-2 focus:ring-foremanOffice-primary"
          >
            <option value="">All Statuses</option>
            <option value="Parked">Parked</option>
            <option value="Promoted">Promoted</option>
            <option value="Implemented">Implemented</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <select
            value={waveFilter}
            onChange={(e) => setWaveFilter(e.target.value as ImplementationWave | '')}
            className="px-4 py-2 bg-foremanOffice-background border border-foremanOffice-border rounded-lg text-foremanOffice-text focus:outline-none focus:ring-2 focus:ring-foremanOffice-primary"
          >
            <option value="">All Waves</option>
            <option value="Quick Win">Quick Win</option>
            <option value="Wave 1">Wave 1</option>
            <option value="Wave 2">Wave 2</option>
            <option value="Wave 3">Wave 3</option>
            <option value="Future">Future</option>
            <option value="Backlog">Backlog</option>
          </select>
        </div>
      </div>

      {/* Entries List */}
      <div className="px-8 py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-foremanOffice-primary"></div>
            <p className="text-gray-400 mt-4">Loading parking station...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl opacity-30">🅿️</span>
            <p className="text-gray-400 mt-4">No entries found. Try running a discovery scan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6 hover:border-foremanOffice-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedEntries.has(entry.id)}
                        onChange={() => toggleSelection(entry.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foremanOffice-text mb-2">
                          {entry.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {entry.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-gray-900/30 text-gray-400 border border-gray-700/50">
                            {entry.category}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-gray-900/30 text-gray-400 border border-gray-700/50">
                            {entry.suggestedWave}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded bg-gray-900/30 border border-gray-700/50 font-mono ${getPriorityColor(entry.priority)}`}>
                            Priority: {entry.priority}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-3">
                          Source: {entry.source} • {entry.sourceLocation}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="ml-4 flex flex-col gap-2">
                    {entry.status === 'Parked' && (
                      <button
                        onClick={() => updateEntryStatus(entry.id, 'Promoted')}
                        className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      >
                        Promote
                      </button>
                    )}
                    {entry.status === 'Promoted' && (
                      <button
                        onClick={() => updateEntryStatus(entry.id, 'Implemented')}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Mark Implemented
                      </button>
                    )}
                    <button
                      onClick={() => updateEntryStatus(entry.id, 'Rejected')}
                      className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
