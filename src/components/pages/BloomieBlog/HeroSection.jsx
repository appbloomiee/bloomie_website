// HeroSection.jsx
import { Search } from 'lucide-react';

export default function HeroSection({ searchQuery, setSearchQuery, handleSearch, visibleSections }) {
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
  );
}