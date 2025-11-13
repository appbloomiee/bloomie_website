import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl, formatDate, truncateText } from "./utils";


export default function FeaturedArticle({ article, visibleSections }) {
  if (!article) return null;

  return (
    <section 
      id="featured"
      data-fade
      className={`py-16 bg-white transition-all duration-1000 ${
        visibleSections.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative h-80 lg:h-96 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img 
                src={getImageUrl(article.featuredImage || (article.images && article.images[0]))}
                alt={article.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                {article.category || 'Featured'}
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {truncateText(article.excerpt || article.description, 200)}
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <span>By {article.author || 'Bloomie Team'}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <Link 
                to={`/blog/${article.slug || article._id}`}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition w-fit group"
              >
                Read Article 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
