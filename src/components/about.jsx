import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function BloomieAbout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-fade]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const story = [
    {
      number: "1",
      title: "The Problem",
      desc: "Our founders noticed that despite the abundance of information online, people still struggled to care for their plants and pets effectively. They needed personalized, expert guidance.",
      color: "bg-emerald-600"
    },
    {
      number: "2",
      title: "The Solution",
      desc: "We combined artificial intelligence with the collective wisdom of experienced plant and pet enthusiasts to create a platform that provides instant, accurate, and personalized care advice.",
      color: "bg-green-500"
    },
    {
      number: "3",
      title: "The Future",
      desc: "Today, Bloomie serves hundreds of thousands of users worldwide. Our vision is to become the global hub for plant and pet care knowledge and community.",
      color: "bg-teal-600"
    }
  ];

  const values = [
    { icon: "❤️", title: "Compassionate Care", desc: "Every plant and pet deserves love, attention, and the best possible care.", color: "bg-emerald-600" },
    { icon: "👥", title: "Community First", desc: "Our strength comes from the collective wisdom and support of our community.", color: "bg-green-500" },
    { icon: "💡", title: "Innovation", desc: "We harness cutting-edge technology to make care accessible to everyone.", color: "bg-teal-600" },
    { icon: "🎯", title: "Accessibility", desc: "Expert knowledge should be available to all, regardless of experience.", color: "bg-emerald-600" }
  ];

  const team = [
    { img: "Asset/Sykat.jpg", name: "Mahmud Islam Sykat", role: "Founder & Managing Director", desc: "Visionary leader behind Bloomie's growth and innovation strategy." },
    { img: "Asset/Showmik.jpg", name: "Miskat Ul Islam", role: "Co-founder & CEO", desc: "Driving Bloomie's mission to connect nature lovers worldwide." },
    { img: "Asset/Rahat.jpg", name: "Rahat Almas", role: "Co-founder & CTO", desc: "Architect of Bloomie's intelligent technology and digital ecosystem." },
    { img: "Asset/shakil.jpg", name: "Shakil Ahmed", role: "Co-founder & CFO", desc: "Managing Bloomie's financial growth and operational excellence." },
    { img: "Asset/Emu.PNG", name: "Ahasanul Hoque", role: "Co-founder & COO", desc: "Ensuring smooth operations and strategic development across teams." },
    { img: "Asset/Sazzad.jpg", name: "Sabbir Ahmed Sazzad", role: "Co-founder & CPO", desc: "Overseeing product experience and creating user-centered solutions." }
  ];

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          data-fade
          className={`py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About <span className="text-emerald-600">Bloomie</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to create a world where every plant thrives and every pet lives their best life, 
              supported by a community that cares deeply about the wellbeing of all living things.
            </p>
            <img
              src="https://static.wixstatic.com/media/a89370_3362a54296e7489b9c4af0aa8e8f6c1c~mv2.png?originWidth=1152&originHeight=448"
              alt="Community"
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section
          id="mission"
          data-fade
          className={`py-20 bg-white transition-all duration-1000 ${visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At Bloomie, we envision a world where the ancient bond between humans, plants, and animals 
                  is strengthened through modern technology and community wisdom. Our mission is to democratize 
                  access to expert care knowledge, making it possible for anyone to successfully nurture 
                  the living beings in their care.
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

        {/* Story Section */}
        <section
          id="story"
          data-fade
          className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Bloomie was born from a simple observation: too many plants were dying and too many pets 
                weren't getting the care they deserved, not from lack of love, but from lack of knowledge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {story.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6`}>
                    {item.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          id="values"
          data-fade
          className={`py-20 bg-white transition-all duration-1000 ${visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do at Bloomie, from product development 
                to community building.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`${value.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          data-fade
          className={`py-20 bg-gradient-to-b from-emerald-50 to-white transition-all duration-1000 ${visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate individuals behind Bloomie, united by love for plants, pets, 
                and the people who care for them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
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
      </main>
    </div>
  );
}