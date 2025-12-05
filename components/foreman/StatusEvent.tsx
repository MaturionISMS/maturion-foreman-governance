/**
 * StatusEvent Component
 * Displays build status updates with icons and animations
 */

import type { ChatExecutionStatus } from '@/types/foreman';

interface StatusEventProps {
  status: ChatExecutionStatus;
}

export default function StatusEvent({ status }: StatusEventProps) {
  const getStatusIcon = () => {
    switch (status.status) {
      case 'planning': return '📋';
      case 'selecting_builder': return '🔍';
      case 'running': return '⚙️';
      case 'qa_phase': return '✅';
      case 'opening_pr': return '📤';
      case 'complete': return '🎉';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'complete': return 'from-green-900/40 to-green-800/20 border-green-700/50 text-green-300';
      case 'error': return 'from-red-900/40 to-red-800/20 border-red-700/50 text-red-300';
      case 'qa_phase': return 'from-blue-900/40 to-blue-800/20 border-blue-700/50 text-blue-300';
      case 'running': return 'from-foremanOffice-primary/20 to-foremanOffice-primary/5 border-foremanOffice-primary/30 text-blue-300';
      default: return 'from-foremanOffice-accent/20 to-foremanOffice-accent/5 border-foremanOffice-accent/30 text-yellow-300';
    }
  };

  const isAnimated = status.status === 'running' || status.status === 'planning' || status.status === 'selecting_builder';

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg border bg-gradient-to-r ${getStatusColor()} text-sm mb-2 transition-all duration-300 ${
      isAnimated ? 'animate-pulse' : ''
    }`}>
      <span className="text-2xl">{getStatusIcon()}</span>
      <div>
        <span className="font-semibold">{status.message}</span>
        {status.builderUsed && (
          <div className="text-xs opacity-80 mt-0.5">
            Builder: {status.builderUsed}
          </div>
        )}
      </div>
    </div>
  );
}
