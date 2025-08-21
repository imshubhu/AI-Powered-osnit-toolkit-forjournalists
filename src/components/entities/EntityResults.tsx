import ConfidenceBadge from './ConfidenceBadge';
import SourceVerification from './SourceVerification';

interface EntityResultsProps {
    results: {
        _meta: {
            context_entities: { text: string }[];
            ai_model?: string;
        };
        results: {
            id: string;
            label: string;
            context_match?: {
                score: number,
                explanation: string
            };
            type: string;
            description: string;
            aliases?: string[];
            wikidata_url: string;
            _meta?: {
                ai_model?: string;
            };
        }[];
    };
}

export default function EntityResults({ results }: EntityResultsProps) {
    return (
        <div className="mt-8">
            <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-neutral-800/60">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Search Results for "{results._meta?.context_entities?.[0]?.text || 'Entity'}"
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-white">
                        {results.results.length} potential matches found from public sources
                    </p>
                </div>

                <ul className="divide-y divide-gray-200">
                    {results.results.map((entity) => (
                        <li key={entity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="sm:w-2/3">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-medium text-gray-900 mr-2 dark:text-white">
                                            {entity.label}
                                        </h3>
                                        {entity.context_match && (
                                            <ConfidenceBadge score={entity.context_match.score} />
                                        )}
                                    </div>

                                    <p className="mt-1 text-gray-600 dark:text-white">
                                        <strong>Type:</strong> {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} |
                                        <span className="ml-1">{entity.description}</span>
                                    </p>

                                    {entity.aliases && entity.aliases.length > 0 && (
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">
                                            <strong>Also known as:</strong> {entity.aliases.join(', ')}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-3 sm:mt-0 sm:w-1/3 sm:text-right">
                                    <a
                                        href={entity.wikidata_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-900 font-medium dark:hover:text-white"
                                    >
                                        View Wikidata Source →
                                    </a>
                                </div>
                            </div>

                            {/* Verification Section */}
                            {entity.context_match && (
                                <SourceVerification entity={entity} />
                            )}
                        </li>
                    ))}
                </ul>

                {/* Results Footer */}
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 sm:px-6 dark:bg-neutral-800/60">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-500 dark:text-white">
                            <strong>AI Analysis:</strong> {results._meta?.ai_model || 'Wikidata search'}
                        </p>
                        <p className="mt-2 sm:mt-0 text-sm text-gray-500 dark:text-white ">
                            This tool only analyzes publicly available information.{' '}
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 dark:hover:text-white">
                                Review our ethics policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Journalist Guidance */}
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden dark:bg-neutral-800/60">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">Verification Guidance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-indigo-700 dark:text-indigo-200">1. Cross-reference</h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-white">
                                Verify against at least two independent primary sources before publication.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-indigo-700 dark:text-indigo-200">2. Context Matters</h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-white">
                                AI identifies patterns but cannot understand journalistic context. Always apply human judgment.
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-indigo-700 dark:text-indigo-200">3. Document Sources</h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-white">
                                Maintain a chain of custody for all information. Export your verification steps.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}