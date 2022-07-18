import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import PostForm from './components/PostForm';

const Home = (props) => {
  const { user } = props;
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [creatingPost, setCreatingPost] = useState(false);
  const [postErrors, setPostErrors] = useState([]);

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

  const createPost = async (e, title, body, hidden) => {
    e.preventDefault();
    const postResponse = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, title, body, hidden }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setPostErrors(postData.errors);
    }
    if (postData.customError) {
      setPostErrors(postData.customError);
    }
  };

  const togglePosting = (e) => {
    if (creatingPost) {
      setCreatingPost(false);
      return;
    }
    setCreatingPost(true);
  };

  return (
    <div className="app">
      <h1>{data.title}</h1>
      {user !== null && !creatingPost && (
        <button type="button" onClick={togglePosting}>
          Create Post
        </button>
      )}
      {user !== null && creatingPost && (
        <PostForm createPost={createPost} username="test" />
      )}
      {user !== null && creatingPost && (
        <button type="button" onClick={togglePosting}>
          Cancel Post
        </button>
      )}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={uniqid()}>
              <h2>
                {post.title} - {post.time_stamp_formatted}
              </h2>
              <p>{post.body}</p>
              <div>
                - {post.user.username} - {post.hidden} - {post.edited}
              </div>
            </li>
          ))}
        </ul>
      )}
      {posts.length === 0 && <p>There are no posts.</p>}
      {postErrors.length > 0 && (
        <div>
          <h2>Errors</h2>
          <ul>
            {postErrors.map((error) => (
              <li key={uniqid()}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;
