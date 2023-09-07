import React from 'react';
import './Footer.css';
import { InstagramLogo,FacebookLogo,TwitterLogo } from 'phosphor-react';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="social-media-links">
        <a href="https://www.twitter.com/example">
          <TwitterLogo size={36} />
        </a>
        <a href="https://www.facebook.com/groups/593235252888066">
          <FacebookLogo size={36} />
        </a>
        <a href="https://www.instagram.com/example">
          <InstagramLogo size={36} />
        </a>
      </div>

      <div className="rights">
        <h2>GamingWorld 2023 All Rights Reserved &#169;</h2>
      </div>

      <div className="legal-links">
        <a href="/PrivacyPolicy">Privacy Policy  &  Terms and Conditions </a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
