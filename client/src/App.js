import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Users from './Users';
import Navbar from './components/Navbar';

const App = () => {
  const [data, setData] = useState({});
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
    navigate('/login');
  };

  const fetchData = async () => {
    const response = await fetch('/api');
    const responseData = await response.json();
    setData(responseData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>{data.title}</h1>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
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
