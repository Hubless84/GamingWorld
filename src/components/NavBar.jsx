import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
     
      <div className="user-profile">
        <img src='../images/profile-picture.png' alt="Profile" />
        <span>Or Ifrach</span>
      </div>
      <div className="logo">
        <img src={(require('../images/GamingWorld.png'))} alt="logo" />
      </div>
      <div className="search-field">
        <input type="text" placeholder="Search" />
        <button type="submit">
          <img src={(require('../images/search-icon.png'))} alt='logo'/>
        </button>
      </div>
      <ul className="nav-links">
        <li><Link to="/Homepage">Home</Link></li>
        <li><Link to="/LoginForm">Login</Link></li>
        <li><Link to="/about">Tournaments</Link></li>
        <li><Link to="/Store">Store</Link></li>
        <li><Link to="/Cart"><ShoppingCart size={20}/></Link></li>
        <li><Link to="/ContactForm">Contact</Link></li>
      </ul>
    </nav>
  );
};


export default NavBar;