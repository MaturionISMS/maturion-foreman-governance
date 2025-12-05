'use client';

/**
 * Foreman Chat UI
 * Interactive chat interface for communicating with Foreman
 */

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage, ChatMessageMetadata, ChatExecutionStatus } from '@/types/foreman';

// Status bubble component
function StatusBubble({ status }: { status: ChatExecutionStatus }) {
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
      case 'complete': return 'bg-green-100 border-green-300 text-green-800';
      case 'error': return 'bg-red-100 border-red-300 text-red-800';
      case 'qa_phase': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor()} text-sm mb-2`}>
      <span className="text-lg">{getStatusIcon()}</span>
      <span className="font-medium">{status.message}</span>
    </div>
  );
}

// Result card component
function ResultCard({ status }: { status: ChatExecutionStatus }) {
  if (status.status !== 'complete' || !status.prLink) return null;

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
      <h4 className="font-semibold text-green-800 mb-2">✅ Build Complete</h4>
      <div className="space-y-2 text-sm">
        {status.filesChanged && status.filesChanged.length > 0 && (
          <div>
            <span className="font-medium text-gray-700">Files changed:</span>
            <span className="ml-2 text-gray-600">{status.filesChanged.length}</span>
          </div>
        )}
        {status.builderUsed && (
          <div>
            <span className="font-medium text-gray-700">Builder used:</span>
            <span className="ml-2 text-gray-600">{status.builderUsed}</span>
          </div>
        )}
        {status.prLink && (
          <div>
            <span className="font-medium text-gray-700">PR link:</span>
            <a 
              href={status.prLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              {status.prLink}
            </a>
          </div>
        )}
        {status.qaSummary && (
          <div>
            <span className="font-medium text-gray-700">QA summary:</span>
            <span className="ml-2 text-gray-600">{status.qaSummary}</span>
          </div>
        )}
        {status.complianceSummary && (
          <div>
            <span className="font-medium text-gray-700">Compliance summary:</span>
            <span className="ml-2 text-gray-600">{status.complianceSummary}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ForemanChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [executionStatus, setExecutionStatus] = useState<ChatExecutionStatus | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, executionStatus]);

  // Detect pilot build command
  const detectPilotBuildCommand = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    // Use regex patterns similar to orchestrator for precision
    const patterns = [
      /\/foreman\s+run\s+pilot/i,
      /@?foreman[,\s]+run\s+pilot/i,
      /run\s+pilot\s+build\s+wave/i
    ];
    
    return patterns.some(pattern => pattern.test(lowerMessage));
  };

  // Trigger pilot build
  const triggerPilotBuild = async () => {
    const pilotMessage: ChatMessage = {
      id: `msg_${Date.now()}_system`,
      role: 'assistant',
      content: '🚀 Triggering Pilot Build Wave...',
      timestamp: new Date(),
      organisationId: '',
      conversationId: conversationId || '',
    };

    setMessages((prev) => [...prev, pilotMessage]);

    try {
      const response = await fetch('/api/foreman/run-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pilot: true,
          organisationId: 'maturion_isms',
          autonomousBuildEnabled: true,
          createPR: true,
          generateReport: true,
          pilotWave: true,
          waveNumber: 1,
          feature: 'foreman-status-dashboard',
          owner: 'MaturionISMS',
          repo: 'maturion-foreman-app',
          branch: 'foreman/pilot-wave',
          baseBranch: 'main',
        }),
      });

      const data = await response.json();

      const resultMessage: ChatMessage = {
        id: `msg_${Date.now()}_result`,
        role: 'assistant',
        content: data.success
          ? `✅ Pilot Build Wave initiated successfully!\n\n` +
            `Sequence ID: ${data.sequenceId}\n` +
            `Status: ${data.status}\n` +
            `${data.prUrl ? `PR: ${data.prUrl}\n` : ''}` +
            `${data.reportPath ? `Report: ${data.reportPath}\n` : ''}\n` +
            `${data.message || ''}`
          : `❌ Pilot Build Wave failed: ${data.error || 'Unknown error'}`,
        timestamp: new Date(),
        organisationId: '',
        conversationId: conversationId || '',
      };

      setMessages((prev) => [...prev, resultMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: `❌ Failed to trigger pilot build: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
        organisationId: '',
        conversationId: conversationId || '',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Send message to Foreman
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      organisationId: '', // Will be set by server
      conversationId: conversationId || '', // Will be set by server
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Check if this is a pilot build command
    if (detectPilotBuildCommand(currentMessage)) {
      await triggerPilotBuild();
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/foreman/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationId: conversationId,
          // Organisation ID is set server-side from environment or request context
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Set conversation ID if this is the first message
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId);
        }

        // Handle execution status if present
        if (data.response.executionStatus) {
          setExecutionStatus(data.response.executionStatus);
        }

        // Add Foreman's response to chat
        const foremanMessage: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          role: 'assistant',
          content: data.response.replyText,
          timestamp: new Date(data.timestamp),
          metadata: data.response.metadata,
          organisationId: '', // Set by server
          conversationId: data.conversationId,
          proposedActions: data.response.proposedActions,
        };

        setMessages((prev) => [...prev, foremanMessage]);
      } else {
        // Handle error
        const errorMessage: ChatMessage = {
          id: `msg_${Date.now()}_error`,
          role: 'assistant',
          content: `Error: ${data.error || 'Failed to get response from Foreman'}`,
          timestamp: new Date(),
          organisationId: '',
          conversationId: conversationId || '',
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date(),
        organisationId: '',
        conversationId: conversationId || '',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Foreman Chat</h1>
            <p className="text-sm text-gray-600 mt-1">
              Ask Foreman about architecture, builds, QA, and compliance
            </p>
            {conversationId && (
              <p className="text-xs text-gray-400 mt-1">
                Conversation ID: {conversationId}
              </p>
            )}
          </div>
          <button
            onClick={async () => {
              setIsLoading(true);
              await triggerPilotBuild();
              setIsLoading(false);
            }}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors text-sm"
          >
            🚀 Run Pilot Build
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium">Start a conversation with Foreman</p>
            <p className="text-sm mt-2">Try asking about:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Architecture gaps and improvements</li>
              <li>• Running self-tests or integration tests</li>
              <li>• Build waves and deployment strategies</li>
              <li>• QA and compliance requirements</li>
            </ul>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm">
                  {message.role === 'user' ? 'You' : 'Foreman'}
                </span>
                <span className={`text-xs ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>

              {/* Message Content */}
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>

              {/* Metadata Tags */}
              {message.metadata && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {message.metadata.wave && (
                    <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">
                      Wave: {message.metadata.wave}
                    </span>
                  )}
                  {message.metadata.module && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                      Module: {message.metadata.module}
                    </span>
                  )}
                  {message.metadata.actionType && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                      Action: {message.metadata.actionType}
                    </span>
                  )}
                  {message.metadata.builderType && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                      Builder: {message.metadata.builderType}
                    </span>
                  )}
                  {message.metadata.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Proposed Actions */}
              {message.proposedActions && message.proposedActions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-semibold mb-2">Proposed Actions:</p>
                  <div className="space-y-2">
                    {message.proposedActions.map((action, idx) => (
                      <div
                        key={idx}
                        className="text-sm bg-gray-50 px-3 py-2 rounded border border-gray-200"
                      >
                        <div className="font-medium">{action.type}</div>
                        {action.params?.description && (
                          <div className="text-gray-600 mt-1">{action.params.description}</div>
                        )}
                        {action.params?.builder && (
                          <div className="text-xs text-gray-500 mt-1">
                            Builder: {action.params.builder}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Execution Status */}
        {executionStatus && (
          <div className="flex justify-start">
            <div className="max-w-3xl px-4 py-3 rounded-lg bg-white border border-gray-200">
              <div className="space-y-2">
                <StatusBubble status={executionStatus} />
                {executionStatus.status === 'complete' && (
                  <ResultCard status={executionStatus} />
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl px-4 py-3 rounded-lg bg-white border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500">Foreman is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Foreman anything..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Foreman uses GPT-4 with organization-specific governance rules
        </p>
      </div>
    </div>
  );
}
