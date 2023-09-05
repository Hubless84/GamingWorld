import React, { useState, useEffect } from 'react';
import Ahri from '../images/Lol/lol-ahri.jpeg';
import Darius from '../images/Lol/lol-darius.jpeg';
import Yasuo from '../images/Lol/lol-yasuo.jpeg';
import Evelynn from '../images/Lol/lol-evelynn.jpeg';
import Thresh from '../images/Lol/lol-thresh.jpeg';
import './LolMain.css';

const championData = [
  {
    name: 'Ahri',
    role: 'Mid',
    description: 'The Nine-Tailed Fox',
    image: Ahri,
    href: "https://leagueoflegends.fandom.com/wiki/Ahri/LoL"
  },
  {
    name: 'Darius',
    role: 'Top',
    description: 'The Hand of Noxus',
    image: Darius,
    href: "https://leagueoflegends.fandom.com/wiki/Darius/LoL"
  },
  {
    name: 'Yasuo',
    role: 'Mid',
    description: 'The Unforgiven',
    image: Yasuo,
    href: "https://leagueoflegends.fandom.com/wiki/Yasuo/LoL"
  },
  {
    name: 'Evelynn',
    role: 'Jungle',
    description: 'Agony\'s Embrace',
    image: Evelynn,
    href: "https://leagueoflegends.fandom.com/wiki/Evelynn/LoL"
  },
  {
    name: 'Thresh',
    role: 'Support',
    description: 'The Chain Warden',
    image: Thresh,
    href: "https://leagueoflegends.fandom.com/wiki/Thresh/LoL"
  }
  
];

function LolMain() {

  

  const [currentChampionIndex, setCurrentChampionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChampionIndex((prevIndex) => (prevIndex + 1) % championData.length);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const currentChampion = championData[currentChampionIndex];


  return (
    <div>
      <div className="mini-navbar">
        <a href="./LolPlayer">Find a Player</a>
        <a href="./LolHistory">Game History</a>
        <a href="./LolVideos">Videos</a>
      </div>
      
      <div>
  
      <div className="featured-champion">
        <h2>5 Most Played Champions</h2>
        <hr></hr>
        <h3>{currentChampion.name}</h3>
        <p>{currentChampion.description}</p>
        <img src={currentChampion.image} alt={currentChampion.name} />
        <p>Role: {currentChampion.role}</p>
        <a href={currentChampion.href}>Learn More</a>
      </div>
    </div>

      <div className="league-component">
        <div className="headlines">
          <h2>Fresh Content!</h2>
          <h2>Live Stats!</h2>
          <h2>Competitive Play!</h2>
        </div>
      </div>

      
      <div className="video-placeholder">
        
        <iframe
          width="50%"
          height="400"
          src="https://www.youtube.com/embed/G01ozdpUqBk"
          title="NEW UPDATED TIER LIST for PATCH 13.17 - League of Legends"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}

export default LolMain;
