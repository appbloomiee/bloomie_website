// ErrorScreen.jsx
export default function ErrorScreen({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={onRetry}
          className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}