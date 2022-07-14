import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Home = () => {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/api');
    const responseData = await response.json();
    setData(responseData);
  };
  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const responseData = await response.json();
    setPosts(responseData.postList);
  };
  useEffect(() => {
    fetchData();
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <h1>{data.title}</h1>
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={uniqid()}>
              {post.user.username} - {post.time_stamp_formatted}
            </li>
          ))}
        </ul>
      )}
      {posts.length === 0 && <p>There are no posts.</p>}
    </div>
  );
};

export default Home;
