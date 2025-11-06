import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import {useState} from 'react';
const Nav = () =>{
      const [menuOpen, setMenuOpen] = useState(false);
    
    return(
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 font-bold text-xl text-emerald-700">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/Asset/logo.svg" 
                  alt="Bloomie Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to Leaf icon if logo fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <Leaf className="w-8 h-8 text-emerald-600 hidden" />
              </div>
              <span>Bloomie AI</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-emerald-700 font-medium hover:text-emerald-900 transition">Home</Link>
              <Link to="/blog" className="text-gray-600 hover:text-emerald-700 transition">Blog</Link>
              <Link to="/feature" className="text-gray-600 hover:text-emerald-700 transition">Features</Link>
              <Link to="/about" className="text-gray-600 hover:text-emerald-700 transition">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-700 transition">Contact</Link>
            </nav>

            {/* Desktop CTA */}
            <a href="#" className="hidden md:block bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition transform hover:scale-105">
              Download App
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="md:hidden py-4 space-y-3 border-t">
              <Link to="/" className="block text-emerald-700 font-medium">Home</Link>
              <Link to="/blog" className="block text-gray-600 hover:text-emerald-700">Blog</Link>
              <Link to="/feature" className="block text-gray-600 hover:text-emerald-700">Features</Link>
              <Link to="/about" className="block text-gray-600 hover:text-emerald-700">About</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-emerald-700">Contact</Link>
              <a href="#" className="block bg-emerald-600 text-white px-6 py-2 rounded-full text-center mt-4">
                Download App
              </a>
            </nav>
          )}
        </div>
      </header>
    );
}

export default Nav;