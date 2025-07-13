import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Blogify</div>
      <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/">Blogs</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" className="btn dashboard-link">Admin Panel</Link>
            ) : (
              <Link to="/dashboard" className="btn dashboard-link">{user.name}</Link>
            )}
            <button onClick={onLogout} className="btn login">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/register" className="btn register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
