import React, { useState, useEffect } from 'react';
import './ValorantMain.css';

function ValorantMain() {
  const [championRotations, setChampionRotations] = useState({
    maxNewPlayerLevel: 0,
    freeChampionIdsForNewPlayers: [],
    freeChampionIds: [],
  });

  useEffect(() => {
    fetch('/api/valorant-champion-rotations')
      .then(response => response.json())
      .then(data => setChampionRotations(data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  return (
    <div>
      <header>
        <h1>Valorant</h1>
      </header>
      <div className="container">
        <div className="main-content">
          <h2>Champion Rotations</h2>
          <div className="champion-rotations">
            <p>Max New Player Level: {championRotations.maxNewPlayerLevel}</p>
            <p>Free Champion IDs for New Players: {championRotations.freeChampionIdsForNewPlayers.join(', ')}</p>
            <p>Free Champion IDs: {championRotations.freeChampionIds.join(', ')}</p>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2023 GamingWorld. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ValorantMain;
