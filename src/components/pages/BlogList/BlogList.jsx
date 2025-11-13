import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import BlogListHeader from './BlogListHeader';
import BlogCard from './BlogCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import NoArticles from './NoArticles';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function BlogList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    fetchCategoryBlogs();
  }, [category]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in { animation: fade-in 0.6s ease-out; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fetchCategoryBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/blogs/category/${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setArticles(data?.data || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onBack={() => navigate('/blog')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <BlogListHeader
        category={category}
        count={articles.length}
        onBack={() => navigate('/blog')}
      />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <NoArticles onBack={() => navigate('/blog')} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <BlogCard
                  key={article._id || article.id}
                  article={article}
                  delay={i * 100}
                  onClick={() => navigate(`/blog/${article.slug || article._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
