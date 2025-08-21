"use client"
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import { searchNews, searchReddit } from '../lib/api';
import Tabs from '@/components/Tabs';
import RedditCard from '@/components/RedditCard';

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [reddit, setReddit] = useState<any[]>([]);
  const [tab, setTab] = useState('news');
  const [loading, setLoading] = useState(false);
  const handleSearch = async (query: string) => {
    setLoading(true)
    try {
      const data = await searchNews(query);
      setNews(data);
      const reddit_data = await searchReddit(query);
      setReddit(reddit_data);
    } catch (error: any) {
      console.error('handleSearch', error)
    } finally {
      setLoading(false)
    }
  };

  const results = tab === 'news' ? news : reddit;

  return (
    <div className='max-w-4xl mx-auto mt-12'>
      <header className="flex items-center justify-around">
        <h1 className="text-2xl md:text-3xl font-semibold">Search News</h1>
      </header>
      <SearchBar onSearch={handleSearch} loading={loading} />
      <Tabs tab={tab} setTab={setTab} />
      <div className="space-y-4 mt-6">
        {loading ? 'Loading...' : results.length === 0 ? `No result found for ${tab}` : ''}
        {!loading && results.map((item: any, index: number) => (
          tab === 'news' ? <NewsCard key={index} title={item.title} link={item.link} content={item.content} isoDate={item.isoDate} /> :
            <RedditCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
