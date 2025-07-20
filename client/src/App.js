import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  
  return (
    <div className="container" style={{ marginTop: "25px" }}>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
export default App;
