import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function BloomieFeatures() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-fade]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const coreFeatures = [
    {
      img: "https://static.wixstatic.com/media/a89370_360cfbd049fd4b37b55c810263c6c03f~mv2.png",
      title: "Smart Search & Discovery",
      desc: "Instantly identify plants and pets with AI and explore personalized recommendations.",
      points: ["AI-powered identification", "Breed recognition", "Voice search", "Smart filtering"]
    },
    {
      img: "https://static.wixstatic.com/media/a89370_d4c8ba46e923401abe4e4f0287ec6c47~mv2.png",
      title: "Comprehensive Care Guides",
      desc: "Tailored care tips, reminders, and schedules for your unique plant or pet.",
      points: ["Personalized schedules", "Water & feeding reminders", "Seasonal tips", "Expert advice"]
    },
    {
      img: "https://static.wixstatic.com/media/a89370_d626948393fe480a9d93bc2711b65f61~mv2.png",
      title: "Vibrant Community Feed",
      desc: "Connect with other plant and pet lovers to share insights, photos, and inspiration.",
      points: ["Photo sharing", "Q&A with experts", "Local meetups", "Community events"]
    }
  ];

  const additionalFeatures = [
    { icon: "📷", title: "Plant & Pet ID", desc: "Scan any plant or pet for instant AI-based identification." },
    { icon: "🩺", title: "Health Diagnosis", desc: "Detect issues early with our smart diagnostic tool." },
    { icon: "🔔", title: "Smart Reminders", desc: "Get notifications for watering, feeding, and vet visits." },
    { icon: "💬", title: "Expert Chat", desc: "Chat directly with certified experts for personalized advice." },
    { icon: "⭐", title: "Progress Tracking", desc: "Monitor growth and milestones with beautiful analytics." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          data-fade
          className={`py-20 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Bloomie's <span className="text-emerald-600">Smart Features</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              From AI-powered plant identification to community-driven learning — Bloomie makes caring for your plants and pets effortless and fun.
            </p>
            <img
              src="https://static.wixstatic.com/media/a89370_c20797d9916c422091929f949084e8eb~mv2.png"
              alt="Bloomie app showcase"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Core Features */}
        <section
          id="core"
          data-fade
          className={`py-20 bg-white transition-all duration-1000 ${visibleSections.has('core') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Core Features</h2>
              <p className="text-xl text-gray-600">Everything you need to keep your plants and pets healthy and thriving.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {coreFeatures.map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover rounded-xl mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <span className="text-emerald-600">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section
          id="additional"
          data-fade
          className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${visibleSections.has('additional') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">More to Explore</h2>
              <p className="text-xl text-gray-600">Enhance your experience with these extra smart features designed just for you.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {additionalFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          data-fade
          className={`py-20 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-1000 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience Bloomie?</h2>
            <p className="text-xl text-emerald-50 mb-10">Join thousands of nature lovers using Bloomie to care for their plants and pets every day.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-colors text-lg shadow-lg">
                Download for iOS
              </a>
              <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-emerald-600 transition-colors text-lg">
                Download for Android
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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