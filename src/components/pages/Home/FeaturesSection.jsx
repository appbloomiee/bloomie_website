export default function FeaturesSection({ visible }) {
  return (
    <section 
      id="features"
      data-fade
      className={`bg-white py-16 lg:py-24 transition-all duration-1000 ${
        visible.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Bloomie?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Because caring for your plants and pets should be simple, smart, and joyful — not stressful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Grow Together
            </h3>
            <p className="text-gray-600">
              Connect with people who share your love for green life.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="text-5xl mb-4">🐾</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              One App for All
            </h3>
            <p className="text-gray-600">
              Manage your plant and pet care routines all in one place.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              A Peaceful Experience
            </h3>
            <p className="text-gray-600">
              Relaxing visuals and simple tools that make caring feel peaceful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
