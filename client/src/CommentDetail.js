import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';

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
    <div>
      {comment === null && <div>Loading...</div>}
      {comment !== null && <Comment comment={comment} />}
      {comment !== null && (
        <ul>
          {comment.comments.map((c) => (
            <li key={uniqid()}>
              <Comment comment={c} />
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
      {user !== null && comment !== null && user._id === comment.user._id && (
        <button type="button" onClick={toggleEditing}>
          Edit Comment
        </button>
      )}
      {user !== null && comment !== null && user._id === comment.user._id && (
        <button type="button" onClick={toggleDeleting}>
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
  );
};

CommentDetail.propTypes = {
  user: PropTypes.object,
};

export default CommentDetail;
