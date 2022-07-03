import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [path, setPath] = useState("/api");
  const [data, setData] = useState('nothing yet');

  const updatePath = (newPath) => {
    setPath(newPath);
  }

  const getData = () => {
    fetch(path)
      .then(result => result.json())
      .then(body => setData(body))
  };

  return (
    <div className="app">
      <h1>Blog</h1>
      <input value={path} type="text" onChange={(e) => updatePath(e.target.value)} />
      <button onClick={getData}>Get path data</button>
      <div>
        path: {path}
      </div>
      <h2>Data:</h2>
      <div>
        {Object.entries(data).map(([key, value]) =>
          <p>{key} : {value} </p>
        )}
      </div>

    </div>
  )
};

export default App;
