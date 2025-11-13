import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CoreFeatures from './CoreFeatures';
import AdditionalFeatures from './AdditionalFeatures';
import CTASection from './CTASection';

export default function Features() {
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <main>
        <HeroSection visible={visibleSections.has('hero')} />
        <CoreFeatures visible={visibleSections.has('core')} />
        <AdditionalFeatures visible={visibleSections.has('additional')} />
        <CTASection visible={visibleSections.has('cta')} />
      </main>
    </div>
  );
}
