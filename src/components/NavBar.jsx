import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from "./Shop-Context";
import './NavBar.css';

const NavBar = ({ loggedInUser, setLoggedInUser }) => {
  const { getTotalCartItemsCount } = useContext(ShopContext);
  const cartItemCount = getTotalCartItemsCount();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <nav className="navbar">
      <div className="login-register">
        {loggedInUser ? (
          <button className="login-button" onClick={handleLogout}>
            {loggedInUser} (Logout)
          </button>
        ) : (
          <Link to="/LoginForm">
            <button className="login-button">Login/Register</button>
          </Link>
        )}
      </div>
      <div className="logo">
        <img src={require('../images/GamingWorld.png')} alt="logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/HomePage">Home</Link></li>
        <li><Link to="/LolMain">League of Legends</Link></li>
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