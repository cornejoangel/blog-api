import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  const { loggedIn, logout } = props;

  return (
    <nav>
      <ul className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">User List</Link>
        </li>
      </ul>
      {!loggedIn && (
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
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
