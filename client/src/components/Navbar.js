import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul className="links">
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/users">
        <li>User List</li>
      </Link>
    </ul>
    <ul>
      <Link to="/signup">
        <li>Signup</li>
      </Link>
      <Link to="/login">
        <li>Login</li>
      </Link>
    </ul>
  </nav>
);

export default Navbar;
