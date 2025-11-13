export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Love What You're Reading?</h2>
        <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">Get personalized care tips and join our thriving plant community with Bloomie.</p>
        <a href="#" className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition transform hover:scale-105 shadow-xl">Download Bloomie Now</a>
      </div>
    </section>
  );
}
