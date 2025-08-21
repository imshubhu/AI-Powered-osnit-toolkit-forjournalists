"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DragDropImageUploader from "./drag-and-drop";
import { analyzeFakeImage } from "@/lib/api";

interface ResultProps {
    label: string,
    score: number
}

export default function FakeImage() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResultProps | null>(null);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>()

    const handleFile = (file: any) => {
        console.log('file', file)
        setFile(file)
    };

    async function analyze() {
        setLoading(true);
        setError('');
        setResult(null);
        try {
            if (!file) throw new Error('No file selected');
            const data = await analyzeFakeImage(file);
            console.log('data', data)
            if (data.success) {
                setResult(data.verdict);
            }
        } catch (e: any) {
            setError(String(e.message || e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-12">
            <header className="flex items-center justify-around">
                <h1 className="text-2xl md:text-3xl font-semibold">Detect Fake Image</h1>
            </header>

            <div className="grid gap-4 mt-2">
                <DragDropImageUploader fileProcess={handleFile} />
                <div className="flex gap-3">
                    <Button
                        onClick={analyze}
                        disabled={loading}
                        className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Analyzing…' : 'Analyze'}
                    </Button>
                    <Button
                        onClick={() => { setFile(null); setResult(null); setError(''); }}
                        className="px-4 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 cursor-pointer"
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                    {error}
                </div>
            )}

            {
                result && (
                    <div className="p-4 rounded-2xl ">
                        <p> Result: <span> {result.label} </span> </p>
                        <p> Score: <span> {result.score} </span> </p>
                    </div>
                )
            }

        </div>
    )

}