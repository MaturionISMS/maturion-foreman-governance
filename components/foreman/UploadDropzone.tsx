/**
 * UploadDropzone Component
 * Supports uploading documents (MD, TXT, JSON) for context injection
 */

'use client';

import { useState, useRef } from 'react';

interface UploadDropzoneProps {
  onFileUpload?: (file: File) => void;
  maxFileSizeMB?: number;
}

export default function UploadDropzone({ 
  onFileUpload, 
  maxFileSizeMB = 10 
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedExtensions = ['.md', '.txt', '.json'];
  const supportedTypes = ['text/markdown', 'text/plain', 'application/json'];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!supportedExtensions.includes(extension) && !supportedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Unsupported file type. Please upload ${supportedExtensions.join(', ')} files.` 
      };
    }

    // Check file size
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return { 
        valid: false, 
        error: `File too large. Maximum size is ${maxFileSizeMB}MB.` 
      };
    }

    return { valid: true };
  };

  const handleFile = async (file: File) => {
    setUploadStatus('uploading');
    setErrorMessage('');

    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadStatus('error');
      setErrorMessage(validation.error || 'Invalid file');
      return;
    }

    try {
      setUploadedFile(file);
      setUploadStatus('success');
      
      // Call parent callback if provided
      if (onFileUpload) {
        onFileUpload(file);
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`bg-foremanOffice-panel border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging
          ? 'border-foremanOffice-primary bg-blue-900/20'
          : uploadStatus === 'error'
          ? 'border-red-500/50'
          : uploadStatus === 'success'
          ? 'border-green-500/50'
          : 'border-foremanOffice-border'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-foremanOffice-background rounded-full flex items-center justify-center">
          <span className="text-3xl opacity-50">
            {uploadStatus === 'success' ? '✅' : uploadStatus === 'error' ? '❌' : '📄'}
          </span>
        </div>

        {uploadStatus === 'success' && uploadedFile ? (
          <div className="w-full">
            <h3 className="text-foremanOffice-text font-semibold mb-1">File Uploaded</h3>
            <p className="text-sm text-gray-400 mb-2">{uploadedFile.name}</p>
            <p className="text-xs text-green-400 mb-3">
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </p>
            <button
              onClick={handleRemoveFile}
              className="px-3 py-1 bg-foremanOffice-background text-gray-400 rounded text-xs hover:text-white transition-colors"
            >
              Remove
            </button>
          </div>
        ) : uploadStatus === 'error' ? (
          <div>
            <h3 className="text-red-400 font-semibold mb-1">Upload Failed</h3>
            <p className="text-sm text-gray-400 mb-2">{errorMessage}</p>
            <button
              onClick={() => setUploadStatus('idle')}
              className="px-4 py-2 bg-foremanOffice-background text-foremanOffice-text rounded-lg text-sm font-medium hover:bg-foremanOffice-panel transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : uploadStatus === 'uploading' ? (
          <div>
            <h3 className="text-foremanOffice-text font-semibold mb-1">Uploading...</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foremanOffice-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-foremanOffice-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-foremanOffice-text font-semibold mb-1">Upload Document</h3>
            <p className="text-sm text-gray-400 mb-3">
              Drag & drop or click to upload<br />
              <span className="text-xs">{supportedExtensions.join(', ')} • Max {maxFileSizeMB}MB</span>
            </p>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-foremanOffice-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={supportedExtensions.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}

