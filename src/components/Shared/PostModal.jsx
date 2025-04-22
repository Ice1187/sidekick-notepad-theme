import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../context/PostContext';
import { useMarkdown } from '../../hooks/useMarkdown';

const PostModal = () => {
  const { currentPost, closePost } = useContext(PostContext);
  const { loadMarkdown, htmlContent, loading } = useMarkdown();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (currentPost) {
      loadMarkdown(currentPost.file);
      // Add a small delay before showing for animation
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
    }
  }, [currentPost, loadMarkdown]);
  
  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => closePost(), 300); // Wait for animation to complete
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  if (!currentPost) return null;
  
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-8 rounded-lg max-w-3xl w-11/12 max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-3 right-3 text-2xl bg-transparent border-none cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleClose}
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold mb-4">{currentPost.title}</h2>
        
        {loading ? (
          <div className="py-4">Loading content...</div>
        ) : (
          <div 
            className="post-markdown"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
};

export default PostModal;
