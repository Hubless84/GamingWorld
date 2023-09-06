import React from 'react';
import './Footer.css';
import { InstagramLogo,FacebookLogo,TwitterLogo } from 'phosphor-react';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="social-media-links">
        <a href="https://www.twitter.com/example">
          <TwitterLogo size={24} />
        </a>
        <a href="https://www.facebook.com/groups/593235252888066">
          <FacebookLogo size={24} />
        </a>
        <a href="https://www.instagram.com/example">
          <InstagramLogo size={24} />
        </a>
      </div>

      <div className="logo">
        <img src={require('../images/GamingWorld.png')} alt="logo" />
      </div>

      <div className="legal-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-conditions">Terms and Conditions</a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
