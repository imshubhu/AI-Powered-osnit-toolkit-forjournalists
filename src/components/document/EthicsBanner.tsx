// components/EthicsBanner.tsx
export default function EthicsBanner() {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 mt-5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              Ethical OSINT Toolkit • All AI decisions are transparent and verifiable
            </span>
          </div>
        </div>
      </div>
    );
  }