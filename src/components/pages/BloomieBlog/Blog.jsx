import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hooks
import { useBlogData } from './BlogData';
import { useFadeAnimation } from './FadeAnimation';

// Components
import HeroSection from './HeroSection';
import FeaturedArticle from './FeaturedArticle';
import ArticlesList from './ArticlesList';
import BlogSidebar from './BlogSidebar';
import CTASection from './CTASection';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

// API functions
import { fetchBlogsByTag } from './api';

// Error boundary
import ErrorBoundary from '../../error_boundary';

function Blog() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    articles,
    setArticles,
    featuredArticle,
    categories,
    popularTags,
    loading,
    error,
    refetch,
  } = useBlogData();

  const visibleSections = useFadeAnimation([articles, featuredArticle]);

  // Handlers
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/blog/category/${categoryName}`);
  };

  const handleTagClick = async (tag) => {
    try {
      const data = await fetchBlogsByTag(tag);
      const tagResults = data?.data || data || [];
      setArticles(tagResults);
    } catch (err) {
      console.error('Tag filter error:', err);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    refetch(); // Reload original articles
  };

  // Loading/Error screens
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section - Fully responsive */}
      <HeroSection visibleSections={visibleSections} />

      {/* Featured Article - Responsive layout */}
      <FeaturedArticle article={featuredArticle} visibleSections={visibleSections} />

      {/* Articles Section - Responsive grid */}
      <section
        id="articles"
        data-fade
        className={`py-8 sm:py-12 md:py-16 lg:py-20 transition-all duration-1000 ${
          visibleSections.has('articles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive grid: stacked on mobile, sidebar on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Main content area - Order 2 on mobile, 1 on desktop */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Recent Articles
                </h2>
                <span className="text-sm sm:text-base text-gray-500 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
                  {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>
              
              <ArticlesList 
                articles={articles} 
                searchQuery={searchQuery}
                onClearSearch={handleClearSearch}
              />
            </div>

            {/* Sidebar - Order 1 on mobile (shows first), 2 on desktop */}
            <div className="order-1 lg:order-2">
              <BlogSidebar
                categories={categories}
                onCategoryClick={handleCategoryClick}
                email={email}
                setEmail={setEmail}
                handleSubscribe={handleSubscribe}
                subscribeStatus={subscribeStatus}
                popularTags={popularTags}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <CTASection visibleSections={visibleSections} />
    </div>
  );
}

// ✅ Wrap Blog with ErrorBoundary and export as default
export default function BlogWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Blog />
    </ErrorBoundary>
  );
}