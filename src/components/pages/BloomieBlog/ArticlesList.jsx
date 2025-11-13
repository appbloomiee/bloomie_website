// ArticlesList.jsx
import { Search } from 'lucide-react';
import ArticleCard from './ArticleCard';

export default function ArticlesList({ articles, searchQuery, onClearSearch }) {
  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 
              `We couldn't find any articles matching "${searchQuery}". Try different keywords.` :
              "There are no published articles at the moment. Check back soon for new content!"
            }
          </p>
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <ArticleCard key={article._id || article.id} article={article} />
      ))}
    </div>
  );
}