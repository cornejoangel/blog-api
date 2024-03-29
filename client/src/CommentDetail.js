import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import './styles/CommentDetail.scss';

const CommentDetail = (props) => {
  const { user } = props;
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [creatingComment, setCreatingComment] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [commentErrors, setCommentErrors] = useState([]);
  // commentCheck is a flag that triggers a fetch to refresh the comment list
  const [commentCheck, setCommentCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/comments/${id}`);
      const responseData = await response.json();
      setComment(responseData.comment);
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

  const createComment = async (e, body) => {
    e.preventDefault();
    const postResponse = await fetch('/api/comments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body,
        parentType: 'comment',
        parentId: comment._id,
      }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setCommentErrors(postData.errors);
    }
    toggleCommenting();
    setCommentCheck(true);
  };

  const updateComment = async (e, body) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/comments/${id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body,
      }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setCommentErrors(postData.errors);
    }
    toggleEditing();
    setCommentCheck(true);
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/comments/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentid: comment._id,
      }),
    });
    const postData = await postResponse.json();
    if (postData.success) {
      navigate('/');
    }
  };

  return (
    <div className="content">
      <div className="main-comment-container">
        {comment === null && <div>Loading...</div>}
        {comment !== null && !editing && <Comment comment={comment} />}
        {editing && (
          <CommentForm createComment={updateComment} prevBody={comment.body} />
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
          comment !== null &&
          user._id === comment.user._id &&
          !creatingComment &&
          !deleting && (
            <button
              type="button"
              className={editing ? 'cancel-edit-button' : 'edit-button'}
              onClick={toggleEditing}
            >
              {editing ? 'Cancel Edit' : 'Edit Comment'}
            </button>
          )}
        {user !== null &&
          comment !== null &&
          user._id === comment.user._id &&
          !editing &&
          !creatingComment && (
            <button
              type="button"
              className={deleting ? 'cancel-delete-button' : 'delete-button'}
              onClick={toggleDeleting}
            >
              {deleting ? 'Cancel' : 'Delete Comment'}
            </button>
          )}
        {user !== null && comment !== null && user.admin && (
          <button
            type="button"
            className={deleting ? 'cancel-delete-button' : 'delete-button'}
            onClick={toggleDeleting}
          >
            {deleting ? 'Cancel' : 'Delete Comment'}
          </button>
        )}
        {deleting && (
          <div>
            <p>Are you sure you want to delete this comment?</p>
            <button type="button" onClick={(e) => deleteComment(e)}>
              Delete
            </button>
          </div>
        )}
      </div>
      {comment !== null && (
        <ul>
          {comment.comments.map((c) => (
            <li key={uniqid()} className="comment-container">
              <Comment comment={c} />
            </li>
          ))}
        </ul>
      )}
      {user === null && (
        <div className="login-prompt">
          <Link to="/login">Log in</Link> to leave a comment
        </div>
      )}
      {user !== null && !editing && !creatingComment && !deleting && (
        <button type="button" onClick={toggleCommenting}>
          Add Comment
        </button>
      )}
      {user !== null && !editing && creatingComment && (
        <CommentForm createComment={createComment} prevBody="" />
      )}
      {user !== null && !editing && creatingComment && (
        <button
          type="button"
          className="cancel-comment"
          onClick={toggleCommenting}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

CommentDetail.propTypes = {
  user: PropTypes.object,
};

export default CommentDetail;
