// src/components/pages/BloomieBlog/utils.js

const API_BASE_URL = 'http://107.167.94.243:5000';

export const getImageUrl = (imagePath) => {
  // Handle null, undefined, or empty values
  if (!imagePath) {
    return '/Asset/placeholder-blog.jpg';
  }
  
  // If imagePath is an array, get the first element
  if (Array.isArray(imagePath)) {
    imagePath = imagePath[0];
    if (!imagePath) {
      return '/Asset/placeholder-blog.jpg';
    }
  }
  
  // If imagePath is an object, try to get the url or path property
  if (typeof imagePath === 'object') {
    imagePath = imagePath.url || imagePath.path || imagePath.src || '';
    if (!imagePath) {
      return '/Asset/placeholder-blog.jpg';
    }
  }
  
  // Convert to string to be safe
  const pathStr = String(imagePath);
  
  // If it's already a full URL (http:// or https://), return as is
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
    return pathStr;
  }
  
  // If it's from the API uploads folder, prepend the API base URL
  if (pathStr.startsWith('/uploads') || pathStr.startsWith('uploads')) {
    return `${API_BASE_URL}${pathStr.startsWith('/') ? '' : '/'}${pathStr}`;
  }
  
  // If it's from public/Asset folder, use as is (it's already accessible)
  if (pathStr.startsWith('/Asset') || pathStr.startsWith('Asset')) {
    return pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
  }
  
  // Default case: assume it's from API uploads
  return `${API_BASE_URL}${pathStr.startsWith('/') ? '' : '/'}${pathStr}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Relative time formatting
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    
    // For older dates, show formatted date
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getReadingTime = (content) => {
  if (!content) return '1 min read';
  
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} min read`;
};