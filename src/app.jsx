import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Blog from './components/blog'
import BlogList from './components/blog_list'
import BlogDetail from './components/blog_detail'
import Contact from './components/contact'
import Features from './components/feature'
import Nav from './components/nav'
import Footer from './components/footer'
import ChatWidget from './components/chat_widget'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/category/:category" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feature" element={<Features />} />
      </Routes>
      <Footer/>
      <ChatWidget />
    </BrowserRouter>
  )
}

export default App