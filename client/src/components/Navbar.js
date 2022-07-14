import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  const { loggedIn, logout } = props;

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
      {loggedIn && (
        <button type="button" onClick={(e) => logout(e)}>
          Log out
        </button>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

export default Navbar;
