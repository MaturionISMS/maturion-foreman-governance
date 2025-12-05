'use client';

/**
 * Johan's Foreman Office
 * Modern, themed interface for ISMS build orchestration
 */

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage, ChatExecutionStatus } from '@/types/foreman';
import Header from '@/components/foreman/Header';
import ChatBubble from '@/components/foreman/ChatBubble';
import StatusEvent from '@/components/foreman/StatusEvent';
import BuildTimeline from '@/components/foreman/BuildTimeline';
import UploadDropzone from '@/components/foreman/UploadDropzone';
import Sidebar from '@/components/foreman/Sidebar';

export default function ForemanChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [executionStatus, setExecutionStatus] = useState<ChatExecutionStatus | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="flex h-screen bg-foremanOffice-background overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          status={isLoading ? 'executing' : executionStatus ? 'idle' : 'online'}
          conversationId={conversationId}
          onRunPilotBuild={async () => {
            setIsLoading(true);
            await triggerPilotBuild();
            setIsLoading(false);
          }}
          isLoading={isLoading}
        />

        {/* Two-Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-foremanOffice-border">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-12">
                  <div className="mb-6">
                    <span className="text-6xl">👷</span>
                  </div>
                  <p className="text-xl font-semibold text-foremanOffice-text mb-3">
                    Welcome to Johan&apos;s Foreman Office
                  </p>
                  <p className="text-sm mb-4">Ask Foreman about:</p>
                  <ul className="text-sm space-y-2 max-w-md mx-auto">
                    <li className="flex items-center gap-2">
                      <span className="text-foremanOffice-accent">▸</span>
                      <span>Architecture gaps and improvements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-foremanOffice-accent">▸</span>
                      <span>Running self-tests or integration tests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-foremanOffice-accent">▸</span>
                      <span>Build waves and deployment strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-foremanOffice-accent">▸</span>
                      <span>QA and compliance requirements</span>
                    </li>
                  </ul>
                </div>
              )}

              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              {/* Execution Status */}
              {executionStatus && (
                <div className="flex justify-start">
                  <StatusEvent status={executionStatus} />
                </div>
              )}

              {isLoading && !executionStatus && (
                <div className="flex justify-start">
                  <div className="bg-foremanOffice-panel border border-foremanOffice-border px-4 py-3 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-foremanOffice-primary rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="h-2 w-2 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-400">Foreman is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Sticky */}
            <div className="bg-foremanOffice-panel border-t border-foremanOffice-border px-6 py-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Foreman anything..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-foremanOffice-background border border-foremanOffice-border rounded-lg text-foremanOffice-text placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-foremanOffice-primary focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-3 bg-foremanOffice-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Foreman uses GPT-4 with organization-specific governance rules
              </p>
            </div>
          </div>

          {/* Right Panel - Telemetry & Actions */}
          <div className="w-96 bg-foremanOffice-background overflow-y-auto p-6 space-y-6 hidden lg:block">
            <div>
              <h2 className="text-lg font-semibold text-foremanOffice-text mb-4">
                Build Telemetry
              </h2>

              {/* Build Timeline */}
              {executionStatus && (
                <BuildTimeline status={executionStatus} />
              )}

              {/* Placeholder when no build is running */}
              {!executionStatus && (
                <div className="bg-foremanOffice-panel border border-foremanOffice-border rounded-lg p-6 text-center">
                  <span className="text-4xl opacity-30">📊</span>
                  <p className="text-sm text-gray-500 mt-3">
                    Build telemetry will appear here during execution
                  </p>
                </div>
              )}
            </div>

            {/* Document Upload Placeholder */}
            <div>
              <h2 className="text-lg font-semibold text-foremanOffice-text mb-4">
                Documents
              </h2>
              <UploadDropzone />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-foremanOffice-text mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-foremanOffice-panel border border-foremanOffice-border text-foremanOffice-text rounded-lg hover:bg-foremanOffice-panel/50 transition-colors text-sm text-left">
                  📋 View Build History
                </button>
                <button className="w-full px-4 py-2 bg-foremanOffice-panel border border-foremanOffice-border text-foremanOffice-text rounded-lg hover:bg-foremanOffice-panel/50 transition-colors text-sm text-left">
                  ✓ Check Task Queue
                </button>
                <button className="w-full px-4 py-2 bg-foremanOffice-panel border border-foremanOffice-border text-foremanOffice-text rounded-lg hover:bg-foremanOffice-panel/50 transition-colors text-sm text-left">
                  📊 Generate Report
                </button>
              </div>
            </div>
          </div>
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
