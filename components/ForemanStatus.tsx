/**
 * ForemanStatus Component
 * Displays the current status of the Foreman orchestration engine
 */

export default function ForemanStatus() {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Foreman Status</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="text-green-600 font-medium">Active</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Activity:</span>
          <span className="font-medium">No recent activity</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pending Tasks:</span>
          <span className="font-medium">0</span>
        </div>
      </div>
    </div>
  )
}
