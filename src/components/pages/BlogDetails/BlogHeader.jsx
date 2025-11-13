import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, Share2, Clock } from 'lucide-react';
import { useState } from 'react';

export default function BlogHeader({ article }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleShare = () => {
    if (navigator.share) navigator.share({ title: article.title, text: article.excerpt || '', url: window.location.href }).catch(console.log);
    else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const getImageUrl = (img) => img?.url || img || 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';

  return (
    <div className="relative">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="flex gap-2">
            <button onClick={handleLike} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {(article.likes || 0) + (liked ? 1 : 0)}
            </button>
            <button onClick={handleShare} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-[60vh] max-h-[600px] overflow-hidden">
        <img src={getImageUrl(article.featuredImage || article.image || (article.images && article.images[0]))} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 p-8 text-white">
          {article.category && <span className="bg-emerald-600 px-3 py-1 rounded-full">{article.category}</span>}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm mt-2">
            <div className="flex items-center gap-2"><User size={16} /> {article.author || 'Bloomie Team'}</div>
            <div className="flex items-center gap-2"><Calendar size={16} /> {formatDate(article.publishedAt || article.createdAt)}</div>
            {article.readTime && <div className="flex items-center gap-2"><Clock size={16} /> {article.readTime} min read</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
