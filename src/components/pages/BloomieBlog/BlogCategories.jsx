// BlogCategories.jsx
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function BlogCategories({ categories, onCategoryClick }) {
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories && categories.length > 0) {
      calculateCategoryCounts();
    }
  }, [categories]);

  const calculateCategoryCounts = async () => {
    try {
      setLoading(true);
      
      // Fetch all blogs
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      
      const data = await response.json();
      const blogs = data?.data || data || [];
      
      console.log('Total blogs fetched:', blogs.length);
      console.log('Sample blog:', blogs[0]);
      
      // Count categories
      const categoryCountMap = {};
      
      blogs.forEach(blog => {
        // Try different possible category field names
        const categoryField = blog.category || blog.categories || blog.Category;
        
        if (!categoryField) return;
        
        // Handle different formats
        let blogCategories = [];
        
        if (Array.isArray(categoryField)) {
          blogCategories = categoryField;
        } else if (typeof categoryField === 'string') {
          blogCategories = [categoryField];
        } else if (typeof categoryField === 'object' && categoryField.name) {
          blogCategories = [categoryField.name];
        }
        
        // Count each category
        blogCategories.forEach(cat => {
          const categoryName = typeof cat === 'string' ? cat : cat?.name;
          if (categoryName) {
            const normalized = categoryName.trim();
            categoryCountMap[normalized] = (categoryCountMap[normalized] || 0) + 1;
          }
        });
      });
      
      console.log('Category count map:', categoryCountMap);
      
      // Merge with existing categories
      const categoriesWithCount = categories.map(category => {
        const categoryName = (category.name || category).trim();
        const count = categoryCountMap[categoryName] || 0;
        
        console.log(`Category: ${categoryName}, Count: ${count}`);
        
        return {
          name: categoryName,
          count: count
        };
      });
      
      setCategoriesWithCounts(categoriesWithCount);
    } catch (error) {
      console.error('Error calculating category counts:', error);
      // Fallback: show categories without counts
      setCategoriesWithCounts(
        categories.map(cat => ({
          name: cat.name || cat,
          count: 0
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <ul className="space-y-2">
          {categoriesWithCounts.map((category, idx) => (
            <li key={idx}>
              <a
                href={`/blog/category/${category.name}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(category.name);
                }}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                  {category.name}
                </span>
                <span className="bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
                  {category.count}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}