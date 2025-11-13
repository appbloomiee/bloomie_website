// api.js
import { API_BASE_URL } from './constants';

export const fetchPublishedBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs/published`);
  if (!response.ok) {
    throw new Error(`Failed to fetch published blogs: ${response.status}`);
  }
  return response.json();
};

export const fetchPopularBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs/popular`);
  if (!response.ok) {
    console.warn('Failed to fetch popular blogs');
    return { data: [] };
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    console.warn('Failed to fetch categories');
    return { data: [] };
  }
  return response.json();
};

export const searchBlogs = async (query) => {
  const response = await fetch(`${API_BASE_URL}/blogs/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Search failed');
  }
  return response.json();
};

export const fetchBlogsByTag = async (tag) => {
  const response = await fetch(`${API_BASE_URL}/blogs/tag/${encodeURIComponent(tag)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tag blogs');
  }
  return response.json();
};