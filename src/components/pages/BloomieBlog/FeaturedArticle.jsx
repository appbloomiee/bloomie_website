import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getImageUrl, formatDate, truncateText } from "./utils";

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularBlog();
  }, []);

  const fetchPopularBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/blogs/popular`);

      if (!res.ok) throw new Error("Failed to fetch popular blog");

      const data = await res.json();

      console.log("Popular Blog API:", data);

      if (data.success && Array.isArray(data.data)) {
        setArticle(data.data[0]);
      } else {
        throw new Error("Invalid blog response");
      }
    } catch (err) {
      console.error("Fetch Blog Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
          <div className="h-96 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
          <div className="text-center p-12 rounded-3xl bg-red-50 shadow-xl">
            <p className="text-red-600 mb-4">Failed to load featured article</p>
            <button
              onClick={fetchPopularBlog}
              className="bg-emerald-600 px-6 py-3 text-white rounded-full"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!article) return null;

  return (
    <section className="py-16 bg-white opacity-100 translate-y-0">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Article</h2>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">

            {/* Image like recent articles on mobile - taller on desktop */}
            <div className="relative w-full h-48 lg:h-80 overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(article.featuredImage || article.images?.[0])}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/800x600?text=No+Image')}
              />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm mb-4 w-fit">
                {article.category || "Featured"}
              </span>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h3>

              <p className="text-gray-600 mb-6 text-base lg:text-lg line-clamp-2">
                {article.excerpt || article.description}
              </p>

              <div className="flex items-center text-gray-500 text-sm mb-6">
                <span>By {article.author || "Bloomie Team"}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>

              <Link
                to={`/blog/${article.slug || article._id}`}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition w-fit group"
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