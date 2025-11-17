// HeroSection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchBlogs } from './api';

export default function HeroSection({ visibleSections }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      return;
    }

    try {
      setLoading(true);
      const data = await searchBlogs(trimmedQuery);
      const results = data?.data || data || [];
      
      navigate(`/blog/search?q=${encodeURIComponent(trimmedQuery)}`, { 
        state: { results } 
      });
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="hero"
      data-fade
      className={`bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 transition-all duration-1000 ${
        visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bloomie Blog</h1>
        <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
          Discover expert insights, community stories, and the latest tips for caring for your plants and pets.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-14 pr-32 py-4 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
            />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-emerald-600 px-6 py-2.5 rounded-full font-medium hover:bg-emerald-50 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}