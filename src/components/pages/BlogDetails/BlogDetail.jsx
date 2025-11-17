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
  const [liking, setLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching blog with slug:', slug);
        
        const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
        
        if (!res.ok) {
          throw new Error(`Article not found (${res.status})`);
        }
        
        const data = await res.json();
        console.log('Blog data received:', data);
        
        const blog = data.blog || data.data || data;
        if (!blog) throw new Error('Article not found');
        
        setArticle(blog);

        // Check if user has already liked this article
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        setHasLiked(likedArticles.includes(blog._id || blog.id));
        
        // Fetch related articles if category exists
        if (blog.category) {
          try {
            const relatedRes = await fetch(`${API_BASE_URL}/blogs/category/${encodeURIComponent(blog.category)}`);
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json();
              let list = Array.isArray(relatedData) ? relatedData : relatedData.blogs || relatedData.data || [];
              setRelatedArticles(list.filter(a => (a.slug || a._id) !== (blog.slug || blog._id)).slice(0, 3));
            }
          } catch (err) {
            console.warn('Failed to fetch related articles:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!article || liking || hasLiked) return;

    setLiking(true);
    try {
      const articleId = article._id || article.id;
      const res = await fetch(`${API_BASE_URL}/blogs/${articleId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to like article');
      }

      const data = await res.json();
      
      // Update article with new like count
      setArticle(prev => ({
        ...prev,
        likes: data.likes || (prev.likes || 0) + 1
      }));

      // Mark as liked in localStorage
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      likedArticles.push(articleId);
      localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
      setHasLiked(true);

    } catch (err) {
      console.error('Error liking article:', err);
      alert('Failed to like article. Please try again.');
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return <ErrorFallback error={error || 'Article not found'} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      <BlogHeader article={article} onLike={handleLike} liking={liking} hasLiked={hasLiked} />
      <BlogContent article={article} />
      {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
      <CTASection />
    </div>
  );
}