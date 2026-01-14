import React from 'react';

const Navbar = ({ setCurrentPage, currentPage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          🌌 ScienceHindi
        </div>
        <ul className="nav-links">
          <li 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            होम
          </li>
          <li 
            className={`nav-link ${currentPage === 'facts' ? 'active' : ''}`}
            onClick={() => setCurrentPage('facts')}
          >
            तथ्य
          </li>
          <li 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            About
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
