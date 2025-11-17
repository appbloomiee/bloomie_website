// src/components/pages/BloomieBlog/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import ArticlesList from './ArticlesList';
import { searchBlogs } from './api';
//import BlogFilter from '../../BlogFilter';

export default function SearchResults() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!location.state?.results && !!query);
  const [error, setError] = useState(null);

  // If no results in state, fetch them
  useEffect(() => {
    // Only fetch if we have a query and no results from navigation state
    if (!location.state?.results && query) {
      const fetchResults = async () => {
        try {
          setLoading(true);
          setError(null);
          console.log('Fetching search results for:', query); // Debug log
          const data = await searchBlogs(query);
          setResults(data?.data || data || []);
        } catch (err) {
          setError('Failed to fetch search results');
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query, location.state]);

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  // Show error if no query parameter
  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No search query provided</h2>
          <button
            onClick={handleBackToBlog}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleBackToBlog}
            className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {results.length > 0 ? (
          <ArticlesList articles={results} />
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search terms or browse our recent articles instead.
            </p>
            <button
              onClick={handleBackToBlog}
              className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse All Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}