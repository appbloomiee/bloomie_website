import { Search } from 'lucide-react';
import ArticleCard from './ArticleCard';

export default function ArticlesList({ articles, searchQuery, onClearSearch }) {
  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 sm:w-10 h-8 sm:h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            {searchQuery ? 
              `We couldn't find any articles matching "${searchQuery}". Try different keywords.` :
              "There are no published articles at the moment. Check back soon for new content!"
            }
          </p>
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="bg-emerald-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-emerald-700 transition text-sm sm:text-base font-medium"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    // ✅ Responsive spacing between cards
    <div className="space-y-6 sm:space-y-8">
      {articles.map((article) => (
        <ArticleCard key={article._id || article.id} article={article} />
      ))}
    </div>
  );
}