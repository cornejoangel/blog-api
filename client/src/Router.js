import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import App from './App';
import Signup from './Signup';
import Login from './Login';
import Users from './Users';
import Navbar from './components/Navbar';

const Router = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Router;
