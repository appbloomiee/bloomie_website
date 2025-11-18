import { Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12" itemScope itemType="https://schema.org/WPFooter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div itemScope itemType="https://schema.org/Organization">
            <div className="flex items-center space-x-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img 
                  src="/Asset/logo.svg" 
                  alt="Bloomie AI Logo - Plant and Pet Care App" 
                  itemProp="logo"
                  width="32"
                  height="32"
                />
              </div>
              <span itemProp="name">Bloomie AI</span>
            </div>
            <p className="text-gray-400 mb-4" itemProp="description">
              Connecting People With Nature — One App for Plant & Pet Lovers. Your all-in-one solution for plant care, pet care, and connecting with nature enthusiasts.
            </p>
            <meta itemProp="url" content="https://yourwebsite.com" />
          </div>

          {/* Quick Links */}
          <nav className="sm:pl-0 lg:pl-8" aria-label="Footer Navigation">
            <h3 className="font-semibold text-lg mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/feature" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-400">Connect With Us</h3>
            
            {/* Email */}
            <div className="mb-4">
              <a 
                href="mailto:app.bloomiee@gmail.com" 
                className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
                aria-label="Email Bloomie AI"
              >
                <Mail className="w-5 h-5" />
                <span>app.bloomiee@gmail.com</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3 text-gray-300">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61583344367189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-emerald-600 p-3 rounded-full transition-colors inline-flex items-center justify-center"
                  aria-label="Visit Bloomie AI on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Keywords for SEO - Hidden on mobile */}
            <div className="text-xs text-gray-600 mt-4 hidden sm:block">
              <p className="mb-1">Plant care app | Pet care guide | Nature community | Plant identification | Pet health tracker</p>
              <p className="mb-1">Indoor plant care | Outdoor gardening tips | Plant watering schedule | Pet wellness app</p>
              <p>Dog care | Cat care | House plants | Garden planning | Plant disease identifier | Pet vaccine tracker</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row md:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-sm">
              © 2025 Bloomie AI. All rights reserved.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm" aria-label="Legal Links">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <a href="/sitemap.xml" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Sitemap
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;