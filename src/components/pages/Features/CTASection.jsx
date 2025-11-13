import React from 'react';

export default function CTASection({ visible }) {
  return (
    <section
      id="cta"
      data-fade
      className={`py-20 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience Bloomie?</h2>
        <p className="text-xl text-emerald-50 mb-10">
          Join thousands of nature lovers using Bloomie to care for their plants and pets every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-colors text-lg shadow-lg"
          >
            Download for iOS
          </a>
          <a
            href="#"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-emerald-600 transition-colors text-lg"
          >
            Download for Android
          </a>
        </div>
      </div>
    </section>
  );
}
