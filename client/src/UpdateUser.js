import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import SignupForm from './components/SignupForm';

const UpdateUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${id}/update`);
      const responseData = await response.json();
      setData(responseData);
      setUser(responseData.user);
      console.log(responseData);
      if (responseData.error) {
        setLoggedIn(false);
        return;
      }
      setLoggedIn(true);
    };
    fetchData();
  }, [id]);

  const updatePost = async (e, username, password, confirmation) => {
    e.preventDefault();
    const postResponse = await fetch(`/api/users/${id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmation }),
    });
    const postData = await postResponse.json();
    if (postData.errors) {
      setErrors(postData.errors);
      return;
    }
    navigate(`/users/${id}`);
  };

  return (
    <div className="app">
      <h1>{data.title}</h1>
      {loggedIn && <SignupForm submitPost={updatePost} updating />}
      {!loggedIn && <p>You must be logged in to update a user</p>}
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

export default UpdateUser;
