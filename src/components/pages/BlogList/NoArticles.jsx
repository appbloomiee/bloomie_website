import { ArrowLeft } from 'lucide-react';

export default function NoArticles({ onBack }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-600 text-lg mb-6">No articles found in this category.</p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition"
      >
        <ArrowLeft size={20} />
        Browse All Articles
      </button>
    </div>
  );
}
