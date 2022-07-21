import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Post from './components/Post';
import Comment from './components/Comment';

const UserDetail = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${id}`);
      const responseData = await response.json();
      console.log(responseData);
      setUser(responseData.user);
      setPosts(responseData.user_posts);
      setComments(responseData.user_comments);
    };
    fetchData();
  }, [id]);

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
    </div>
  );
};

UserDetail.propTypes = {
  currentUser: PropTypes.object,
};

export default UserDetail;
