import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './Signup';
import Users from './Users';
import Navbar from './components/Navbar';

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
