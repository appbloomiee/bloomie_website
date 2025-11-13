import React, { useState, useEffect } from 'react';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutStory from './AboutStory';
import AboutValues from './AboutValues';
import AboutTeam from './AboutTeam';

export default function About() {
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

  return (
    <div className="min-h-screen bg-white">
      <main>
        <AboutHero visibleSections={visibleSections} />
        <AboutMission visibleSections={visibleSections} />
        <AboutStory visibleSections={visibleSections} />
        <AboutValues visibleSections={visibleSections} />
        <AboutTeam visibleSections={visibleSections} />
      </main>
    </div>
  );
}
