import { useState } from 'react'
import CreatePost from './components/posts/CreatePost';
import PostsList from './components/PostsList';

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <CreatePost></CreatePost>
    <PostsList></PostsList>
   </div>
  );
}

export default App
