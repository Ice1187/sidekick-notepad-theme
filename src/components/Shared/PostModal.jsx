// src/components/Shared/PostModal.jsx
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../context/PostContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const PostModal = () => {
  const { 
    currentPost, 
    closePost, 
    postContent, 
    contentLoading 
  } = useContext(PostContext);
  
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (currentPost) {
      // Add a small delay before showing for animation
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
    }
  }, [currentPost]);
  
  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => closePost(), 300); // Wait for animation to complete
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  // Custom renderer for images to handle relative paths
  const imageRenderer = ({ node, src, alt, ...props }) => {
    const imageSrc = src.startsWith('http') 
      ? src 
      : `/data/posts/${src}`; // Convert relative paths to absolute
    
    return <img src={imageSrc} alt={alt} className="max-w-full rounded my-4" {...props} />;
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
        
        {contentLoading ? (
          <div className="py-4">Loading content...</div>
        ) : (
          <div className="post-markdown">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={{
                img: imageRenderer,
                // Add custom styling for other elements as before
                h1: ({node, ...props}) => <h1 className="text-xl font-bold pb-2 mb-4 border-b border-gray-200" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold my-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold my-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-gray-100 px-1 rounded" {...props} />
                    : <code className="block bg-gray-100 p-3 rounded my-4 overflow-x-auto" {...props} />,
              }}
            >
              {postContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostModal;
