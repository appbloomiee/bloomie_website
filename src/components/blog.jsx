import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight, Mail, Loader2 } from 'lucide-react';
import ErrorBoundary from './error_boundary';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

function BloomeBlog() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // State for API data
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribeStatus, setSubscribeStatus] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    fetchBlogData();
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-fade]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [articles, featuredArticle]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting to fetch blog data...');

      // Fetch all published blogs
      console.log('Fetching published blogs...');
      const recentResponse = await fetch(`${API_BASE_URL}/blogs/published`);
      console.log('Published blogs response status:', recentResponse.status);
      
      if (!recentResponse.ok) {
        throw new Error(`Failed to fetch published blogs: ${recentResponse.status}`);
      }
      const recentData = await recentResponse.json();

      console.log('Recent data:', recentData);
      
      // Fetch popular blogs for featured
      console.log('Fetching popular blogs...');
      const popularResponse = await fetch(`${API_BASE_URL}/blogs/popular`);
      console.log('Popular blogs response status:', popularResponse.status);
      
      if (!popularResponse.ok) {
        console.warn('Failed to fetch popular blogs, continuing without featured article');
      }
      const popularData = popularResponse.ok ? await popularResponse.json() : { data: [] };
      console.log('Popular data:', popularData);
      
      // Fetch categories
      console.log('Fetching categories...');
      const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
      console.log('Categories response status:', categoriesResponse.status);
      
      if (!categoriesResponse.ok) {
        console.warn('Failed to fetch categories, continuing without categories');
      }
      const categoriesData = categoriesResponse.ok ? await categoriesResponse.json() : { data: [] };
      console.log('Categories data:', categoriesData);

      // Safely extract arrays from API responses
      const recentBlogs = recentData?.data || recentData || [];
      const popularBlogs = popularData?.data || popularData || [];
      const categoriesList = categoriesData?.data || categoriesData || [];

      console.log('Extracted blogs count:', recentBlogs.length);
      if (recentBlogs.length > 0 && recentBlogs[0].images?.[0]?.url) {
        console.log("first image", recentBlogs[0].images[0].url);
      }
      console.log('Extracted popular count:', popularBlogs.length);
      console.log('Extracted categories count:', categoriesList.length);

      // Set the data
      setArticles(recentBlogs);
      setFeaturedArticle(popularBlogs[0] || null);
      
      // Calculate category counts from blogs (use only recentBlogs to avoid duplicates)
      const categoryCountMap = {};
      
      recentBlogs.forEach(blog => {
        if (blog.category) {
          categoryCountMap[blog.category] = (categoryCountMap[blog.category] || 0) + 1;
        } else if (blog.categories && Array.isArray(blog.categories)) {
          blog.categories.forEach(cat => {
            categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
          });
        }
      });
      
      // Add counts to categories
      const categoriesWithCounts = categoriesList.map(cat => {
        const catName = cat.name || cat;
        return {
          name: catName,
          count: categoryCountMap[catName] || 0
        };
      });
      
      setCategories(categoriesWithCounts);
      
      // Extract unique tags from articles (use only recentBlogs to avoid duplicates)
      const allTags = recentBlogs
        .filter(blog => blog && blog.tags && Array.isArray(blog.tags))
        .flatMap(blog => blog.tags)
        .filter((tag, index, self) => self.indexOf(tag) === index)
        .slice(0, 6);
      setPopularTags(allTags);

      console.log('Blog data fetch completed successfully');

    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch(`${API_BASE_URL}/blogs/search?q=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (!response.ok) throw new Error('Search failed');
        return response.json();
      })
      .then(data => {
        const searchResults = data?.data || data || [];
        setArticles(searchResults);
      })
      .catch(err => {
        console.error('Search error:', err);
        setError('Search failed. Please try again.');
      });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log('Subscribing:', email);
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  const handleCategoryClick = (categoryName) => {
    console.log('Category clicked:', categoryName);
    navigate(`/blog/category/${categoryName}`);
  };

  const handleTagClick = (tag) => {
    fetch(`${API_BASE_URL}/blogs/tag/${encodeURIComponent(tag)}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch tag blogs');
        return response.json();
      })
      .then(data => {
        const tagResults = data?.data || data || [];
        setArticles(tagResults);
      })
      .catch(err => {
        console.error('Tag filter error:', err);
      });
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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog posts...</p>
          <p className="text-gray-400 text-sm mt-2">Stories and insights to help every life thrive.</p>
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
            onClick={fetchBlogData}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section 
        id="hero"
        data-fade
        className={`bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bloomie Blog</h1>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Discover expert insights, community stories, and the latest tips for caring for your plants and pets.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>
              <button 
                type="submit"
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section 
          id="featured"
          data-fade
          className={`py-16 bg-white transition-all duration-1000 ${visibleSections.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative h-80 lg:h-96 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={getImageUrl(featuredArticle.featuredImage || (featuredArticle.images && featuredArticle.images[0]))}
                    alt={featuredArticle.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    {featuredArticle.category || 'Featured'}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {truncateText(featuredArticle.excerpt || featuredArticle.description, 200)}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <span>By {featuredArticle.author || 'Bloomie Team'}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(featuredArticle.publishedAt || featuredArticle.createdAt)}</span>
                  </div>
                  <Link 
                    to={`/blog/${featuredArticle.slug || featuredArticle._id}`}
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
      )}

      {/* Recent Articles with Sidebar */}
      <section 
        id="articles"
        data-fade
        className={`py-16 transition-all duration-1000 ${visibleSections.has('articles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles List */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              {articles.length === 0 ? (
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
                        onClick={() => {
                          setSearchQuery('');
                          fetchBlogData();
                        }}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {articles.map((article) => (
                    <div 
                      key={article._id || article.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                    >
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
                  ))}
                </div>
              )}
            </div>
           
            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, idx) => {
                      const categoryName = category.name || category;
                      return (
                        <li key={idx}>
                          <a
                            href={`/blog/category/${categoryName}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick(categoryName);
                            }}
                            className="flex justify-between items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                          >
                            <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                              {categoryName}
                            </span>
                            {category.count !== undefined && category.count > 0 && (
                              <span className="bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
                                {category.count}
                              </span>
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              
              {/* Subscribe Box */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-emerald-50 mb-4 text-sm">
                  Get the latest plant and pet care tips delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-white text-emerald-600 py-2 rounded-full font-medium hover:bg-emerald-50 transition"
                  >
                    Subscribe
                  </button>
                  {subscribeStatus === 'success' && (
                    <p className="text-emerald-50 text-sm text-center">Thanks for subscribing!</p>
                  )}
                </form>
              </div>

              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleTagClick(tag)}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        data-fade
        className={`bg-gradient-to-r from-emerald-600 to-teal-600 py-16 transition-all duration-1000 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-emerald-50 mb-8">
            Get personalized care advice, connect with fellow enthusiasts, and access exclusive content in the Bloomie app.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition transform hover:scale-105 shadow-lg">
              Download Bloomie
            </a>
            <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition">
              Join Newsletter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Export wrapped with ErrorBoundary
export default function BlogWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <BloomeBlog />
    </ErrorBoundary>
  );
}