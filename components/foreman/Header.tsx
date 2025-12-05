/**
 * Header Component for Foreman Office
 * Themed header with Foreman branding and status indicator
 */

interface HeaderProps {
  status?: 'online' | 'idle' | 'executing';
  conversationId?: string | null;
  onRunPilotBuild?: () => void;
  isLoading?: boolean;
}

export default function Header({ 
  status = 'online', 
  conversationId,
  onRunPilotBuild,
  isLoading = false
}: HeaderProps) {
  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    executing: 'bg-blue-500 animate-pulse',
  };

  const statusLabels = {
    online: 'Online',
    idle: 'Idle',
    executing: 'Executing',
  };

  return (
    <div className="bg-foremanOffice-panel border-b border-foremanOffice-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Foreman Avatar Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-foremanOffice-accent rounded-lg">
            <span className="text-2xl">👷</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foremanOffice-text">
              Johan&apos;s Foreman Office
            </h1>
            <div className="flex items-center gap-3 mt-1">
              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
                <span className="text-sm text-gray-400">{statusLabels[status]}</span>
              </div>
              
              {conversationId && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-500">
                    Session: {conversationId.substring(0, 8)}...
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {onRunPilotBuild && (
          <button
            onClick={onRunPilotBuild}
            disabled={isLoading}
            className="px-4 py-2 bg-foremanOffice-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium transition-colors text-sm flex items-center gap-2"
          >
            <span>🚀</span>
            <span>Run Pilot Build</span>
          </button>
        )}
      </div>
    </div>
  );
}
