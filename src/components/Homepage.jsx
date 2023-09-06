import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import SponsorLogos from './Sponsors';
import './HomePage.css'

function HomePage() {
  


    return (

      <div className='home-page'>

<div className="headlines">
        <div className="headline">
          <a href="https://www.leagueoflegends.com/en-gb/news/game-updates/">
            <h3>Live Updates!</h3>
          </a>
        </div>
        <div className="headline">
          <a href="https://liquipedia.net/leagueoflegends/A-Tier_Tournaments">
            <h3>Competitive Play!</h3>
          </a>
        </div>
        <div className="headline">
          <a href="https://signup.leagueoflegends.com/en-us/signup/redownload">
            <h3>Join Now!</h3>
          </a>
        </div>
      </div>
        

      <>
          <hr className="horizontal-line" />
          <div className="slideshow-title">
            <h1>Our best selling products</h1>
          </div> 
            <div className="slideshow-container">
            <Link to="/Store">
                <Slideshow />
            </Link>
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
