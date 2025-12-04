/**
 * LayoutShell Component
 * Main layout wrapper for the application
 */

import { ReactNode } from 'react'

interface LayoutShellProps {
  children: ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Maturion Foreman
            </h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
