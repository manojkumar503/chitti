import React from 'react';
import './Navbar.css';

const Navbar = ({ cart, onCartClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1>SUN DESIGNER</h1>
                </div>
                <div className="navbar-subtitle">
                    <p>Product Management Dashboard</p>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
