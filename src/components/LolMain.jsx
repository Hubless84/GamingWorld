import React, { useState } from 'react';
import axios from 'axios';
import './LolMain.css';

function LolMain() {
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
                <a href="./LolHistory">Game History</a>
                <a href="./LolVideos">Videos</a>
                <a href="./LolNews">Latest News</a>
            </div>
            <h1 className='lol-h1'> League of Legends Player Search</h1>
            <input className='lol-input' type="text" onChange={e => setSearchText(e.target.value)} />
            <button className='lol-button' onClick={searchForPlayer}>Search</button>
            {JSON.stringify(playerData) !== '{}' ? (
                <div>
                    <h2 className='lol-h2'>Player Info</h2>
                    <p>Name: {playerData.name}</p>
                    <p>Summoner Level: {playerData.summonerLevel}</p>
                    <img className='lol-img' src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/${playerData.profileIconId}.png`} alt="Profile Icon" />
                </div>
            ) : (
                <p>No player data available</p>
            )}
        </div>
    );
}

export default LolMain;
