import { useEffect, useRef, useState } from 'react';

const ConnectionsOverlay = ({ connections, posts, gridRef }) => {
  const svgRef = useRef(null);
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    const updateLines = () => {
      if (!gridRef.current || !svgRef.current || !connections.length) return;
      
      const gridRect = gridRef.current.getBoundingClientRect();
      const newLines = connections.map(connection => {
        const fromEl = document.querySelector(`.grid-post[data-post-id="${connection.from}"]`);
        const toEl = document.querySelector(`.grid-post[data-post-id="${connection.to}"]`);
        
        if (!fromEl || !toEl) return null;
        
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        
        const fromX = (fromRect.left + fromRect.width/2) - gridRect.left;
        const fromY = (fromRect.top + fromRect.height/2) - gridRect.top;
        const toX = (toRect.left + toRect.width/2) - gridRect.left;
        const toY = (toRect.top + toRect.height/2) - gridRect.top;
        
        return {
          id: `${connection.from}-${connection.to}`,
          x1: fromX,
          y1: fromY,
          x2: toX,
          y2: toY,
          color: connection.color || '#888',
          width: connection.width || 2,
          dashed: connection.dashed,
        };
      }).filter(Boolean);
      
      setLines(newLines);
    };
    
    updateLines();
    
    // Update on window resize
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [connections, posts, gridRef]);
  
  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    >
      {lines.map(line => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.color}
          strokeWidth={line.width}
          strokeDasharray={line.dashed}
        />
      ))}
    </svg>
  );
};

export default ConnectionsOverlay;
