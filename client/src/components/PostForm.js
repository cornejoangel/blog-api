import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostForm = (props) => {
  const { createPost } = props;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [hidden, setHidden] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'body') {
      setBody(e.target.value);
    }
  };

  const toggleHidden = () => {
    if (!hidden) {
      setHidden(true);
      return;
    }
    setHidden(false);
  };

  return (
    <form onSubmit={(e) => createPost(e, title, body, hidden)}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" value={title} onChange={handleChange} />
      <label htmlFor="body">Body:</label>
      <textarea name="body" value={body} onChange={handleChange} />
      <div>
        <label htmlFor="public">
          <input
            type="radio"
            id="public"
            name="hidden"
            value="false"
            checked={hidden === false}
            onChange={toggleHidden}
          />
          Public
        </label>
        <label htmlFor="private">
          <input
            type="radio"
            id="private"
            name="hidden"
            value
            checked={hidden === true}
            onChange={toggleHidden}
          />
          Private
        </label>
      </div>
      <button type="submit">Create post</button>
    </form>
  );
};

PostForm.propTypes = {
  createPost: PropTypes.func,
};

export default PostForm;
