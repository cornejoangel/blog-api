import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  const { loggedIn } = props;

  return (
    <nav>
      <ul className="links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/users">
          <li>User List</li>
        </Link>
      </ul>
      {!loggedIn && (
        <ul>
          <Link to="/signup">
            <li>Signup</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
};

export default Navbar;
