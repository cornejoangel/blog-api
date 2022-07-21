import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Post from './components/Post';
import CommentForm from './components/CommentForm';

const PostDetail = (props) => {
  const { user } = props;
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatingComment, setCreatingComment] = useState(false);
  const [commentErrors, setCommentErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const responseData = await response.json();
      setPost(responseData.post);
    };
    fetchData();
  }, [id]);

  const toggleCommenting = () => {
    if (creatingComment) {
      setCreatingComment(false);
      return;
    }
    setCreatingComment(true);
  };

  const createComment = async (e, body) => {
    e.preventDefault();
    console.log('create comment');
    const postResponse = await fetch('/api/comments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        body,
        parentType: 'post',
        parentId: post._id,
      }),
    });
    const postData = await postResponse.json();
    console.log(postData);
    if (postData.errors) {
      setCommentErrors(postData.errors);
    }
    toggleCommenting();
  };

  return (
    <div>
      {post === null && <div>Loading...</div>}
      {post !== null && <Post post={post} />}
      {post !== null && (
        <ul>
          {post.comments.map((comment) => (
            <li key={uniqid()}>
              {comment.body} - {comment.user.username}
            </li>
          ))}
        </ul>
      )}
      {user === null && <div>Log in to leave a comment</div>}
      {user !== null && !creatingComment && (
        <button type="button" onClick={toggleCommenting}>
          Add Comment
        </button>
      )}
      {user !== null && creatingComment && (
        <CommentForm createComment={createComment} />
      )}
      {user !== null && creatingComment && (
        <button type="button" onClick={toggleCommenting}>
          Cancel
        </button>
      )}
      {commentErrors.length > 0 && (
        <div>
          <h2>Errors</h2>
          <ul>
            {commentErrors.map((error) => (
              <li key={uniqid()}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

PostDetail.propTypes = {
  user: PropTypes.object,
};

export default PostDetail;
