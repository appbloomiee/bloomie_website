import React from 'react';

export default function ContactHeader({ visible }) {
  return (
    <div
      id="header"
      data-fade
      className={`text-center mb-12 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Contact <span className="text-emerald-600">Us</span>
      </h1>
      <p className="text-xl text-gray-600">
        Have questions or want to partner? Reach us.
      </p>
    </div>
  );
}
