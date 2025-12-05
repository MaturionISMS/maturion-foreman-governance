/**
 * Sidebar Component
 * Navigation sidebar for Foreman Office
 */

'use client';

import { useState } from 'react';

interface SidebarProps {
  onNavigate?: (section: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('chat');

  const menuItems = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'history', label: 'Build History', icon: '📜' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'logs', label: 'Logs', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleClick = (id: string) => {
    setActiveSection(id);
    onNavigate?.(id);
  };

  return (
    <div className="w-64 bg-foremanOffice-background border-r border-foremanOffice-border flex flex-col h-full">
      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-foremanOffice-primary text-white'
                  : 'text-gray-400 hover:bg-foremanOffice-panel hover:text-foremanOffice-text'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Pilot Wave Report Link */}
      <div className="p-3 border-t border-foremanOffice-border">
        <a
          href="/reports/FOREMAN_PILOT_BUILD_REPORT.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-foremanOffice-panel hover:text-foremanOffice-accent transition-colors"
        >
          <span className="text-xl">📊</span>
          <span className="font-medium text-sm">Pilot Wave Report</span>
        </a>
      </div>
    </div>
  );
}
