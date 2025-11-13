import React from 'react';

export default function AboutHero({ visibleSections }) {
  return (
    <section
      id="hero"
      data-fade
      className={`py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 transition-all duration-1000 ${
        visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          About <span className="text-emerald-600">Bloomie</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          We're on a mission to create a world where every plant thrives and every pet lives their
          best life, supported by a community that cares deeply about the wellbeing of all living things.
        </p>
        <img
          src="https://static.wixstatic.com/media/a89370_3362a54296e7489b9c4af0aa8e8f6c1c~mv2.png?originWidth=1152&originHeight=448"
          alt="Community"
          className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
