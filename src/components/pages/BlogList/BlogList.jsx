import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import BlogListHeader from './BlogListHeader';
import BlogCard from './BlogCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import NoArticles from './NoArticles';

const API_BASE_URL = 'http://107.167.94.243:5000/api';
const ARTICLES_PER_PAGE = 6;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    pages.push(1);

    if (showEllipsisStart) {
      pages.push('...');
    } else {
      for (let i = 2; i < Math.min(4, totalPages); i++) {
        pages.push(i);
      }
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i) && i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (showEllipsisEnd) {
      if (!pages.includes('...')) pages.push('...');
    } else {
      for (let i = Math.max(totalPages - 2, 2); i < totalPages; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  console.log('Pagination render:', { currentPage, totalPages }); // Debug
  
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex gap-2">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === page
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function BlogList() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag'); // Get tag from query parameter
  const navigate = useNavigate();
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalBlogs: 0,
    currentPage: 1
  });

  // Reset to page 1 when category or tag changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
  }, [category, tag]);

  // Fetch blogs when category, tag, or page changes
  useEffect(() => {
    fetchBlogs();
  }, [category, tag, currentPage]);

  // Smooth scroll to top on page change
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Always use category API with pagination
      const url = `${API_BASE_URL}/blogs/category/${encodeURIComponent(category)}?page=${currentPage}&limit=${ARTICLES_PER_PAGE}`;
      
      console.log('Fetching:', url); // Debug log
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      
      const data = await res.json();
      console.log('API Response:', data); // Debug log
      
      // Extract data from API response
      if (data.success && data.data) {
        const blogs = Array.isArray(data.data) ? data.data : [];
        setArticles(blogs);
        
        // Calculate pagination if not provided by API
        const total = data.pagination?.total || blogs.length;
        const totalPages = data.pagination?.totalPages || Math.ceil(total / ARTICLES_PER_PAGE);
        
        setPagination({
          totalPages: totalPages,
          totalBlogs: total,
          currentPage: data.pagination?.currentPage || currentPage
        });
        
        console.log('Pagination set:', { totalPages, totalBlogs: total, currentPage }); // Debug
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onBack={() => navigate('/blog')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <BlogListHeader
        category={category}
        tag={tag}
        count={pagination.totalBlogs}
        onBack={() => navigate('/blog')}
      />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <NoArticles onBack={() => navigate('/blog')} />
          ) : (
            <>
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
              
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}