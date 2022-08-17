import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Post from './components/Post';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';

const PostDetail = (props) => {
  const { user } = props;
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatingComment, setCreatingComment] = useState(false);
  const [commentErrors, setCommentErrors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // commentCheck is a flag that triggers a fetch to refresh the comment list
  const [commentCheck, setCommentCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const responseData = await response.json();
      setPost(responseData.post);
    };
    fetchData();
    setCommentCheck(false);
  }, [id, commentCheck]);

  const toggleCommenting = () => {
    if (creatingComment) {
      setCreatingComment(false);
      return;
    }
    setCreatingComment(true);
  };

  const toggleEditing = () => {
    if (editing) {
      setEditing(false);
      return;
    }
    setEditing(true);
  };

  const toggleDeleting = () => {
    if (deleting) {
      setDeleting(false);
      return;
    }
    setDeleting(true);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/posts/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postid: post._id,
      }),
    });
    const postData = await postResponse.json();
    if (postData.success) {
      navigate('/');
    }
  };

  const createComment = async (e, body) => {
    e.preventDefault();
    const postResponse = await fetch('/api/comments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body,
        parentType: 'post',
        parentId: post._id,
      }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setCommentErrors(postData.errors);
    }
    toggleCommenting();
    setCommentCheck(true);
  };

  return (
    <div>
      {post === null && <div>Loading...</div>}
      {post !== null && <Post post={post} />}
      {post !== null && (
        <ul>
          {post.comments.map((comment) => (
            <li key={uniqid()}>
              <Comment comment={comment} />
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
        <CommentForm createComment={createComment} prevBody="" />
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
      {user !== null &&
        post !== null &&
        user._id === post.user._id &&
        !creatingComment &&
        !deleting && (
          <button type="button" onClick={toggleEditing}>
            {editing ? 'Cancel Edit' : 'Edit Post'}
          </button>
        )}
      {user !== null &&
        post !== null &&
        user._id === post.user._id &&
        !editing &&
        !creatingComment && (
          <button type="button" onClick={toggleDeleting}>
            {deleting ? 'Cancel' : 'Delete Post'}
          </button>
        )}
      {deleting && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button type="button" onClick={(e) => deletePost(e)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

PostDetail.propTypes = {
  user: PropTypes.object,
};

export default PostDetail;
