import React from 'react';

export default function AboutMission({ visibleSections }) {
  return (
    <section
      id="mission"
      data-fade
      className={`py-20 bg-white transition-all duration-1000 ${
        visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Bloomie, we envision a world where the ancient bond between humans, plants, and animals
              is strengthened through modern technology and community wisdom. Our mission is to democratize
              access to expert care knowledge, making it possible for anyone to successfully nurture the
              living beings in their care.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that when plants and pets thrive, so do the humans who care for them.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl">
                <h3 className="text-4xl font-bold text-emerald-600 mb-2">500K+</h3>
                <p className="text-gray-600 font-medium">Active Users</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-4xl font-bold text-teal-600 mb-2">95%</h3>
                <p className="text-gray-600 font-medium">ID Accuracy</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://static.wixstatic.com/media/a89370_f63b67e0697c402ab3c3cee5f189faac~mv2.png?originWidth=576&originHeight=384"
              alt="Mission"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
