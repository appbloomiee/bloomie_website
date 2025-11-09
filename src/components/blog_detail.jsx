import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Heart, Share2, Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      let articleData = null;

      // Try Method 1: Fetch specific blog by slug/id
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            if (data.blog) articleData = data.blog;
            else if (data.data) articleData = data.data;
            else if (data._id || data.id) articleData = data;
          }
        }
      } catch (err) {
        console.log('Direct fetch failed, trying fallback method...');
      }

      // Try Method 2: Fetch all recent blogs and find the matching one
      if (!articleData) {
        try {
          const response = await fetch(`${API_BASE_URL}/blogs/recent`);
          if (response.ok) {
            const data = await response.json();
            let allBlogs = [];
            
            if (Array.isArray(data)) allBlogs = data;
            else if (data.blogs && Array.isArray(data.blogs)) allBlogs = data.blogs;
            else if (data.data && Array.isArray(data.data)) allBlogs = data.data;

            // Find the blog that matches the slug or _id
            articleData = allBlogs.find(blog => 
              blog.slug === slug || 
              blog._id === slug || 
              blog.id === slug ||
              (blog.slug && blog.slug.toString() === slug) ||
              (blog._id && blog._id.toString() === slug)
            );
          }
        } catch (err) {
          console.log('Fallback fetch also failed');
        }
      }

      // Try Method 3: Fetch from popular blogs
      if (!articleData) {
        try {
          const response = await fetch(`${API_BASE_URL}/blogs/popular`);
          if (response.ok) {
            const data = await response.json();
            let allBlogs = [];
            
            if (Array.isArray(data)) allBlogs = data;
            else if (data.blogs && Array.isArray(data.blogs)) allBlogs = data.blogs;
            else if (data.data && Array.isArray(data.data)) allBlogs = data.data;

            articleData = allBlogs.find(blog => 
              blog.slug === slug || 
              blog._id === slug || 
              blog.id === slug ||
              (blog.slug && blog.slug.toString() === slug) ||
              (blog._id && blog._id.toString() === slug)
            );
          }
        } catch (err) {
          console.log('Popular blogs fetch failed');
        }
      }

      if (!articleData) {
        throw new Error('Article not found');
      }

      setArticle(articleData);

      // Fetch related articles based on category
      if (articleData.category) {
        try {
          const relatedResponse = await fetch(
            `${API_BASE_URL}/blogs/category/${encodeURIComponent(articleData.category)}`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            let relatedList = [];
            if (Array.isArray(relatedData)) {
              relatedList = relatedData;
            } else if (relatedData.blogs && Array.isArray(relatedData.blogs)) {
              relatedList = relatedData.blogs;
            } else if (relatedData.data && Array.isArray(relatedData.data)) {
              relatedList = relatedData.data;
            }
            // Filter out current article and limit to 3
            setRelatedArticles(
              relatedList
                .filter(a => {
                  const aId = a.slug || a._id || a.id;
                  return aId !== slug && aId !== articleData._id && aId !== articleData.id;
                })
                .slice(0, 3)
            );
          }
        } catch (err) {
          console.log('Related articles fetch failed, continuing without them');
        }
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return '';
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://107.167.94.243:5000${imagePath}`;
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || article.description,
        url: window.location.href,
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || 'Sorry, we couldn\'t find the article you\'re looking for.'}
            </p>
            <button 
              onClick={() => navigate('/blog')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition transform hover:scale-105"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.category && (
              <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            )}
            {article.tags && Array.isArray(article.tags) && article.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{article.author || 'Bloomie Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2">
                <span>{article.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                liked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } shadow-sm`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{(article.likes || 0) + (liked ? 1 : 0)}</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition shadow-sm"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>

          {/* Featured Image */}
          {(article.featuredImage || article.image) && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={getImageUrl(article.featuredImage || article.image)}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
            {article.content ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-strong:text-gray-900 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {article.description || article.excerpt || 'No content available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id || related.id}
                  to={`/blog/${related.slug || related._id || related.id}`}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img 
                      src={getImageUrl(related.featuredImage || related.image)}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    {related.category && (
                      <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                        {related.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {related.excerpt || related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Enjoyed this article?</h2>
          <p className="text-xl text-emerald-50 mb-8">
            Download Bloomie to get personalized care tips and connect with our community.
          </p>
          <a 
            href="#" 
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition transform hover:scale-105 shadow-lg"
          >
            Download Bloomie
          </a>
        </div>
      </section>
    </div>
  );
}