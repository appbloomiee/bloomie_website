// CTASection.jsx
export default function CTASection({ visibleSections }) {
  return (
    <section 
      id="cta"
      data-fade
      className={`bg-gradient-to-r from-emerald-600 to-teal-600 py-16 transition-all duration-1000 ${
        visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-emerald-50 mb-8">
          Get personalized care advice, connect with fellow enthusiasts, and access exclusive content in the Bloomie app.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition transform hover:scale-105 shadow-lg">
            Download Bloomie
          </a>
          <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition">
            Join Newsletter
          </a>
        </div>
      </div>
    </section>
  );
}