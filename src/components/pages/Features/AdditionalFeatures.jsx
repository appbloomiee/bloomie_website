import React from 'react';

export default function AdditionalFeatures({ visible }) {
  const additionalFeatures = [
    { icon: "📷", title: "Plant & Pet ID", desc: "Scan any plant or pet for instant AI-based identification." },
    { icon: "🩺", title: "Health Diagnosis", desc: "Detect issues early with our smart diagnostic tool." },
    { icon: "🔔", title: "Smart Reminders", desc: "Get notifications for watering, feeding, and vet visits." },
    { icon: "💬", title: "Expert Chat", desc: "Chat directly with certified experts for personalized advice." },
    { icon: "⭐", title: "Progress Tracking", desc: "Monitor growth and milestones with beautiful analytics." }
  ];

  return (
    <section
      id="additional"
      data-fade
      className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">More to Explore</h2>
          <p className="text-xl text-gray-600">
            Enhance your experience with these extra smart features designed just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {additionalFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
