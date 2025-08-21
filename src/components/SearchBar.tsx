import { useState } from 'react';

export default function SearchBar({ onSearch, loading }: { onSearch: (query: string) => void, loading: boolean }) {
    const [query, setQuery] = useState('');

    return (
        <div className="flex items-center gap-2 mt-6">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topic..."
                className="w-full p-2 border rounded-md"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(query);
                    }
                }}
            />
            <button
                onClick={() => onSearch(query)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                disabled={loading}
            >
                {!loading ? 'Search' : 'Searching...'}
            </button>
        </div>
    );
}
