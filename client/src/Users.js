import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Users = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/api/users');
    const responseData = await response.json();
    console.log(responseData.user_list);
    setData(responseData);
    setUsers(responseData.user_list);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>{data.title}</h1>
      <ul>
        {users.map((user) => (
          <li key={uniqid()}>
            {user.username} - {user.join_date_formatted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
