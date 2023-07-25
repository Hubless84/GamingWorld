import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-media-links">
          <a href="https://www.facebook.com/example">
            <img src="./images/Facebook-Logo.png" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com/example">
            <img src="twitter-logo.png" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/example">
            <img src="instagram-logo.png" alt="Instagram" />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Legal</h3>
        <ul className="legal-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-conditions">Terms and Conditions</a></li>
        </ul>
      </div>
    </footer>
    
  );
};

export default Footer;
