import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios"; // Make sure you've installed axios using 'npm install axios'

const LoginForm = ({ setLoggedInUser }) => {
  const [popupStyle, setPopupStyle] = useState("hide");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="pwd"]').value;

    // Send the login data to the backend for authentication
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.data.success) {
        alert("Login successful");
        setLoggedInUser(username);
        navigate("/HomePage");
      } else {
        setPopupStyle("login-popup");
        setTimeout(() => setPopupStyle("hide"), 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
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
        <h3>Login Failed</h3>
        <p>Username or password incorrect</p>
      </div>
    </div>
  );
};

export default LoginForm;
