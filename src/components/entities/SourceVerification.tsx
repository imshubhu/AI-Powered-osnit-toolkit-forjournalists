interface SourceVerificationProps {
    entity: {
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
    };
}

export default function SourceVerification({ entity }: SourceVerificationProps) {
    return (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Verification Required
            </h4>
            <p className="text-blue-800 mb-3">
                AI analysis suggests this entity matches your context. <strong>Always verify manually</strong> using primary sources:
            </p>
            <div className="space-y-2">
                <a
                    href={entity.wikidata_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Check Wikidata Source
                </a>
                <p className="text-xs text-blue-700 mt-2">
                    <strong>AI Confidence:</strong> {entity?.context_match?.explanation} |
                    <span className="ml-1">Model: {entity._meta?.ai_model || 'Wikidata'}</span>
                </p>
            </div>
        </div>
    );
}