'use client';

/**
 * Incidents Page
 * Part of CS3: Incident Feedback Loop & Verification Workflow
 * 
 * Displays active incidents and allows user verification
 */

import { useState, useEffect } from 'react';
import type { Incident } from '@/lib/foreman/incidents/incident-model';

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingIncident, setProcessingIncident] = useState<string | null>(null);

  // Load incidents on mount
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/foreman/incidents?active=true');
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to load incidents');
      }

      setIncidents(data.incidents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('[Incidents Page] Error loading incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (incidentId: string, feedback: string) => {
    try {
      setProcessingIncident(incidentId);

      const response = await fetch('/api/foreman/incidents/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incidentId,
          feedback,
          userId: 'user',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      // Reload incidents to get updated state
      await loadIncidents();

      // Show success message
      alert(`Feedback recorded: ${feedback}\n\n${data.nextAction}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('[Incidents Page] Error submitting feedback:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setProcessingIncident(null);
    }
  };

  const getStateColor = (state: string): string => {
    switch (state) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'fixing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'awaiting-verification':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStateBadge = (state: string): string => {
    return state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incidents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Incident Verification
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and verify deployed features
              </p>
            </div>
            <button
              onClick={loadIncidents}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {incidents.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No active incidents</h3>
            <p className="mt-1 text-sm text-gray-500">
              All deployments have been verified.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Incident Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {incident.component}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStateColor(
                            incident.state
                          )}`}
                        >
                          {getStateBadge(incident.state)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {incident.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Created: {new Date(incident.created_at).toLocaleString()}</span>
                        {incident.pr_url && (
                          <a
                            href={incident.pr_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View PR →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incident Body */}
                <div className="px-6 py-4">
                  {/* Fix Attempts */}
                  {incident.fix_attempts.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Fix Attempts ({incident.fix_attempts.length})
                      </h4>
                      <div className="space-y-2">
                        {incident.fix_attempts.map((attempt) => (
                          <div
                            key={attempt.attemptNumber}
                            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  Attempt #{attempt.attemptNumber}: {attempt.strategy}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {attempt.description}
                                </p>
                              </div>
                              <div className="ml-4 flex space-x-2">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    attempt.qicPassed
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  QIC: {attempt.qicPassed ? '✓' : '✗'}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    attempt.qielPassed
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  QIEL: {attempt.qielPassed ? '✓' : '✗'}
                                </span>
                              </div>
                            </div>
                            {attempt.prUrl && (
                              <a
                                href={attempt.prUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                              >
                                View Fix PR →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lessons Learned */}
                  {incident.lessons_learned.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Lessons Learned
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {incident.lessons_learned.map((lesson, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ACR Flag */}
                  {incident.requires_acr && (
                    <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-yellow-800">
                        ⚠️ Architecture Change Request Required
                      </p>
                      {incident.acr_id && (
                        <p className="text-xs text-yellow-700 mt-1">
                          ACR ID: {incident.acr_id}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Verification Buttons */}
                  {incident.state !== 'resolved' && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Please verify this deployment:
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleFeedback(incident.id, 'not_visible')}
                          disabled={processingIncident === incident.id}
                          className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {processingIncident === incident.id ? '...' : 'Not Visible'}
                        </button>
                        <button
                          onClick={() => handleFeedback(incident.id, 'not_functional')}
                          disabled={processingIncident === incident.id}
                          className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {processingIncident === incident.id ? '...' : 'Not Functional'}
                        </button>
                        <button
                          onClick={() => handleFeedback(incident.id, 'incorrect_behavior')}
                          disabled={processingIncident === incident.id}
                          className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {processingIncident === incident.id ? '...' : 'Incorrect Behavior'}
                        </button>
                        <button
                          onClick={() => handleFeedback(incident.id, 'resolved')}
                          disabled={processingIncident === incident.id}
                          className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {processingIncident === incident.id ? '...' : 'Resolved ✓'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
