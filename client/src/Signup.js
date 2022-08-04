import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import SignupForm from './components/SignupForm';

const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch('/api/signup');
    const responseData = await response.json();
    setData(responseData);
    if (responseData.error) {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const signupPost = async (e, username, password, confirmation) => {
    e.preventDefault();
    const postResponse = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmation }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setErrors(postData.errors);
      return;
    }
    navigate('/');
  };

  return (
    <div className="app">
      <h1>{data.title}</h1>
      {!loggedIn && <SignupForm submitPost={signupPost} />}
      {loggedIn && (
        <p>Please log out before attempting to sign up another user</p>
      )}
      {errors.length > 0 && (
        <div>
          <h2>Errors</h2>
          <ul>
            {errors.map((error) => (
              <li key={uniqid()}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Signup;
