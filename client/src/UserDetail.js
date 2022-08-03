import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Post from './components/Post';
import Comment from './components/Comment';

const UserDetail = (props) => {
  const { currentUser, logout } = props;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${id}`);
      const responseData = await response.json();
      setUser(responseData.user);
      setPosts(responseData.user_posts);
      setComments(responseData.user_comments);
    };
    fetchData();
  }, [id]);

  const deleteToggle = () => {
    if (deleting) {
      setDeleting(false);
      return;
    }
    setDeleting(true);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/users/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: user._id,
      }),
    });
    const postData = await postResponse.json();
    // Logout if you were a user deleting yourself
    if (
      postData.success &&
      currentUser !== null &&
      currentUser._id === user._id
    ) {
      logout(e);
    }
    if (postData.success) {
      navigate('/');
    }
  };

  return (
    <div>
      {user === null && <div>Loading...</div>}
      {user !== null && (
        <div>
          <h1>{user.username}</h1>
          <div>Member since: {user.join_date_formatted}</div>
        </div>
      )}
      {posts !== null && (
        <div>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={uniqid()}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {comments !== null && (
        <div>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => (
              <li key={uniqid()}>
                <Comment comment={comment} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentUser !== null && user !== null && currentUser._id === user._id && (
        <button type="button" onClick={deleteToggle}>
          {deleting ? 'Cancel' : 'Delete User'}
        </button>
      )}
      {deleting && (
        <div>
          <p>
            {posts.length > 0 || comments.length > 0
              ? 'Please delete all posts and comments before attempting to delete this user'
              : 'Are you sure you want to delete this user?'}
          </p>
          {posts.length === 0 && comments.length === 0 && (
            <button type="button" onClick={(e) => deleteUser(e)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

UserDetail.propTypes = {
  currentUser: PropTypes.object,
  logout: PropTypes.func,
};

export default UserDetail;
