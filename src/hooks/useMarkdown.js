import { useState } from 'react';
import { convertMarkdownToHtml } from '../utils/markdownConverter';

export const useMarkdown = () => {
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMarkdown = async (filepath) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/data/posts/${filepath}`);
      const text = await response.text();
      setContent(text);
      
      // Convert markdown to HTML
      const html = convertMarkdownToHtml(text);
      setHtmlContent(html);
      
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
    htmlContent,
    loading, 
    error, 
    loadMarkdown 
  };
};
