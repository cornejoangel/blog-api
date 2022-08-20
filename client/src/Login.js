import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import LoginForm from './components/LoginForm';
import './styles/Login.scss';

const Login = (props) => {
  const { loginPost, loginErrors: errors, loggedIn } = props;
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await fetch('/api/login');
    const responseData = await response.json();
    setData(responseData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>{data.title}</h1>
      {loggedIn && <p>You are already logged in</p>}
      {!loggedIn && <LoginForm loginPost={loginPost} />}
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

Login.propTypes = {
  loginPost: PropTypes.func,
  loginErrors: PropTypes.array,
  loggedIn: PropTypes.bool,
};

export default Login;
