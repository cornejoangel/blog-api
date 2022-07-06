import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './Signup';
import Navbar from './components/Navbar';

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
