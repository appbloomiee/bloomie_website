// useBlogData.js
import { useState, useEffect } from 'react';
import { fetchRecentBlogs, fetchPopularBlogs, fetchCategories } from './api';

export function useBlogData() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting to fetch blog data...');

      // Fetch all data in parallel
      const [recentData, popularData, categoriesData] = await Promise.all([
        fetchRecentBlogs(),
        fetchPopularBlogs(),
        fetchCategories()
      ]);

      // Safely extract arrays from API responses
      const recentBlogs = recentData?.data || recentData || [];
      const popularBlogs = popularData?.data || popularData || [];
      const categoriesList = categoriesData?.data || categoriesData || [];

      console.log('Extracted blogs count:', recentBlogs.length);
      console.log('Extracted popular count:', popularBlogs.length);
      console.log('Extracted categories count:', categoriesList.length);

      // Set the data
      setArticles(recentBlogs);
      setFeaturedArticle(popularBlogs[0] || null);
      
      // Calculate category counts from blogs
      const categoryCountMap = {};
      
      recentBlogs.forEach(blog => {
        if (blog.category) {
          categoryCountMap[blog.category] = (categoryCountMap[blog.category] || 0) + 1;
        } else if (blog.categories && Array.isArray(blog.categories)) {
          blog.categories.forEach(cat => {
            categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
          });
        }
      });
      
      // Add counts to categories
      const categoriesWithCounts = categoriesList.map(cat => {
        const catName = cat.name || cat;
        return {
          name: catName,
          count: categoryCountMap[catName] || 0
        };
      });
      
      setCategories(categoriesWithCounts);
      
      // Extract unique tags from articles
      const allTags = recentBlogs
        .filter(blog => blog && blog.tags && Array.isArray(blog.tags))
        .flatMap(blog => blog.tags)
        .filter((tag, index, self) => self.indexOf(tag) === index)
        .slice(0, 6);
      setPopularTags(allTags);

      console.log('Blog data fetch completed successfully');

    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return {
    articles,
    setArticles,
    featuredArticle,
    categories,
    popularTags,
    loading,
    error,
    refetch: fetchBlogData
  };
}