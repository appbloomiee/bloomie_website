import { useState, useEffect } from 'react';
import ContactHeader from './ContactHeader';
import ContactForm from './ContactForm';
import InfoCards from './InfoCards';

export default function Contact() {
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      <main className="flex-grow py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactHeader visible={visibleSections.has('header')} />
          <ContactForm visible={visibleSections.has('form')} />
          <InfoCards visible={visibleSections.has('info-cards')} />
        </div>
      </main>
    </div>
  );
}
