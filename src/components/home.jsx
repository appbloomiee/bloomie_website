import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

export default function BloomieApp() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [visibleSections, setVisibleSections] = useState(new Set());

  const carouselImages = [
    '/Asset/SPLASH.png',
    '/Asset/Home.png',
    '/Asset/Login.png',
    '/Asset/Plantcare.png',
    '/Asset/Post.png',
    '/Asset/Shop.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
  
      {/* Hero Section */}
      <section 
        id="hero"
        data-fade
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect with Nature,<br />
              <span className="text-emerald-600">Care for Companions</span> 🌸
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bloomie is the perfect app for plant and pet lovers. Track your garden, nurture your pets, and discover a community that grows together.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </a>
              <a href="#" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition border-2 border-emerald-600">
                Learn More
              </a>
            </div>
          </div>

          {/* App Carousel */}
          <div className="relative">
            <div className="relative h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {carouselImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute transition-all duration-500 ${
                      idx === currentImage 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="w-64 h-[450px] bg-white rounded-3xl shadow-xl p-4 overflow-hidden">
                      {!imageErrors[idx] ? (
                        <img 
                          src={img} 
                          alt={`App Screenshot ${idx + 1}`}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={() => handleImageError(idx)}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100 rounded-2xl">
                          <Leaf className="w-16 h-16 mb-4 text-emerald-300" />
                          <p className="text-sm">Screenshot {idx + 1}</p>
                          <p className="text-xs mt-1">Image not found</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentImage 
                      ? 'w-8 bg-emerald-600' 
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-fade
        className={`bg-white py-16 lg:py-24 transition-all duration-1000 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bloomie?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Because caring for your plants and pets should be simple, smart, and joyful — not stressful. Bloomie brings nature and companionship together in one easy app that helps you track, share, and grow every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Grow Together
              </h3>
              <p className="text-gray-600">
                Bloomie connects you with people who share your love for green life. Exchange tips, learn from others, and celebrate your progress.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                One App for All
              </h3>
              <p className="text-gray-600">
                Manage your plant watering schedules and pet care routines in one place. Everything stays organized and easy to track.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🌸</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                A Peaceful Experience
              </h3>
              <p className="text-gray-600">
                Clean design, relaxing visuals, and simple tools that make caring for life feel peaceful. Users say "this is such a good idea!" — and we agree.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}