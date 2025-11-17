// src/components/BlogFilter.jsx
import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Tag, User } from 'lucide-react';

const BlogFilter = ({ onFilter, initialTags = [], initialAuthors = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'tag', 'author'

  // Handle filter application
  const applyFilters = () => {
    if (filterType === 'tag' && selectedTags.length > 0) {
      onFilter({ type: 'tag', value: selectedTags[0] });
    } else if (filterType === 'author' && selectedAuthor) {
      onFilter({ type: 'author', value: selectedAuthor });
    } else {
      onFilter({ type: 'all', value: null });
    }
    setIsOpen(false);
  };

  // Handle quick search (client-side filtering trigger)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onFilter({ type: 'search', value: searchQuery.trim() });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedAuthor('');
    setSearchQuery('');
    setFilterType('all');
    onFilter({ type: 'all', value: null });
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags([]);
      setFilterType('all');
    } else {
      setSelectedTags([tag]);
      setFilterType('tag');
    }
  };

  // Select author
  const selectAuthor = (author) => {
    if (selectedAuthor === author) {
      setSelectedAuthor('');
      setFilterType('all');
    } else {
      setSelectedAuthor(author);
      setFilterType('author');
    }
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedAuthor || searchQuery;

  return (
    <div className="w-full mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, content, or keywords..."
            className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-emerald-500 transition-all"
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-emerald-600 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              <Search className="w-3 h-3" />
              <span>{searchQuery}</span>
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
              <button onClick={() => toggleTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {selectedAuthor && (
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              <User className="w-3 h-3" />
              <span>{selectedAuthor}</span>
              <button onClick={() => selectAuthor(selectedAuthor)}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-6">
          {/* Tags Filter */}
          {initialTags.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                Filter by Tag
              </h3>
              <div className="flex flex-wrap gap-2">
                {initialTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authors Filter */}
          {initialAuthors.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Filter by Author
              </h3>
              <div className="flex flex-wrap gap-2">
                {initialAuthors.map((author) => (
                  <button
                    key={author}
                    onClick={() => selectAuthor(author)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedAuthor === author
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Apply Filters Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={applyFilters}
              className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-all"
            >
              Apply Filters
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogFilter;