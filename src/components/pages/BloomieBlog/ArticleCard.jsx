import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl, formatDate } from './utils';

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Responsive Grid: 1 column on mobile, 3 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        
        {/* Image Section - Full width on mobile, 1 column on desktop */}
        <div className="relative h-56 sm:h-64 md:h-full md:min-h-[280px] overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={getImageUrl(article.featuredImage || (article.images && article.images[0]))}
            alt={article.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          /> 
          {article.featured && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-emerald-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content Section - 2 columns on desktop */}
        <div className="md:col-span-2 p-5 sm:p-6 md:p-8 flex flex-col">
          
          {/* Tags/Category Section */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {article.category && (
              <span className="bg-emerald-100 text-emerald-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                {article.category}
              </span>
            )}
            {article.tags && article.tags.slice(0, 2).map((tag, idx) => (
              <span 
                key={idx}
                className="bg-gray-100 text-gray-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title - Responsive font size */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
            {article.title}
          </h3>

          {/* Excerpt - Fixed to 2 lines with ellipsis */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 overflow-hidden flex-grow" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.5em',
            maxHeight: '3em'
          }}>
            {article.excerpt || article.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <span className="font-medium">{article.author || 'Bloomie Team'}</span>
            <span className="hidden xs:inline">•</span>
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            {article.likes > 0 && (
              <>
                <span className="hidden xs:inline">•</span>
                <span>{article.likes} likes</span>
              </>
            )}
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <Link 
              to={`/blog/${article.slug || article._id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-full font-semibold text-sm sm:text-base transition-all duration-200 group shadow-md hover:shadow-lg"
            >
              Read More 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}