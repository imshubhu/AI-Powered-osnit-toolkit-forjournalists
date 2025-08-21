import { useState } from 'react';
import { entitiesNews, summarizeNews } from '../lib/api';
import Markdown from 'react-markdown'
import { Button } from './ui/button';

interface NewsCardProps {
    title: string;
    link: string;
    isoDate: string;
    content: string;
    // entities: string[];
}

export default function NewsCard({ title, link, content, isoDate }: NewsCardProps) {
    const [summary, setSummary] = useState('');
    const [entities, setEntities] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const handleSummarize = async () => {
        setLoading(true);
        const result = await summarizeNews([link]);
        setSummary(result);
        const entity_result = await entitiesNews(result);
        setEntities(entity_result);
        setLoading(false);
        setOpen(true)
    };

    const formattedDate = new Date(isoDate).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    return (
        <div className="p-4 border rounded-md shadow-sm ">
            {/* <h2 className="text-lg font-semibold text-black">{title}</h2> */}
            {/* <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
        View Source
      </a> */}
            <a href={link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-xl font-semibold text-blue-700 hover:underline">{title}</h2>
            </a>
            <p className="text-gray-500 text-sm mt-1 dark:text-gray-200">{formattedDate}</p>
            <div className="mt-3"><Markdown>{content}</Markdown></div>
            <div className="mt-2">
                {(summary && !open) && <button className="text-sm text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer mr-2" disabled={loading} onClick={() => setOpen(true)} >Open</button>}
                {summary && open ? (
                    //   <p className="text-sm mt-2 whitespace-pre-wrap text-black">{summary}</p>
                    <div className='mt-2 text-black dark:text-gray-100'>
                        {entities.length > 0 && (
                            <div className="mt-3 flex items-center gap-2.5">
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-200">Entities:</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {entities.map((entity, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                                        >
                                            {entity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Markdown>{summary}</Markdown>
                        <Button variant="ghost" className="text-sm cursor-pointer" onClick={() => setOpen(false)} >Close</Button>
                    </div>
                ) : (
                    <button
                        onClick={handleSummarize}
                        className="text-sm text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? 'Summarizing...' : 'Summarize'}
                    </button>
                )}
            </div>
        </div>
    );
}
