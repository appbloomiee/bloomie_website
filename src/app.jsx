import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Blog from './components/blog'
import Contact from './components/contact'
import Features from './components/feature'
import Nav from './components/nav'
import Footer from './components/footer'

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feature" element={<Features />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App