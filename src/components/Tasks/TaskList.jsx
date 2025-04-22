import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { posts } = useContext(PostContext);
  
  // Filter task posts
  const taskPosts = posts.filter(post => post.type === 'task');
  
  return (
    <div className="flex flex-col gap-3 ml-5 flex-grow-0 w-64">
      {taskPosts.map(post => (
        <TaskItem 
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default TaskList;
