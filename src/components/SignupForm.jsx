import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios"; // Make sure you've installed axios using 'npm install axios'

const SignupForm = () => {
  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const handleSignup = async () => {
    const username = document.querySelector('[name="username"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;
  
    // Send the signup data to the backend API endpoint
    try {
      await axios.post("/api/signup", { username, email, password });
      alert("User registered successfully");
      
      // Clear input fields after successful registration
      document.querySelector('[name="username"]').value = '';
      document.querySelector('[name="email"]').value = '';
      document.querySelector('[name="password"]').value = '';
    } catch (error) {
      console.error("Error during user registration:", error);
      alert("User registration failed");
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
        <h3>Creating User Failed</h3>
        <p>One of the fields is incorrect</p>
      </div>
    </div>
  );
};

export default SignupForm;
