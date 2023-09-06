import React, { useState } from 'react';
import axios from 'axios';
import './LolPlayer.css';

function LolPlayer(){
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});

  function searchForPlayer() {
      const lowerCaseName = searchText.toLowerCase(); 
      const APICallString = `/api/lol/summoner?name=${lowerCaseName}`;
      
      axios.get(APICallString)
      .then(function(response) {
          setPlayerData(response.data);
      })
      .catch(function(error) {
          console.log(error);
      });
  }

  return (
    <div>
        <div className="mini-navbar">
            <a href="./LolPlayer">Find a Player</a>
            <a href="./LolHistory">Game History</a>
            <a href="./LolVideos">Videos</a>
        </div>

        <div className="player-page-container">

        <h1 className='lol-h1'> Summoner search:</h1>
        <input className='lol-input' type="text" onChange={e => setSearchText(e.target.value)} /><br></br>
        <button className='lol-button' onClick={searchForPlayer}>Search</button>
        {JSON.stringify(playerData) !== '{}' ? (
            <div className='player-info'>
                <h2 className='lol-h2'>Player Info</h2>
                <p>Name: {playerData.name}</p>
                <p>Summoner Level: {playerData.summonerLevel}</p>
                <img className='lol-img' src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/${playerData.profileIconId}.png`} alt="Profile Icon" />
            </div>
        ) : (
            <p></p>
        )}
       </div>
  </div>
);
} 

export default LolPlayer;