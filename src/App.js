import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import Pagination from "./components/pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  //////////////Post Count On per Page/////////////////////
  const postCount = (e) => setPostsPerPage(e.target.value)

  ///////////////////Get Current Posts////////////////////////
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //////////////////////Change Page//////////////////////////
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  // console.log(posts);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <ul className='pagination'>
        <li className='page-item'>
        <select 
                name="" 
                id="" 
                value={postsPerPage}
                onChange={postCount}
                className='page-link'>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
        </select>
        </li>
      </ul>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} postCount={postCount} />
    </div>
  );
}

export default App;
