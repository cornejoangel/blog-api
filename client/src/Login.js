import React, { useState, useEffect } from 'react';

const Login = () => {
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
    <div className="app">
      <h1>{data.title}</h1>
    </div>
  );
};

export default Login;
