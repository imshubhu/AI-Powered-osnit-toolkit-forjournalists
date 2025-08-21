'use client';
import EntityResults from '@/components/entities/EntityResults';
import SearchForm from '@/components/entities/SearchForm';
import { searchEntities } from '@/lib/api';
import { useState } from 'react';

interface searchProp {
    name: string,
    context: string | null
}

export default function Home() {
    const [results, setResults] = useState(null);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    const [lastSearch, setLastSearch] = useState<searchProp | null>(null);

    const handleSearch = async (name: string, context: string | null) => {
        setLoading(true);
        setError(null);

        try {
            const data = await searchEntities(name, context);
            setResults(data);
            setLastSearch({ name, context });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12">
            <header className="flex items-center justify-around">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        OSINT Entity Disambiguator
                    </h1>
                    <p className="text-gray-900 dark:text-indigo-100 mt-1 max-w-2xl">
                        Ethical AI-powered search for journalists. All results from public sources only.
                    </p>
                </div>
            </header>

            <div className="grid gap-4 mt-2">
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Ethics Banner */}
                    <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-4 py-3 bg-amber-50 border-l-4 border-amber-400">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <p className="text-sm text-amber-700">
                                        <strong>Journalist Ethics Notice:</strong> This tool analyzes publicly available information only.
                                        AI outputs require manual verification. Never rely solely on automated analysis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SearchForm
                        onSearch={handleSearch}
                        loading={loading}
                        lastSearch={lastSearch}
                    />

                    {/* Error Handling */}
                    {error && (
                        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Results */}
                    {results && <EntityResults results={results} />}
                </main>
            </div>
        </div>
    );
}
