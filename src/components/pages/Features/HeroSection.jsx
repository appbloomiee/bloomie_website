import React from 'react';

export default function HeroSection({ visible }) {
  return (
    <section
      id="hero"
      data-fade
      className={`py-20 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Bloomie's <span className="text-emerald-600">Smart Features</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          From AI-powered plant identification to community-driven learning — Bloomie makes caring for your plants and pets effortless and fun.
        </p>
        <img
          src="https://static.wixstatic.com/media/a89370_c20797d9916c422091929f949084e8eb~mv2.png"
          alt="Bloomie app showcase"
          className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
