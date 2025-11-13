import React from 'react';

export default function AboutTeam({ visibleSections }) {
  const team = [
    { img: "Asset/Sykat.png", name: "Mahmud Islam Sykat", role: "Founder & Managing Director", desc: "Visionary leader behind Bloomie's growth and innovation." },
    { img: "Asset/Showmik.jpg", name: "Miskat Ul Islam", role: "Co-founder & CEO", desc: "Driving Bloomie's mission to connect nature lovers worldwide." },
    { img: "Asset/Rahat.jpg", name: "Rahat Almas", role: "Co-founder & CTO", desc: "Architect of Bloomie's technology and ecosystem." },
    { img: "Asset/shakil.jpg", name: "Shakil Ahmed", role: "Co-founder & CFO", desc: "Managing Bloomie's financial growth and excellence." },
    { img: "Asset/avater.png", name: "Ahasanul Hoque", role: "Co-founder & COO", desc: "Ensuring smooth operations across teams." },
    { img: "Asset/avater.png", name: "Sabbir Ahmed Sazzad", role: "Co-founder & CPO", desc: "Overseeing user-centered product experience." },
  ];

  return (
    <section
      id="team"
      data-fade
      className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${
        visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind Bloomie AI, united by love for plants, pets, and people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
