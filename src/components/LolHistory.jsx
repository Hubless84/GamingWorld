import React, { useState } from 'react';
import axios from 'axios';
import './LolHistory.css';

const LolHistory = () => {
  const [searchText, setSearchText] = useState(""); 
  const [gameList, setGameList] = useState([]);

  function getPlayerGames() {
    axios.get("/5pastgames", { params: { username: searchText } })
      .then(function(response) {
        setGameList(response.data);
      }).catch(function(error) {
        console.log(error);
      })
  }

  return (
    <div className='game-history-container'>
      <div className="mini-navbar">
          <a href="./LolPlayer">Find a Player</a>
          <a href="./LolHistory">Game History</a>
          <a href="./LolVideos">Videos</a>
      </div>
      <h2 className='history-title'>Game History:</h2>
      <input className='history-input' type="text" onChange={e => setSearchText(e.target.value)}></input><br></br>
      <button className='history-button' onClick={getPlayerGames}>Last 5 games</button>
      {gameList.length !== 0 ? (
        <div className='game-list'>
          {gameList.map((gameData, index) =>
            <div key={index} className='game-card'>
              <h2>Game {index + 1}</h2>
              <div className='participant-list'>
                {gameData.info.participants.map((data, participantIndex) =>
                  <p key={participantIndex} className='participant-info'>
                    Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kills}/{data.deaths}/{data.assists}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
</div>

  )
}

export default LolHistory; 
