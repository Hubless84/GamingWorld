import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from "./Shop-Context";
import './NavBar.css';

const NavBar = () => {
  const { getTotalCartItemsCount } = useContext(ShopContext);
  const cartItemCount = getTotalCartItemsCount();

  return (
    <nav className="navbar">
     
     <div className="login-register">
        {/* Replace the content inside this div with the "Login/Register" button */}
        <button className="login-button">Login/Register</button>
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
        <li><Link to="/HomePage">Home</Link></li>
        <li><Link to="/LoginForm">Login</Link></li>
        <li><Link to="/Tournaments">Tournaments</Link></li>
        <li><Link to="/Store">Store</Link></li>
        <li>
          <div>
            <Link to="/Cart">
              <ShoppingCart size={20} />
            </Link>
            <span className="cart_container">
              {cartItemCount}
            </span>
            <Link to="/Cart"></Link>
          </div>
        </li>
        <li><Link to="/ContactForm">Contact</Link></li>
      </ul>
    </nav>
  );
};


export default NavBar;