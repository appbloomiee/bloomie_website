import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Heart, Share2, Loader2, Clock, Tag } from 'lucide-react';

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
    if (typeof imagePath === 'string') return imagePath;
    if (imagePath.url) return imagePath.url;
    return 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || 'Sorry, we couldn\'t find the article you\'re looking for.'}
            </p>
            <button 
              onClick={() => navigate('/blog')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition transform hover:scale-105 font-medium"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      {/* Compact Header Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
              <span className="font-medium text-sm">Back</span>
            </Link>
            
            <div className="flex gap-2">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  liked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                <span>{(article.likes || 0) + (liked ? 1 : 0)}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm font-medium"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative">
        {(article.featuredImage || article.image || (article.images && article.images[0])) && (
          <div className="relative h-[60vh] max-h-[600px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
            <img 
              src={getImageUrl(article.featuredImage || article.image || (article.images && article.images[0]))}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
              <div className="max-w-5xl mx-auto">
                {/* Category Badge */}
                {article.category && (
                  <div className="mb-4">
                    <span className="inline-block bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                      {article.category}
                    </span>
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {article.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <User size={16} />
                    <span className="font-medium">{article.author || 'Bloomie Team'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Calendar size={16} />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  {article.readTime && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Clock size={16} />
                      <span>{article.readTime} min read</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Image Fallback */}
        {!(article.featuredImage || article.image || (article.images && article.images[0])) && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-8">
            <div className="max-w-5xl mx-auto">
              {article.category && (
                <span className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  {article.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author || 'Bloomie Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tags */}
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 border border-gray-100">
            {article.content ? (
              <div 
                className="prose prose-lg max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-li:text-gray-700
                  prose-img:rounded-2xl prose-img:shadow-md
                  prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
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
        <section className="py-16 bg-gradient-to-b from-transparent to-emerald-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id || related.id}
                  to={`/blog/${related.slug || related._id || related.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(related.featuredImage || related.image || (related.images && related.images[0]))}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {related.category && (
                      <span className="absolute top-3 left-3 bg-white text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        {related.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Love What You're Reading?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Get personalized care tips and join our thriving plant community with Bloomie.
          </p>
          <a 
            href="#" 
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition transform hover:scale-105 shadow-xl"
          >
            Download Bloomie Now
          </a>
        </div>
      </section>
    </div>
  );
}