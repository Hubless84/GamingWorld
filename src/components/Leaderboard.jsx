import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard() {
  const [fifaScore, setFifaScore] = useState('');
  const [valorantScore, setValorantScore] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the server
    axios.get('/api/leaderboard')
      .then(response => {
        setLeaderboard(response.data);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data', error);
      });
  }, []);

  const submitScore = async (game, score) => {
    try {
      // Send the score data to the server
      await axios.post(`/api/game/${game}/score`, {
        score: parseInt(score),
      });

      // Clear the input field after submission
      if (game === 'fifa23') {
        setFifaScore('');
      } else if (game === 'valorant') {
        setValorantScore('');
      }
      
      // Fetch updated leaderboard data and update the state
      axios.get('/api/leaderboard')
        .then(response => {
          setLeaderboard(response.data);
        })
        .catch(error => {
          console.error('Error fetching leaderboard data', error);
        });
    } catch (error) {
      console.error('Error submitting score', error);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="score-section">
        <div className="score-input">
          <h2>FIFA 23</h2>
          <input
            type="number"
            value={fifaScore}
            onChange={e => setFifaScore(e.target.value)}
          />
          <button onClick={() => submitScore('fifa23', fifaScore)}>Submit</button>
        </div>
        <div className="img-container">
          <img src="./images/HomePage/Fifa23.jpeg" alt="FIFA 23" />
        </div>
      </div>

      <div className="score-section">
        <div className="score-input">
          <h2>Valorant</h2>
          <input
            type="number"
            value={valorantScore}
            onChange={e => setValorantScore(e.target.value)}
          />
          <button onClick={() => submitScore('valorant', valorantScore)}>Submit</button>
        </div>
        <div className="img-container">
          <img src="./images/HomePage/Valorant.jpeg" alt="Valorant" />
        </div>
      </div>

      <div>
        <h2>Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="leaderboard-th">Username</th>
              <th className="leaderboard-th">FIFA 23 Score</th>
              <th className="leaderboard-th">Valorant Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(user => (
              <tr key={user.username}>
                <td className="leaderboard-td">{user.username}</td>
                <td className="leaderboard-td">{user.fifa23_score}</td>
                <td className="leaderboard-td">{user.valorant_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
