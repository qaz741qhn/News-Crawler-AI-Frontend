import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h2>AI News Digest</h2>
      <ul className='navbar-list'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/learn">Learn</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
