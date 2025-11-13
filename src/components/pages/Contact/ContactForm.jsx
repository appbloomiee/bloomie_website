import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactForm({ visible }) {
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
    <div
      id="form"
      data-fade
      className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {submitted && (
        <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-emerald-800 text-center animate-pulse">
          ✓ Thanks! Your message has been received (form simulated - no backend)
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          type="submit"
          disabled={!formData.name || !formData.email || !formData.message}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Send size={20} />
          Send Message
        </button>
      </form>

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
  );
}
