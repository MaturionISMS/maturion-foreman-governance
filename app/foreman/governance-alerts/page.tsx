/**
 * CS4 Governance Alerts Dashboard
 * 
 * Main dashboard for viewing and managing governance alerts
 */

'use client';

import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  type: string;
  category: string;
  message: string;
  details: string;
  timestamp: string;
  severity: number;
  state: string;
  requires_ack: boolean;
  sound: boolean;
}

export default function GovernanceAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchAlerts();
  }, [filter]);

  const fetchAlerts = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('state', filter);
      }
      
      const response = await fetch(`/api/foreman/alerts?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      const response = await fetch(`/api/foreman/alerts/${alertId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user' }),
      });
      
      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const handleDismiss = async (alertId: string) => {
    try {
      const response = await fetch(`/api/foreman/alerts/${alertId}/dismiss`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user' }),
      });
      
      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
      alert('Cannot dismiss: Alert must be acknowledged first');
    }
  };

  const getSeverityBadge = (severity: number) => {
    if (severity >= 5) return 'bg-red-600 text-white';
    if (severity >= 4) return 'bg-orange-500 text-white';
    if (severity >= 3) return 'bg-yellow-500 text-black';
    if (severity >= 2) return 'bg-blue-400 text-white';
    return 'bg-gray-400 text-white';
  };

  const getSeverityText = (severity: number) => {
    if (severity >= 5) return 'CRITICAL';
    if (severity >= 4) return 'HIGH';
    if (severity >= 3) return 'MEDIUM';
    if (severity >= 2) return 'LOW';
    return 'INFO';
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Governance Alerts</h1>
        <p>Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Governance Alerts</h1>
      
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('acknowledged')}
          className={`px-4 py-2 rounded ${filter === 'acknowledged' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Acknowledged
        </button>
        <button
          onClick={() => setFilter('dismissed')}
          className={`px-4 py-2 rounded ${filter === 'dismissed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Dismissed
        </button>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded text-center">
          <p className="text-gray-600">No alerts found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityBadge(alert.severity)}`}>
                      {getSeverityText(alert.severity)}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-medium uppercase">
                      {alert.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {alert.state}
                    </span>
                    {alert.sound && (
                      <span className="text-xs">🔔</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{alert.message}</h3>
                  <p className="text-gray-600 text-sm mb-2">{alert.details}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {alert.state === 'active' && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Acknowledge
                    </button>
                  )}
                  {(alert.state === 'acknowledged' || !alert.requires_ack) && alert.state !== 'dismissed' && (
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
