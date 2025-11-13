import React from 'react';

export default function CoreFeatures({ visible }) {
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

  return (
    <section
      id="core"
      data-fade
      className={`py-20 bg-white transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Core Features</h2>
          <p className="text-xl text-gray-600">Everything you need to keep your plants and pets healthy and thriving.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
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
  );
}
