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
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchLoginStatus = async () => {
    const response = await fetch('/api/loginstatus');
    const responseData = await response.json();
    setLoggedIn(responseData.loggedIn);
    setCurrentUser(responseData.user);
  };
  useEffect(() => {
    fetchLoginStatus();
  }, []);

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
    fetchLoginStatus();
    navigate('/');
  };

  const logout = async (e) => {
    e.preventDefault();
    const logoutResponse = await fetch('/api/logout');
    const logoutData = await logoutResponse.json();
    setLoggedIn(logoutData.loggedIn);
    fetchLoginStatus();
  };

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={<Home user={currentUser} />} />
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
