'use client';
import { analyzeFakeNews } from '@/lib/api';
import { useState } from 'react';

interface AnalyseProps {
    verdict: string;
    confidence: number;
    zeroShot: { true: number; unverified: number; misleading: number; false: number };
    heuristics: { clickbait: boolean; hedging: boolean; sensational: boolean; subjectivity: number; readabilityRisk: string; fleschReadingEase: number };
    rationale: string;
    tips: string[]
}

export default function Home() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalyseProps | null>(null);
    const [error, setError] = useState('');

    async function analyze() {
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const data = await analyzeFakeNews(text)
            // const data = await res.json();
            // if (!res.ok) throw new Error(data.error || 'Request failed');
            setResult(data);
        } catch (e: any) {
            setError(String(e.message || e));
        } finally {
            setLoading(false);
        }
    }

    const verdictColor = {
        'real': 'bg-emerald-600',
        'unverified': 'bg-yellow-600',
        'misleading': 'bg-orange-600',
        'fake': 'bg-red-600'
    };

    return (
        <div className="max-w-4xl mx-auto mt-12">
            <header className="flex items-center justify-around">
                <h1 className="text-2xl md:text-3xl font-semibold">Fake News Text Checker</h1>
            </header>

            <div className="grid gap-4 mt-2">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste the article/claim text here..."
                    rows={10}
                    className="w-full px-3 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/60"
                />
                <div className="flex gap-3">
                    <button
                        onClick={analyze}
                        disabled={loading || !text.trim()}
                        className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Analyzing…' : 'Analyze'}
                    </button>
                    <button
                        onClick={() => { setText(''); setResult(null); setError(''); }}
                        className="px-4 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 cursor-pointer"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                    {error}
                </div>
            )}

            {result && (
                <section className="space-y-4 mt-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-white ${verdictColor[result.verdict as keyof typeof verdictColor]}`}>
                        <span className="capitalize font-semibold">{result.verdict}</span>
                        <span className="text-sm opacity-80">({(result.confidence * 100).toFixed(1)}%)</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <ScoreCard label="Zero-shot: True" value={result.zeroShot.true} />
                        <ScoreCard label="Zero-shot: Unverified" value={result.zeroShot.unverified} />
                        <ScoreCard label="Zero-shot: Misleading" value={result.zeroShot.misleading} />
                        <ScoreCard label="Zero-shot: False" value={result.zeroShot.false} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <InfoCard label="Clickbait" info={result.heuristics.clickbait} />
                        <InfoCard label="Hedging" info={result.heuristics.hedging} />
                        <InfoCard label="Sensational" info={result.heuristics.sensational} />
                        <InfoCard label="Subjectivity" info={result.heuristics.subjectivity} />
                        <InfoCard label="Readability Risk" info={result.heuristics.readabilityRisk} />
                        <InfoCard label="Flesch Reading Ease" info={result.heuristics.fleschReadingEase ? result.heuristics.fleschReadingEase.toFixed(1) : ''} />
                    </div>

                    {result.rationale?.length > 0 && (
                        <div className="p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700">
                            <h3 className="font-semibold mb-2">Why this verdict?</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {result.rationale}
                            </ul>
                        </div>
                    )}

                    <div className="p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700">
                        <h3 className="font-semibold mb-2">Tips</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {result.tips.map((t, i) => (<li key={i}>{t}</li>))}
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
}

interface ScoreCardProps {
    label: string;
    value: number;
}

function ScoreCard({ label, value }: ScoreCardProps) {
    const pct = Math.round((value || 0) * 100);
    return (
        <div className="p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700">
            <div className="flex justify-between mb-2">
                <span className="text-sm">{label}</span>
                {/* <span className="text-sm">{value}</span> */}
                <span className="text-sm">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div className="h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function InfoCard({ label, info }: { label: string, info: string | boolean | number }) {
    return (
        <div className="p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700">
            <div className="flex justify-between mb-2">
                <span className="text-sm">{label}</span>
                <span className="text-sm">{info}</span>
            </div>
        </div>
    );
}
