import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  const { createComment } = props;
  const [body, setBody] = useState('');

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <form onSubmit={(e) => createComment(e, body)}>
      <label htmlFor="body">Comment:</label>
      <textarea name="body" value={body} onChange={handleChange} />
      <button type="submit">Create comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func,
};

export default CommentForm;
