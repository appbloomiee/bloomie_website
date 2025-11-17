import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, Share2, Clock } from 'lucide-react';

export default function BlogHeader({ article, onLike, liking, hasLiked }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ 
        title: article.title, 
        text: article.excerpt || '', 
        url: window.location.href 
      }).catch(console.log);
    } else { 
      navigator.clipboard.writeText(window.location.href); 
      alert('Link copied!'); 
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const formatDateShort = (d) => new Date(d).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  
  const getImageUrl = (img) => img?.url || img || 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';

  return (
    <div className="relative">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={18} /> 
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={onLike}
              disabled={liking || hasLiked}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                hasLiked 
                  ? 'bg-red-100 text-red-600 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart size={16} fill={hasLiked ? 'currentColor' : 'none'} /> 
              {article.likes || 0}
            </button>
            <button 
              onClick={handleShare} 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition"
            >
              <Share2 size={16} /> 
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section - Responsive Heights */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <img 
          src={getImageUrl(article.featuredImage || article.image || (article.images && article.images[0]))} 
          alt={article.title} 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="max-w-5xl mx-auto">
            {/* Category Badge */}
            {article.category && (
              <span className="inline-block bg-emerald-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3">
                {article.category}
              </span>
            )}
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 line-clamp-2 sm:line-clamp-3">
              {article.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm">
              {/* Author */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <User size={14} className="sm:w-4 sm:h-4" /> 
                <span className="hidden sm:inline">{article.author || 'Bloomie Team'}</span>
                <span className="sm:hidden">
                  {(article.author || 'Bloomie Team').split(' ')[0]}
                </span>
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar size={14} className="sm:w-4 sm:h-4" /> 
                <span className="hidden sm:inline">
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
                <span className="sm:hidden">
                  {formatDateShort(article.publishedAt || article.createdAt)}
                </span>
              </div>
              
              {/* Read Time */}
              {article.readTime && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock size={14} className="sm:w-4 sm:h-4" /> 
                  {article.readTime} min
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}