import { NavLink } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Desktop navigation styling
  const desktopNavLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-emerald-100 text-emerald-700 font-medium px-4 py-2 rounded-lg'
      : 'text-gray-600 hover:text-emerald-700 transition px-4 py-2 rounded-lg';

  // Mobile navigation styling (block display for list view)
  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? 'block bg-emerald-100 text-emerald-700 font-medium px-4 py-3 rounded-lg'
      : 'block text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition px-4 py-3 rounded-lg';

  return (
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
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <Leaf className="w-8 h-8 text-emerald-600 hidden" />
            </div>
            <span>Bloomie AI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" className={desktopNavLinkClass}>Home</NavLink>
            <NavLink to="/blog" className={desktopNavLinkClass}>Blog</NavLink>
            <NavLink to="/feature" className={desktopNavLinkClass}>Features</NavLink>
            <NavLink to="/about" className={desktopNavLinkClass}>About</NavLink>
            <NavLink to="/contact" className={desktopNavLinkClass}>Contact</NavLink>
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

        {/* Mobile Navigation - List View */}
        {menuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t">
            <NavLink 
              to="/" 
              className={mobileNavLinkClass} 
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/blog" 
              className={mobileNavLinkClass} 
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink 
              to="/feature" 
              className={mobileNavLinkClass} 
              onClick={() => setMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink 
              to="/about" 
              className={mobileNavLinkClass} 
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={mobileNavLinkClass} 
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
            <a 
              href="#" 
              className="block bg-emerald-600 text-white px-6 py-3 rounded-full text-center mt-4 hover:bg-emerald-700 transition"
            >
              Download App
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Nav;