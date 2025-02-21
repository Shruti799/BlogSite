import CreatePost from "./components/posts/CreatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import UpdatePost from "./components/posts/UpdatePost";
import PostsList from "./components/posts/PostsList";
import HomePage from "./components/Home/HomePage";
import PostDetails from "./components/posts/PostDetails";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        {/* create post */}
        <Route element={<HomePage />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/lists" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<UpdatePost />} path="/posts/:postId" />
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;