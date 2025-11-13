export default function BlogContent({ article }) {
  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 border border-gray-100 prose prose-lg max-w-none">
          {article.content ? <div dangerouslySetInnerHTML={{ __html: article.content }} /> : <p>{article.description || 'No content available.'}</p>}
        </div>
      </div>
    </article>
  );
}
