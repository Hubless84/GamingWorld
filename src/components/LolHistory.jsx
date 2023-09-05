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
  <h2 className='history-title'>Game History:</h2>
  <input className='history-input' type="text" onChange={e => setSearchText(e.target.value)}></input>
  <button className='history-button' onClick={getPlayerGames}>Get the past 5 games from your player</button>
  {gameList.length !== 0 ? (
    <div className='game-list'>
      <p className='data-label'>Data!</p>
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
