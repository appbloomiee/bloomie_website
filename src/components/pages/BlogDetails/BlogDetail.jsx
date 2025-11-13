import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlogHeader from './BlogHeader';
import BlogContent from './BlogContent';
import RelatedArticles from './RelatedArticles';
import CTASection from './CTASection';
import ErrorFallback from '../../error_boundary';

const API_BASE_URL = 'http://107.167.94.243:5000/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${slug}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        const blog = data.blog || data.data || data;
        if (!blog) throw new Error('Article not found');
        setArticle(blog);

        if (blog.category) {
          const relatedRes = await fetch(`${API_BASE_URL}/blogs/category/${encodeURIComponent(blog.category)}`);
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            let list = Array.isArray(relatedData) ? relatedData : relatedData.blogs || relatedData.data || [];
            setRelatedArticles(list.filter(a => (a.slug || a._id) !== (blog.slug || blog._id)).slice(0, 3));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      <BlogHeader article={article} />
      <BlogContent article={article} />
      {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
      <CTASection />
    </div>
  );
}