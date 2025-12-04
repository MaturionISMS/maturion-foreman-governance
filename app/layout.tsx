import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maturion Foreman App',
  description: 'A Foreman app hosted by Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
