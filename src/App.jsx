import { PostProvider } from './context/PostContext';
import { ThemeProvider } from './context/ThemeContext';
import Notebook from './components/Layout/Notebook';
import PostModal from './components/Shared/PostModal';
import './styles/tailwind.css';

function App() {
  return (
    <ThemeProvider>
      <PostProvider>
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
          <Notebook />
          <PostModal />
        </div>
      </PostProvider>
    </ThemeProvider>
  );
}

export default App;
