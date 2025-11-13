import { Link } from 'react-router-dom';

export default function RelatedArticles({ articles }) {
  const getImageUrl = (img) => img?.url || img || 'https://static.wixstatic.com/media/a89370_d321251931714fa3badfa6156c2c02ea~mv2.png';

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map(a => (
            <Link key={a._id || a.id} to={`/blog/${a.slug || a._id || a.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img src={getImageUrl(a.featuredImage || a.image || (a.images && a.images[0]))} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition">{a.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{a.excerpt || a.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
