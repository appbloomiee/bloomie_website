import { ArrowLeft } from 'lucide-react';

export default function ErrorState({ error, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </button>
      </div>
    </div>
  );
}
