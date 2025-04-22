import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const TaskItem = ({ post }) => {
  const { openPost } = useContext(PostContext);
  
  const handleClick = (e) => {
    if (post.showContent !== false) {
      e.preventDefault();
      openPost(post);
    }
  };
  
  const circleStyle = {
    borderColor: post.styles?.circleColor || '#ccc',
  };
  
  const textStyle = {
    fontFamily: post.styles?.font || 'inherit',
    color: post.styles?.color || 'inherit',
    fontSize: post.styles?.fontSize || 'inherit',
    fontWeight: post.styles?.fontWeight || 'inherit',
  };
  
  return (
    <div 
      className="flex items-center gap-3 transition-all duration-200 hover:translate-x-1"
      data-post-id={post.id}
    >
      <div 
        className="w-5 h-5 border rounded-full flex-shrink-0"
        style={circleStyle}
      ></div>
      <a
        href={post.url || `#post-${post.id}`}
        className="flex items-center flex-grow h-5 px-3 border rounded transition-colors duration-200 hover:bg-gray-200/70"
        style={textStyle}
        onClick={handleClick}
      >
        {post.title}
      </a>
    </div>
  );
};

export default TaskItem;
