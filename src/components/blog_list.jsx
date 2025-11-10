import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function BlogList() {
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on component mount and when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    fetchCategoryBlogs();
  }, [category]);

  // Add CSS for fade-in animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fade-in 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fetchCategoryBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/blogs/category/${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      
      const data = await response.json();
      const blogsList = data?.data || data || [];
      setArticles(blogsList);
    } catch (err) {
      console.error('Error fetching category blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
    if (typeof imagePath === 'string') return imagePath;
    if (imagePath.url) return imagePath.url;
    return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
  };

  const navigateToDetail = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const navigateToHome = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={navigateToHome}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={navigateToHome}
            className="inline-flex items-center gap-2 text-emerald-50 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 capitalize">{category}</h1>
          <p className="text-xl text-emerald-50">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-6">No articles found in this category.</p>
              <button 
                onClick={navigateToHome}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition"
              >
                <ArrowLeft size={20} />
                Browse All Articles
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div 
                  key={article._id || article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
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
                      {article.tags && article.tags.slice(0, 2).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt || article.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <span>{article.author || 'Bloomie Team'}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                    <button 
                      onClick={() => navigateToDetail(article.slug || article._id)}
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition w-full justify-center group"
                    >
                      Read More 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}