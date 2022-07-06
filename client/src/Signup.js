import React, { useState, useEffect } from 'react';
import SignupForm from './components/SignupForm';

const Signup = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await fetch('/api/signup');
    const responseData = await response.json();
    setData(responseData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>{data.title}</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
