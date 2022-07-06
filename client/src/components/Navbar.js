import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul className="links">
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/signup">
        <li>Signup</li>
      </Link>
    </ul>
  </nav>
);

export default Navbar;
