import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import './styles/Users.scss';

const Users = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/api/users');
    const responseData = await response.json();
    setData(responseData);
    setUsers(responseData.user_list);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>{data.title}</h1>
      <ul>
        {users.map((user) => (
          <li key={uniqid()} className="user-listing">
            <Link to={`/users/${user._id}`}>
              {user.username} <p>- Joined: {user.join_date_formatted}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
