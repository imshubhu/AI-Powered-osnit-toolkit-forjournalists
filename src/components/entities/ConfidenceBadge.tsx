export default function ConfidenceBadge({ score }: { score: number }) {
    const getStyle = () => {
      if (score > 0.8) return 'bg-green-100 text-green-800 border-green-300';
      if (score > 0.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      return 'bg-red-100 text-red-800 border-red-300';
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle()}`}>
        {score > 0.8 ? '✅ Strong match' : 
         score > 0.5 ? '⚠️ Possible match' : '❌ Weak match'}
        <span className="ml-1 font-bold">({(score * 100).toFixed(0)}%)</span>
      </span>
    );
  }