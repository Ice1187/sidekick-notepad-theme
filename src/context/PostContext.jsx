import { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);

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

  // Open a post
  const openPost = async (post) => {
    setCurrentPost(post);
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
      openPost,
      closePost,
    }}>
      {children}
    </PostContext.Provider>
  );
};
