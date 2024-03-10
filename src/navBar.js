import React from 'react';
import './Navbar.css'; // Import the CSS file for Navbar styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">SeeSop</a>
            </div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;