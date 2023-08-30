import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios"; // Make sure you've installed axios using 'npm install axios'

const LoginForm = ({ setLoggedInUser }) => {

  const [popupStyle, setPopupStyle] = useState("hide");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupStyle("login-popup");
    setTimeout(() => hidePopup(), 3000);
  };

  const hidePopup = () => {
    setPopupStyle("hide");
    setPopupMessage("");
  };

  const handleLogin = async () => {
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="pwd"]').value;

    // Send the login data to the backend for authentication
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.data.success) {
        showPopup("Login successful");
        setLoggedInUser(username);
        localStorage.setItem('loggedInUser', JSON.stringify(username));
        // Delay the navigation after showing the popup
        setTimeout(() => {
        navigate('/');
      }, 3300);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showPopup("Username or password are incorrect");
    }
  };

  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="text" name="username" placeholder="Enter username" />
      <input
        type={showPassword ? "text" : "password"}
        name="pwd"
        id="pwd"
        placeholder="Password"
      />
      <div className="chk-box">
        <input
          type="checkbox"
          id="chk"
          checked={showPassword}
          onChange={toggleShowPassword}
        />
        Show Password
      </div>
      <div className="buttons" onClick={handleLogin}>
        Sign in
      </div>
      <p>
        Need to create an account? <Link to="/SignupForm">Sign Up</Link>
      </p>

      <div className={popupStyle}>
        <h3>Login Status</h3>
        <p>{popupMessage}</p>
      </div>
    </div>
  );
};

export default LoginForm;
