import { useContext, useRef, useEffect } from 'react';
import { PostContext } from '../../context/PostContext';
import GridPost from './GridPost';
import ConnectionsOverlay from '../Shared/ConnectionsOverlay';

const DotGrid = () => {
  const { posts, connections } = useContext(PostContext);
  const gridRef = useRef(null);
  
  // Filter grid posts
  const gridPosts = posts.filter(post => post.type === 'grid');
  
  // Create dots for the grid
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 30 * 30; i++) {
      dots.push(
        <div key={i} className="relative">
          <div className="absolute w-1 h-1 bg-gray-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      );
    }
    return dots;
  };
  
  return (
    <div 
      ref={gridRef}
      className="relative flex-grow grid grid-cols-30 grid-rows-30"
    >
      {renderDots()}
      
      {gridPosts.map(post => (
        <GridPost 
          key={post.id}
          post={post}
        />
      ))}
      
      <ConnectionsOverlay 
        connections={connections}
        posts={gridPosts}
        gridRef={gridRef}
      />
    </div>
  );
};

export default DotGrid;
