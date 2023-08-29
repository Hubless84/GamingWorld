import React from 'react';
import './Tournaments.css'; 


const Tournaments = () => {
    return (
      <div>
        <div className="tournaments-container">
          <a href="/ValorantMain" className="section">
            <div className="section-text">Fifa 23</div>
          </a>
          <a href="/LolMain" className="section">
            <div className="section-text">Dota 2</div>
          </a>
          <a href="/LolMain" className="section">
            <div className="section-text">League of Legends</div>
          </a>
          <a href="/CSGOMain" className="section">
            <div className="section-text">CS: GO</div>
          </a>
        </div>
      </div>
    );
  };
  
 

export default Tournaments;
