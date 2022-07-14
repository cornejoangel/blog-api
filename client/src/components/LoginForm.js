import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  const { loginPost } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <form onSubmit={(e) => loginPost(e, username, password)}>
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
      <button type="submit">Log in</button>
    </form>
  );
};

LoginForm.propTypes = {
  loginPost: PropTypes.func,
};

export default LoginForm;
