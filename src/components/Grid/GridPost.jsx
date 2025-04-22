import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const GridPost = ({ post }) => {
  const { openPost } = useContext(PostContext);
  
  const handleClick = (e) => {
    if (post.showContent !== false) {
      e.preventDefault();
      openPost(post);
    }
  };
  
  const gridStyle = {
    gridColumnStart: post.position.x,
    gridColumnEnd: post.position.x + post.size.width,
    gridRowStart: post.position.y,
    gridRowEnd: post.position.y + post.size.height,
    fontFamily: post.styles?.font || 'inherit',
    color: post.styles?.color || 'inherit',
    fontSize: post.styles?.fontSize || 'inherit',
    fontWeight: post.styles?.fontWeight || 'inherit',
    backgroundColor: post.styles?.backgroundColor || 'transparent',
    padding: post.styles?.padding || '0',
    zIndex: 1,
  };
  
  return (
    <a
      href={post.url || `#post-${post.id}`}
      className="flex items-center transition-all duration-200 rounded cursor-pointer hover:bg-gray-200/70 hover:scale-102 hover:z-10"
      data-post-id={post.id}
      style={gridStyle}
      onClick={handleClick}
    >
      {post.title}
    </a>
  );
};

export default GridPost;
