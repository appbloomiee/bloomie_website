import { ArrowRight } from 'lucide-react';

export default function BlogCard({ article, delay, onClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
    if (typeof imagePath === 'string') return imagePath;
    if (imagePath.url) return imagePath.url;
    return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(article.featuredImage || (article.images && article.images[0]))}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {article.category && (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
              {article.category}
            </span>
          )}
          {article.tags &&
            article.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt || article.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span>{article.author || 'Bloomie Team'}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
        </div>
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition w-full justify-center group"
        >
          Read More
          <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
}
