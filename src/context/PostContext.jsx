// src/context/PostContext.jsx
import { createContext, useState, useEffect, useRef } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [contentLoading, setContentLoading] = useState(false);
  const contentCache = useRef(new Map());

  // Load posts from index.json
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/data/posts/index.json');
        const data = await response.json();
        setPosts(data.posts || []);
        setConnections(data.connections || []);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  // Load post content with caching
  const loadPostContent = async (post) => {
    if (!post || !post.file) return;
    
    // Check if content is already in cache
    if (contentCache.current.has(post.file)) {
      setPostContent(contentCache.current.get(post.file));
      return;
    }
    
    setContentLoading(true);
    
    try {
      const response = await fetch(`/data/posts/${post.file}`);
      const content = await response.text();
      
      // Cache the content
      contentCache.current.set(post.file, content);
      setPostContent(content);
    } catch (error) {
      console.error('Failed to load post content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  // Open a post
  const openPost = async (post) => {
    setCurrentPost(post);
    await loadPostContent(post);
  };

  // Close the current post
  const closePost = () => {
    setCurrentPost(null);
  };

  return (
    <PostContext.Provider value={{ 
      posts,
      connections,
      loading,
      currentPost,
      postContent,
      contentLoading,
      openPost,
      closePost,
    }}>
      {children}
    </PostContext.Provider>
  );
};
