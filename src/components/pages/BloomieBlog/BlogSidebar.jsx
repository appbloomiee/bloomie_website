// BlogSidebar.jsx
import { Mail } from 'lucide-react';

export default function BlogSidebar({ 
  categories, 
  onCategoryClick, 
  email, 
  setEmail, 
  handleSubscribe, 
  subscribeStatus,
  popularTags,
  onTagClick 
}) {
  return (
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
                      onCategoryClick(categoryName);
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
                onClick={() => onTagClick(tag)}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}