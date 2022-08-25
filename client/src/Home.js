import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import PostForm from './components/PostForm';
import Post from './components/Post';
import './styles/Home.scss';

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
  }, [creatingPost]);

  const togglePosting = () => {
    setPostErrors([]);
    if (creatingPost) {
      setCreatingPost(false);
      return;
    }
    setCreatingPost(true);
  };

  const createPost = async (e, title, body, hidden) => {
    e.preventDefault();
    const postResponse = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, hidden }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setPostErrors(postData.errors);
      return;
    }
    togglePosting();
  };

  return (
    <div className="content">
      {user !== null && !creatingPost && (
        <button
          type="button"
          className="create-post create-post-home"
          onClick={togglePosting}
        >
          Create Post
        </button>
      )}
      {user !== null && creatingPost && (
        <PostForm createPost={createPost} prevPost={null} />
      )}
      {user !== null && creatingPost && (
        <button type="button" className="cancel-post" onClick={togglePosting}>
          Cancel Post
        </button>
      )}
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
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={uniqid()} className="home-post">
              <Post post={post} />
              <Link to={`/posts/${post._id}`}>View Post</Link>
            </li>
          ))}
        </ul>
      )}
      {posts.length === 0 && <p>There are no posts.</p>}
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;
