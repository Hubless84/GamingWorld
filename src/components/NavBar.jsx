import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from "./Shop-Context";
import './NavBar.css';

const NavBar = ({ loggedInUser, setLoggedInUser }) => {
  const { getTotalCartItemsCount } = useContext(ShopContext);
  const cartItemCount = getTotalCartItemsCount();

  const handleLogout = () => {
    // Perform logout actions, such as clearing user data and state
    setLoggedInUser(null);
    // You might also want to redirect to a logout page or the homepage
  };

  return (
    <nav className="navbar">
      <div className="login-register">
        {loggedInUser ? (
          <button className="user-button" onClick={handleLogout}>
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
      <div className="search-field">
        <input type="text" placeholder="Search" />
        <button type="submit">
          <FaSearch />
        </button>
      </div>
      <ul className="nav-links">
        <li><Link to="/HomePage">Home</Link></li>
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