import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Users from './Users';
import Navbar from './components/Navbar';

const App = () => {
  const [loginErrors, setLoginErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginPost = async (e, username, password) => {
    e.preventDefault();
    const postResponse = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const postData = await postResponse.json();
    setLoggedIn(postData.loggedIn);
    if (postData.errors) {
      setLoginErrors(postData.errors);
      return;
    }
    navigate('/');
  };

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <Login
              loginPost={loginPost}
              loginErrors={loginErrors}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
