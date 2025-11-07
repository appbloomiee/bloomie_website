import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, ArrowRight, Mail } from 'lucide-react';

export default function BloomeBlog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const articles = [
    {
      id: 1,
      image: 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png',
      tags: ['Pet Health', 'Care'],
      title: "Understanding Your Pet's Body Language",
      excerpt: "Recognize subtle signs your pets use to communicate and strengthen your bond with them.",
      author: "Bloomie Team",
      date: "Oct 15, 2025"
    },
    {
      id: 2,
      image: 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png',
      tags: ['Plant Care', 'Tips'],
      title: "Choosing the Perfect Indoor Plant",
      excerpt: "Explore easy-care plants ideal for beginners and how to help them flourish indoors.",
      author: "Bloomie Team",
      date: "Oct 10, 2025"
    }
  ];

  const categories = [
    { name: 'Plant Care', count: 12 },
    { name: 'Pet Health', count: 8 },
    { name: 'Community Stories', count: 15 },
    { name: 'Expert Tips', count: 6 },
    { name: 'App Updates', count: 4 }
  ];

  const popularTags = [
    'Plant Care', 'Pet Health', 'Indoor Plants', 
    'Dog Training', 'Gardening', 'Pet Nutrition'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://static.wixstatic.com/media/a89370_b73d34ef941f449cbe3b7e2be2a9f4f3~mv2.png"
                  alt="Featured Article"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                  Plant Care
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  10 Ways to Revive a Dying Houseplant
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Learn simple but effective methods to bring your beloved plant back to life and keep it thriving for years to come.
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <span>By Bloomie Team</span>
                  <span className="mx-2">•</span>
                  <span>Oct 20, 2025</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition w-fit group">
                  Read Article 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles with Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles List */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              <div className="space-y-8">
                {articles.map((article) => (
                  <div 
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <div className="grid md:grid-cols-3">
                      <div className="relative h-64 md:h-auto">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex gap-2 mb-3">
                          {article.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>{article.author}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                          </div>
                          <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 group">
                            Read More 
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, idx) => (
                    <li key={idx}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between text-gray-600 hover:text-emerald-600 transition group"
                      >
                        <span className="group-hover:translate-x-1 transition">{category.name}</span>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                          {category.count}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

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
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <a 
                      key={idx}
                      href="#"
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
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