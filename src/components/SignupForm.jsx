import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios"; 

const SignupForm = () => {
  const [popupStyle, setPopupStyle] = useState("hide");
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupStyle("login-popup");
    setTimeout(() => hidePopup(), 3000);
  };

  const hidePopup = () => {
    setPopupStyle("hide");
    setPopupMessage("");
  };

  const handleSignup = async () => {
    const username = document.querySelector('[name="username"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;

    try {
      // Check if username or email already exists
      const checkUserResponse = await axios.get(`/api/check-user?username=${username}&email=${email}`);
      if (checkUserResponse.data.exists) {
        showPopup("Username or email already exists");
        return;
      }

      // If not exists, proceed with user registration
      await axios.post("/api/signup", { username, email, password });
      showPopup("User registered successfully");

      // Clear input fields after successful registration
      document.querySelector('[name="username"]').value = "";
      document.querySelector('[name="email"]').value = "";
      document.querySelector('[name="password"]').value = "";
    } catch (error) {
      console.error("Error during user registration:", error);
      showPopup("User registration failed");
    }
  };

  return (
    <div className="signup-cover">
      <h1>Signup</h1>
      <input type="text" name="username" placeholder="Create Username" required />
      <input type="email" name="email" placeholder="Enter Email" required />
      <input type="password" name="password" placeholder="Enter Password" required />
      <div className="buttons" onClick={handleSignup}>
        Sign up
      </div>
      <p>
        Already have an account? <Link to="/LoginForm">Login</Link>
      </p>

      <div className={popupStyle}>
        <h3>Registration Status</h3>
        <p>{popupMessage}</p>
      </div>
    </div>
  );
};

export default SignupForm;