'use client';

import { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (name: string, context: string | null) => void;
  loading: boolean;
  lastSearch: { name: string; context: string | null } | null;
}

export default function SearchForm({ onSearch, loading, lastSearch }: SearchFormProps) {
  const [name, setName] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [showContext, setShowContext] = useState<boolean>(false);

  useEffect(() => {
    if (lastSearch) {
      setName(lastSearch.name);
      setContext(lastSearch.context || '');
    }
  }, [lastSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(name.trim(), context.trim() || null);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-neutral-800/60">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                Entity Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full h-12 pl-10 sm:text-sm border-2 border-gray-300 rounded-md dark:text-white"
                  placeholder="e.g., Apple, John Smith, Greenpeace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-white">
                Enter the name you want to disambiguate (minimum 2 characters)
              </p>
            </div>

            {/* Context Toggle */}
            <div className="flex items-center">
              <input
                id="context-toggle"
                name="context-toggle"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300 rounded dark:text-white"
                checked={showContext}
                onChange={(e) => setShowContext(e.target.checked)}
              />
              <label htmlFor="context-toggle" className="ml-2 block text-sm text-gray-700 dark:text-white">
                Add context for better results (recommended)
              </label>
            </div>

            {/* Context Field */}
            {showContext && (
              <div className="ml-6">
                <label htmlFor="context" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Context
                </label>
                <div className="mt-1">
                  <textarea
                    id="context"
                    name="context"
                    rows={3}
                    className="shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md dark:text-white"
                    placeholder="e.g., Founded by Steve Jobs in 1976, this company makes iPhones"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-white">
                  Providing context helps AI disambiguate entities (e.g., "Apple" as company vs. fruit)
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || name.trim().length < 2}
                className={`w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading || name.trim().length < 2 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2A8.001 8.001 0 0020.418 9m0 0h-5m-6 6h5m-6 6v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2V15" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Search Entity'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}