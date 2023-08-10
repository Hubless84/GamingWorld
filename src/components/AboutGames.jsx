import React from 'react';
import "./AboutGames.css";

function AboutGames() {
  const gameDescriptions = {
    'Fifa 23': `FIFA 23 is the latest installment in the popular FIFA video game series developed by EA Sports. Known for its realistic soccer gameplay, FIFA 23 features improved graphics, new gameplay mechanics, and updated rosters of real-world soccer teams and players. Whether you're a casual fan or a hardcore soccer enthusiast, FIFA 23 offers an immersive gaming experience.`,
    'Dota 2': `Dota 2 is a free-to-play multiplayer online battle arena (MOBA) game developed by Valve Corporation. With its strategic gameplay and diverse hero roster, Dota 2 has become a staple in the competitive gaming scene. Players form teams to battle against each other in fast-paced matches where strategy, teamwork, and quick reflexes are key to victory.`,
    'League of Legends': `League of Legends (LoL) is another popular MOBA game developed by Riot Games. Featuring a unique cast of champions, each with their own abilities and playstyles, LoL has captivated players worldwide. Teams of players compete in matches on various maps, aiming to destroy the enemy Nexus. The game's constant updates and competitive scene keep players engaged and striving for improvement.`,
    'CS: GO': `Counter-Strike: Global Offensive (CS: GO) is a competitive first-person shooter developed by Valve Corporation. With its emphasis on teamwork, strategy, and precision aiming, CS: GO remains a staple in the world of esports. Players participate in matches as terrorists or counter-terrorists, engaging in bomb defusal and hostage rescue scenarios. Its simple yet deep gameplay mechanics have led to a dedicated player base and a thriving esports ecosystem.`
  };

  const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12'];
  
  return (
    <div className="about-page">
      {Object.keys(gameDescriptions).map((game, index) => (
        <div
          key={game}
          className="about-item"
          style={{
            backgroundColor: colors[index % colors.length] // Cycle through colors
          }}
        >
          <h2 style={{ color: colors[(index + 1) % colors.length] }}>
            {game}
          </h2>
          <p>{gameDescriptions[game]}</p>
        </div>
      ))}
    </div>
  );
}

export default AboutGames;