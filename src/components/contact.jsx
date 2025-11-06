import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Menu, X, Send, Mail, User, MessageSquare } from 'lucide-react';

export default function BloomieContact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      {/* Contact Section */}
      <main className="flex-grow py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-emerald-600">Us</span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions or want to partner? Reach us.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-emerald-800 text-center animate-pulse">
                ✓ Thanks! Your message has been received (form simulated - no backend)
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <User size={20} className="text-emerald-600" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Mail size={20} className="text-emerald-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare size={20} className="text-emerald-600" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.message}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send size={20} />
                Send Message
              </button>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-100 text-center">
              <p className="text-gray-600 mb-2">Or email us directly at:</p>
              <a
                href="mailto:app.bloomiee@gmail.com"
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                app.bloomiee@gmail.com
              </a>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">Serving plant & pet lovers worldwide</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600 text-sm">We typically respond within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Available for users & partners</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 text-2xl font-bold mb-3 justify-center md:justify-start">
                <span className="text-3xl"><img src="/Asset/logo.svg" alt="" /></span>
                <span>Bloomie AI</span>
              </div>
              <p className="text-gray-400">Connecting People With Nature — One App for Plant & Pet Lovers</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                Email us: <a href="mailto:app.bloomiee@gmail.com" className="text-emerald-400 hover:text-emerald-300">app.bloomiee@gmail.com</a>
              </p>
              <p className="text-gray-500 text-sm">© 2025 Bloomie. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}