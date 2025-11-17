// src/components/pages/BloomieBlog/Blog.jsx
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

  // Loading/Error screens
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero with integrated search bar */}
      <HeroSection visibleSections={visibleSections} />

      <FeaturedArticle article={featuredArticle} visibleSections={visibleSections} />

      <section
        id="articles"
        data-fade
        className={`py-16 transition-all duration-1000 ${
          visibleSections.has('articles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              <ArticlesList articles={articles} />
            </div>

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
      </section>

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