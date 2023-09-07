import React from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import SponsorLogos from './Sponsors';
import { useSpring, animated } from 'react-spring';
import './HomePage.css'

function HomePage() {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 2000 },
  });


    return (

      <div className='home-page'>

        <div className="welcome-banner">
          <animated.h1 style={animationProps}>Welcome to Gaming World!</animated.h1>
          <p>Prepare for an epic gaming experience like no other.</p>
        </div>

        <div className="headlines">
          <div className="headline">
            <a href="./LolMain">
              <h3>League of Legends Universe</h3>
            </a>
          </div>
        </div>
        

        <>
        <hr className="horizontal-line" /> 
        <div className="slideshow-title">
          <h1>Our best selling products</h1>
          <div className="slideshow-container">
          <Link to="/Store">
              <Slideshow />
          </Link>
          </div>  
        </div> 
            
          <hr className="horizontal-line" />
          <div className="sponsor-title">
            <h1>Our Sponsors</h1>
          </div>
          <div className="sponsor-container">
              <SponsorLogos />
          </div>
      </>


      </div>  
  );
}

export default HomePage;
