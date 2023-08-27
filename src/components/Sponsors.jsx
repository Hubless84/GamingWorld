import React from 'react';
import sponsor1 from '../images/HomePage/sponsor1.png';
import sponsor2 from '../images/HomePage/sponsor2.png';
import sponsor3 from '../images/HomePage/sponsor3.jpeg';
import sponsor4 from '../images/HomePage/sponsor4.png';
import './Sponsors.css';

const Sponsors = () => {
  const sponsorLogos = [sponsor1, sponsor2, sponsor3, sponsor4];

  return (
    <div className="sponsor-logos">
      {sponsorLogos.map((logo, index) => (
        <React.Fragment key={index}>
          <img src={logo} alt={`Sponsor ${index}`} className="sponsor-logo" />
          {index !== sponsorLogos.length - 1 && <div className="vertical-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sponsors;