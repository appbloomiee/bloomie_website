import React from 'react';

export default function InfoCards({ visible }) {
  const cards = [
    {
      icon: '📍',
      title: 'Location',
      desc: 'Serving plant & pet lovers worldwide'
    },
    {
      icon: '⏰',
      title: 'Response Time',
      desc: 'We typically respond within 24 hours'
    },
    {
      icon: '💬',
      title: 'Support',
      desc: 'Available for users & partners'
    }
  ];

  return (
    <div
      id="info-cards"
      data-fade
      className={`grid md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-3">{card.icon}</div>
          <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-gray-600 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
