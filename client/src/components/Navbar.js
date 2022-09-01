import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.scss';

const Navbar = (props) => {
  const { loggedIn, logout } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(true);
  };

  return (
    <nav>
      <button
        type="button"
        className="menu-button"
        onClick={() => toggleMenu()}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <div className={menuOpen ? 'nav-content open' : 'nav-content closed'}>
        <ul className={menuOpen ? 'links open' : 'links closed'}>
          <li>
            <Link to="/" onClick={() => toggleMenu()}>
              Home
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
          <button type="button" onClick={(e) => logout(e)}>
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
};

export default Navbar;
