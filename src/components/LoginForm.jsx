import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Link } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "403058750856-fuubg9dhve2jcpnnhj3a1jvk388pfivb.apps.googleusercontent.com",
        scope: ""
      });
    }
    gapi.load('client: auth2', start);
  }, []);

  const [popupStyle, showPopup] = useState("hide");
  const [showPassword, setShowPassword] = useState(false);

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="text" name="username" placeholder="Enter username"/>
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
      <div className="buttons" onClick={popup}>Sign in</div>
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