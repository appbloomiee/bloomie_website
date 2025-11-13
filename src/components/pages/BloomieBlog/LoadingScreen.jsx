// LoadingScreen.jsx
import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading blog posts...</p>
        <p className="text-gray-400 text-sm mt-2">Stories and insights to help every life thrive.</p>
      </div>
    </div>
  );
}