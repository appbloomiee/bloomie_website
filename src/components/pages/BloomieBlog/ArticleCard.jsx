// ArticleCard.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl, formatDate } from './utils';

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="grid md:grid-cols-3">
        <div className="relative h-64 md:h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={getImageUrl(article.featuredImage || (article.images && article.images[0]))}
            alt={article.title} 
            className="w-full h-full object-contain"
          /> 
        </div>

        <div className="md:col-span-2 p-6 flex flex-col justify-between min-h-[16rem]">
          <div>
            <div className="flex gap-2 mb-3">
              {article.category && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              )}
              {article.tags && article.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {article.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.excerpt || article.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center">
              <span>{article.author || 'Bloomie Team'}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              {article.likes > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>{article.likes} likes</span>
                </>
              )}
            </div>

            <Link 
              to={`/blog/${article.slug || article._id}`}
              className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 group"
            >
              Read More 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}