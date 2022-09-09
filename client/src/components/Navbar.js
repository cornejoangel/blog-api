import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.scss';

const Navbar = (props) => {
  const { loggedIn, logout, user } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(true);
  };

  const logoutHandler = (e) => {
    toggleMenu();
    logout(e);
  };

  return (
    <nav className={menuOpen ? 'open' : 'closed'}>
      <button
        type="button"
        className="menu-button"
        onClick={() => toggleMenu()}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <div className={menuOpen ? 'nav-content open' : 'nav-content closed'}>
        {user !== null && (
          <p className={menuOpen ? 'logged open' : 'logged closed'}>
            Logged in as <strong>{user.username}</strong>
          </p>
        )}
        <ul className={menuOpen ? 'links open' : 'links closed'}>
          <li>
            <Link to="/" onClick={() => toggleMenu()}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => toggleMenu()}>
              About
            </Link>
          </li>
          <li>
            <Link to="/users" onClick={() => toggleMenu()}>
              User List
            </Link>
          </li>
        </ul>
        {!loggedIn && (
          <ul className={menuOpen ? 'auth open' : 'auth closed'}>
            <li>
              <Link to="/signup" onClick={() => toggleMenu()}>
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => toggleMenu()}>
                Login
              </Link>
            </li>
          </ul>
        )}
        {loggedIn && (
          <button
            type="button"
            className={menuOpen ? 'logout open' : 'logout closed'}
            onClick={(e) => logoutHandler(e)}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
  user: PropTypes.object,
};

export default Navbar;
