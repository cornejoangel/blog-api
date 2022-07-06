import React, { useState } from 'react';

const SignupForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUserName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirm') {
      setConfirm(e.target.value);
    }
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={userName}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <label htmlFor="confirm">Confirm Password:</label>
      <input
        type="password"
        name="confirm"
        value={confirm}
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
