import React from 'react';
import sponsor1 from '../images/HomePage/sponsor1.png';
import sponsor2 from '../images/HomePage/sponsor2.png';
import sponsor3 from '../images/HomePage/sponsor3.jpeg';
import sponsor4 from '../images/HomePage/sponsor4.png';
import './Sponsors.css';

const Sponsors = () => {
  return (
    <div className="sponsor-logos">
      <img src={sponsor1} alt="Sponsor 1" className="sponsor-logo" />
      <img src={sponsor2} alt="Sponsor 2" className="sponsor-logo" />
      <img src={sponsor3} alt="Sponsor 3" className="sponsor-logo" />
      <img src={sponsor4} alt="Sponsor 3" className="sponsor-logo" />
    </div>
  );
};

export default Sponsors;