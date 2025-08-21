"use client"
import { useState } from 'react';
import DocumentUpload from '@/components/document/DocumentUpload';
import AnalysisResults from '@/components/document/AnalysisResults';
import EthicsBanner from '@/components/document/EthicsBanner';
import { DocumentAnalysis } from '@/types/document';
import { analyzeDocumentIntelligence } from '@/lib/api';

export default function DocumentAnalysisPage() {
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeDocumentIntelligence(file);
      console.log('data', data)
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <EthicsBanner />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Document Intelligence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white">
            AI-powered analysis for investigative journalists. 
            Extract insights while maintaining ethical standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Input */}
          <div className="bg-white rounded-xl shadow-lg p-8 dark:bg-neutral-800/60">
            <DocumentUpload 
              onAnalyze={handleAnalysis}
              loading={loading}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-xl shadow-lg p-8 dark:bg-neutral-800/60">
            <AnalysisResults analysis={analysis} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}