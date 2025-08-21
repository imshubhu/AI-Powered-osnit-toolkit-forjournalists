// components/AnalysisResults.tsx

import { DocumentAnalysis } from "@/types/document";

interface AnalysisResultsProps {
  analysis: DocumentAnalysis | null;
  loading: boolean;
}

export default function AnalysisResults({ analysis, loading }: AnalysisResultsProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-white">AI is analyzing your document...</p>
        <p className="text-sm text-gray-500 mt-2 dark:text-white">This may take 30-60 seconds</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-4 text-gray-500 dark:text-white">Upload a document to see analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Confidence Badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        ${analysis._meta.confidence >= 0.8 ? 'bg-green-100 text-green-800' : 
          analysis._meta.confidence >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'}`}
      >
        AI Confidence: {(analysis._meta.confidence * 100).toFixed(0)}%
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-cente dark:text-white">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          AI Summary
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 text-gray-800 leading-relaxed ">
          {analysis.summary.split(' ').map((word, i) => (
            word.startsWith('[REDACTED:') ? (
              <span key={i} className="bg-red-200 text-red-800 px-1 rounded font-medium mx-0.5">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          ))}
        </div>
      </div>

      {/* Entities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center dark:text-white">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.879-1.13M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Key Entities
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {analysis.entities.map((entity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2
                  ${entity.type === 'PER' ? 'bg-blue-100 text-blue-800' :
                    entity.type === 'ORG' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'}`}
                >
                  {entity.type}
                </span>
                <span className="font-medium">{entity.value}</span>
              </div>
              <div className="text-sm text-gray-500">
                {(entity.confidence * 100).toFixed(0)}% confidence
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Source Citations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center dark:text-white">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Source Citations
        </h3>
        <div className="space-y-3">
          {analysis.citations.map((citation, index) => (
            <blockquote key={index} className="border-l-4 border-green-500 pl-4 italic text-gray-700 bg-green-50 p-3 rounded-r dark:text-white">
              "{citation}"
            </blockquote>
          ))}
        </div>
      </div>

      {/* AI Transparency */}
      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2 dark:text-white">AI Transparency</h4>
        <div className="text-sm text-gray-600 space-y-1 dark:text-white">
          <p><strong>Models used:</strong> {analysis._meta.ai_models.summarization}, {analysis._meta.ai_models.ner}</p>
          <p><strong>Processing time:</strong> {analysis._meta.processing_time}</p>
          <p><strong>PII redacted:</strong> {analysis._meta.pii_redacted ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Verification Prompt */}
      {analysis._meta.confidence < 0.7 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Manual Verification Recommended
          </h4>
          <p className="text-sm text-yellow-700 mt-1">
            This analysis has low confidence. Please verify key findings manually.
          </p>
        </div>
      )}
    </div>
  );
}