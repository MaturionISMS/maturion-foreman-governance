/**
 * BuildTimeline Component
 * Shows animated build events timeline
 */

import type { ChatExecutionStatus } from '@/types/foreman';

interface BuildTimelineProps {
  status: ChatExecutionStatus;
}

export default function BuildTimeline({ status }: BuildTimelineProps) {
  const events = [
    { key: 'planning', label: 'Planning', icon: '📋' },
    { key: 'selecting_builder', label: 'Builder Selection', icon: '🔍' },
    { key: 'running', label: 'Executing', icon: '⚙️' },
    { key: 'qa_phase', label: 'QA Review', icon: '✅' },
    { key: 'opening_pr', label: 'Opening PR', icon: '📤' },
    { key: 'complete', label: 'Complete', icon: '🎉' },
  ];

  const getCurrentIndex = () => {
    const index = events.findIndex(e => e.key === status.status);
    return index >= 0 ? index : 0;
  };

  const currentIndex = getCurrentIndex();

  return (
    <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foremanOffice-text mb-4">Build Progress</h3>
      <div className="space-y-3">
        {events.map((event, index) => {
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex || status.status === 'complete';
          const isError = status.status === 'error' && index === currentIndex;

          return (
            <div key={event.key} className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isError
                    ? 'bg-red-900/40 border-red-700 text-red-300'
                    : isComplete
                    ? 'bg-green-900/40 border-green-700 text-green-300'
                    : isActive
                    ? 'bg-foremanOffice-primary/20 border-foremanOffice-primary text-blue-300 animate-pulse'
                    : 'bg-foremanOffice-background border-foremanOffice-border text-gray-600'
                }`}
              >
                <span className="text-sm">{event.icon}</span>
              </div>

              {/* Label */}
              <div className="flex-1">
                <div
                  className={`text-sm font-medium transition-colors ${
                    isError
                      ? 'text-red-300'
                      : isComplete
                      ? 'text-green-300'
                      : isActive
                      ? 'text-foremanOffice-primary'
                      : 'text-gray-600'
                  }`}
                >
                  {event.label}
                </div>
                {isActive && status.message && (
                  <div className="text-xs text-gray-400 mt-0.5">{status.message}</div>
                )}
              </div>

              {/* Status Indicator */}
              {isComplete && !isError && (
                <div className="text-green-500 text-sm">✓</div>
              )}
              {isError && (
                <div className="text-red-500 text-sm">✗</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {status.status === 'complete' && (
        <div className="mt-4 pt-4 border-t border-foremanOffice-border">
          <div className="space-y-2 text-sm">
            {status.filesChanged && status.filesChanged.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Files Changed:</span>
                <span className="text-foremanOffice-text font-medium">
                  {status.filesChanged.length}
                </span>
              </div>
            )}
            {status.builderUsed && (
              <div className="flex justify-between">
                <span className="text-gray-400">Builder:</span>
                <span className="text-foremanOffice-text font-medium">{status.builderUsed}</span>
              </div>
            )}
            {status.prLink && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PR:</span>
                <a
                  href={status.prLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foremanOffice-primary hover:text-blue-400 underline text-xs truncate max-w-xs"
                >
                  View Pull Request
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {status.status === 'error' && status.error && (
        <div className="mt-4 pt-4 border-t border-red-900/50">
          <div className="text-sm text-red-300 bg-red-900/20 border border-red-800/50 rounded p-3">
            <div className="font-semibold mb-1">Error:</div>
            <div className="text-xs">{status.error}</div>
          </div>
        </div>
      )}
    </div>
  );
}
