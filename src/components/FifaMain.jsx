import React from 'react';
import './FifaMain.css';

function FifaMain() {
  return (
    <div>
      <header>
        <h1>Fifa 23</h1>
      </header>
      <nav>
        <ul>
          <li><a href="/BeAPro">Be A Pro</a></li>
          <li><a href="#">Latest News</a></li>
          <li><a href="#">Videos</a></li>
          <li><a href="/AboutGames">About</a></li>
        </ul>
      </nav>
      <div className="container">
        <div className="main-content">
          <table className="upcoming-tournaments">
            <thead>
              <tr>
                <th>Tournament</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fifa Tourney</td>
                <td>AUG 16</td>
                <td>Florida</td>
              </tr>
              <tr>
                <td>Fifa Tourney</td>
                <td>AUG 20</td>
                <td>Online</td>
              </tr>
              <tr>
                <td>Fifa Tourney</td>
                <td>AUG 15</td>
                <td>Online</td>
              </tr>
              {/* Add more rows for upcoming tournaments */}
            </tbody>
          </table>
          <div className="trending-videos">
            <table>
              <thead>
                <tr>
                  <th>Trending Videos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <iframe width="400" height="150" src="https://www.youtube.com/watch?v=o3V-GvvzjE4" frameborder="0" allowfullscreen></iframe>
                  </td>
                </tr>
                {/* Add more rows for trending videos */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2023 GamingWorld. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default FifaMain;
