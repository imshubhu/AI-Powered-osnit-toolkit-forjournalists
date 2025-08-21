export default function Tabs({ tab, setTab }: { tab: string, setTab: (v: string) => void }) {
    return (
      <div className="flex justify-center gap-4 mb-4 mt-6">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${tab === 'news' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setTab('news')}
        >
          News
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${tab === 'reddit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setTab('reddit')}
        >
          Reddit
        </button>
      </div>
    );
  }
  