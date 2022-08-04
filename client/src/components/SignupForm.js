import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SignupForm = (props) => {
  const { submitPost, updating } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmation') {
      setConfirmation(e.target.value);
    }
  };

  return (
    <form onSubmit={(e) => submitPost(e, username, password, confirmation)}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <label htmlFor="confirmation">Confirm Password:</label>
      <input
        type="password"
        name="confirmation"
        value={confirmation}
        onChange={handleChange}
      />
      <button type="submit">{updating ? 'Update' : 'Signup'}</button>
    </form>
  );
};

SignupForm.propTypes = {
  submitPost: PropTypes.func,
  updating: PropTypes.bool,
};

export default SignupForm;
