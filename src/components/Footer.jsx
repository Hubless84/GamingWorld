import React from 'react';
import './Footer.css';
import { InstagramLogo,FacebookLogo,TwitterLogo } from 'phosphor-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-media-links">
          <a href="https://www.facebook.com/example">
              <TwitterLogo size={24} />
          </a>
          <a href="https://www.twitter.com/example">
            <FacebookLogo size={24} />
          </a>
          <a href="https://www.instagram.com/example">
              <InstagramLogo size={24} />
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
