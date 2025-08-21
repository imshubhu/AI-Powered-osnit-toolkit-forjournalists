// components/DocumentUpload.tsx
import { useState } from 'react';

interface DocumentUploadProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
}

export default function DocumentUpload({ onAnalyze, loading }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [journalistId, setJournalistId] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only PDF, DOCX, TXT, JPG, PNG files are allowed');
        return;
      }

      // Validate size (<10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File too large. Maximum 10MB.');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !journalistId.trim()) return;
    onAnalyze(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="journalist-id" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
          Journalist ID
        </label>
        <input
          type="text"
          id="journalist-id"
          value={journalistId}
          onChange={(e) => setJournalistId(e.target.value)}
          placeholder="e.g., nytimes-12345"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
          required
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-white">
          Required for ethical accountability. Will not be stored.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
          Upload Document
        </label>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-green-700 font-medium">{file.name}</p>
              <p className="text-xs text-green-600">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Drop files here</p>
                <p className="text-gray-500 dark:text-white">or click to browse</p>
              </div>
              <p className="text-xs text-gray-400">
                Supports PDF, DOCX, TXT, JPG, PNG (max 10MB)
              </p>
            </div>
          )}
          
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleFiles(e.target.files)}
            accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!file || !journalistId || loading}
        className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Document...
          </>
        ) : (
          'Analyze Document'
        )}
      </button>

      <div className="text-xs text-gray-500 space-y-1 dark:text-white">
        <p>• All processing respects platform TOS</p>
        <p>• PII is automatically redacted</p>
        <p>• No data is stored on our servers</p>
      </div>
    </form>
  );
}