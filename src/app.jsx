import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Pages
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Blog from './components/pages/BloomieBlog/Blog.jsx';
import BlogList from './components/pages/BlogList/BlogList.jsx';
import BlogDetail from './components/pages/BlogDetails/BlogDetail';
import Contact from './components/pages/Contact/Contact.jsx';
import Features from './components/pages/Features/Features.jsx';
import SearchResults from './components/pages/BloomieBlog/SearchResult.jsx';

// Layout components
import Nav from './components/nav';
import Footer from './components/footer';
import ChatWidget from './components/chat_widget';
import ErrorBoundary from './components/error_boundary';

/**
 * ScrollToTop component ensures that the page scrolls to top on route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Navigation */}
      <Nav />

      {/* Main App Section */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/feature" element={<Features />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* ✅ CRITICAL: /blog/search MUST come BEFORE /blog/:slug */}
            <Route path="/blog/search" element={<SearchResults />} />
            <Route path="/blog/category/:category" element={<BlogList />} />
            
            {/* ✅ Dynamic route comes LAST */}
            <Route path="/blog/:slug" element={<BlogDetail />} />
            
            <Route path="/contact" element={<Contact />} />
            
            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <h1 className="text-center mt-20 text-2xl font-bold">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>

      {/* Footer and Chat Widget */}
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;