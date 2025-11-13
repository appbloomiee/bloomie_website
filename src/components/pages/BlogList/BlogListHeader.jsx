import { ArrowLeft } from 'lucide-react';

export default function BlogListHeader({ category, count, onBack }) {
  return (
    <section className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white py-4 overflow-hidden shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all group bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="h-6 w-px bg-white/30"></div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl sm:text-2xl font-bold capitalize tracking-tight">{category}</h1>
              <span className="text-xs sm:text-sm text-emerald-100 font-medium bg-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {count} {count === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
