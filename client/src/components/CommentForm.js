import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  const { createComment, prevBody } = props;
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (prevBody !== '') {
      setBody(prevBody);
      setEditing(true);
    }
  }, [prevBody]);

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <form onSubmit={(e) => createComment(e, body)}>
      <label htmlFor="body">Comment:</label>
      <textarea name="body" value={body} onChange={handleChange} />
      <button type="submit">
        {editing ? 'Update comment' : 'Create comment'}
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func,
  prevBody: PropTypes.string,
};

export default CommentForm;
