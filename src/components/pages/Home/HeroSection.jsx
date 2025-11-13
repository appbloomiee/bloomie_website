import Carousel from './carousel';

export default function HeroSection({ visible }) {
  return (
    <section
      id="hero"
      data-fade
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-1000 ${
        visible.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
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

        {/* Carousel */}
        <Carousel />
      </div>
    </section>
  );
}
