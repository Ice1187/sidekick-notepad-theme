// src/hooks/useMarkdown.js
import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export const useMarkdown = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentCache = useRef(new Map());

  const loadMarkdown = async (filepath) => {
    if (!filepath) return '';
    
    // Check if content is already in cache
    if (contentCache.current.has(filepath)) {
      setContent(contentCache.current.get(filepath));
      return contentCache.current.get(filepath);
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/data/posts/${filepath}`);
      const text = await response.text();
      
      // Cache the content
      contentCache.current.set(filepath, text);
      setContent(text);
      
      return text;
    } catch (error) {
      setError(error);
      console.error('Failed to load markdown:', error);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return { 
    content, 
    loading, 
    error, 
    loadMarkdown 
  };
};
