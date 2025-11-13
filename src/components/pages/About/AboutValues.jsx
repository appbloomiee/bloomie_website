import React from 'react';

export default function AboutValues({ visibleSections }) {
  const values = [
    { icon: "❤️", title: "Compassionate Care", desc: "Every plant and pet deserves love and attention.", color: "bg-emerald-600" },
    { icon: "👥", title: "Community First", desc: "Our strength comes from our supportive community.", color: "bg-green-500" },
    { icon: "💡", title: "Innovation", desc: "We use technology to make care accessible to everyone.", color: "bg-teal-600" },
    { icon: "🎯", title: "Accessibility", desc: "Expert knowledge should be available to all.", color: "bg-emerald-600" },
  ];

  return (
    <section
      id="values"
      data-fade
      className={`py-20 bg-white transition-all duration-1000 ${
        visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do at Bloomie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${v.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
