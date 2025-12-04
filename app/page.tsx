import ForemanStatus from '@/components/ForemanStatus'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Maturion Foreman App</h1>
        <p className="text-lg mb-8">
          A Next.js application for managing Foreman tasks via GitHub webhooks.
        </p>
        <ForemanStatus />
      </div>
    </main>
  )
}
