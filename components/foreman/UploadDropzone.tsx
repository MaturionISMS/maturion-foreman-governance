/**
 * UploadDropzone Component
 * Placeholder for future document upload functionality
 */

export default function UploadDropzone() {
  return (
    <div className="bg-foremanOffice-panel border-2 border-dashed border-foremanOffice-border rounded-lg p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-foremanOffice-background rounded-full flex items-center justify-center">
          <span className="text-3xl opacity-50">📄</span>
        </div>
        <div>
          <h3 className="text-foremanOffice-text font-semibold mb-1">Document Upload</h3>
          <p className="text-sm text-gray-400">
            Document upload will be available in a future wave.
          </p>
        </div>
        <button
          disabled
          className="px-4 py-2 bg-gray-700 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}
