import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Post from './components/Post';
import PostForm from './components/PostForm';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import './styles/Home.scss';
import './styles/PostDetail.scss';

const PostDetail = (props) => {
  const { user } = props;
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatingComment, setCreatingComment] = useState(false);
  const [postErrors, setPostErrors] = useState([]);
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

  const updatePost = async (e, title, body, hidden) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/posts/${id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, hidden }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setPostErrors(postData.errors);
    }
    toggleEditing();
    setCommentCheck(true);
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
    <div className="content">
      <div className="post-container">
        {post === null && <div>Loading...</div>}
        {post !== null && !editing && <Post post={post} />}
        {editing && <PostForm createPost={updatePost} prevPost={post} />}
        {user !== null &&
          post !== null &&
          user._id === post.user._id &&
          !creatingComment &&
          !deleting && (
            <button
              type="button"
              className={editing ? 'cancel-edit-button' : 'edit-button'}
              onClick={toggleEditing}
            >
              {editing ? 'Cancel Edit' : 'Edit Post'}
            </button>
          )}
        {user !== null &&
          post !== null &&
          user._id === post.user._id &&
          !editing &&
          !creatingComment && (
            <button
              type="button"
              className={deleting ? 'cancel-delete-button' : 'delete-button'}
              onClick={toggleDeleting}
            >
              {deleting ? 'Cancel' : 'Delete Post'}
            </button>
          )}
        {user !== null && post !== null && user.admin && (
          <button
            type="button"
            className={deleting ? 'cancel-delete-button' : 'delete-button'}
            onClick={toggleDeleting}
          >
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
      {post !== null && (
        <ul>
          {post.comments.map((comment) => (
            <li key={uniqid()} className="comment-container">
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      )}
      {user === null && (
        <div className="login-prompt">
          <Link to="/login">Log in</Link> to leave a comment
        </div>
      )}
      {user !== null && !editing && !creatingComment && (
        <button type="button" onClick={toggleCommenting}>
          Add Comment
        </button>
      )}
      {user !== null && creatingComment && (
        <CommentForm createComment={createComment} prevBody="" />
      )}
      {user !== null && creatingComment && (
        <button
          type="button"
          className="cancel-comment"
          onClick={toggleCommenting}
        >
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
