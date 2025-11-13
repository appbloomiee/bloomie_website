import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const carouselImages = [
    '/Asset/SPLASH.png',
    '/Asset/Home.png',
    '/Asset/Login.png',
    '/Asset/Plantcare.png',
    '/Asset/Post.png',
    '/Asset/Shop.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative">
      <div className="relative h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-500 ${
                idx === currentImage 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-64 h-[450px] bg-white rounded-3xl shadow-xl p-4 overflow-hidden">
                {!imageErrors[idx] ? (
                  <img 
                    src={img} 
                    alt={`App Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={() => handleImageError(idx)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100 rounded-2xl">
                    <Leaf className="w-16 h-16 mb-4 text-emerald-300" />
                    <p className="text-sm">Screenshot {idx + 1}</p>
                    <p className="text-xs mt-1">Image not found</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentImage 
                ? 'w-8 bg-emerald-600' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
