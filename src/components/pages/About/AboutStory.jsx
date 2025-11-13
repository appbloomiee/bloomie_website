import React from 'react';

export default function AboutStory({ visibleSections }) {
  const story = [
    {
      number: "1",
      title: "The Problem",
      desc: "Our founders noticed that despite the abundance of information online, people still struggled to care for their plants and pets effectively.",
      color: "bg-emerald-600"
    },
    {
      number: "2",
      title: "The Solution",
      desc: "We combined AI with the wisdom of experienced plant and pet lovers to provide instant, personalized care advice.",
      color: "bg-green-500"
    },
    {
      number: "3",
      title: "The Future",
      desc: "Bloomie serves hundreds of thousands of users worldwide, aiming to be the global hub for plant and pet care.",
      color: "bg-teal-600"
    }
  ];

  return (
    <section
      id="story"
      data-fade
      className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${
        visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bloomie was born from a simple observation: too many plants were dying and too many pets weren't getting the care they deserved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {story.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6`}
              >
                {item.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
