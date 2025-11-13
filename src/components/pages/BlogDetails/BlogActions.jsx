import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';

export default function BlogActions({ article, liked, setLiked, navigate }) {
  const handleLike = () => setLiked(!liked);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600">
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="flex gap-2">
          <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {(article.likes || 0) + (liked ? 1 : 0)}
          </button>
          <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
