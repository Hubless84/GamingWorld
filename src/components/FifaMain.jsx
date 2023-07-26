import React from 'react';
import './FifaMain.css';

const FifaMain = () => {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul>
          <li><a href="/top-stories">Top Stories</a></li>
          <li><a href="/competitive-play">Competitive Play</a></li>
          <li><a href="/CompReg">Become a Pro</a></li>
        </ul>
      </nav>

      {/* Flex container for upcoming tournaments */}
      <div className="flex-container">
        <table className="upcoming-tournaments">
          <thead>
            <tr>
              <th colSpan="1">Upcoming Tournaments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coming soon</td>
            </tr>
            <tr>
              <td>Coming soon</td>
            </tr>
            {/* Add more rows for additional upcoming tournaments */}
          </tbody>
        </table>
      </div>

      {/* Future ad placeholder */}
      <div className="ad-placeholder">
        {/* Placeholder for the ad */}
      </div>

      {/* Table for trending videos */}
      <table className="trending-videos">
        <thead>
          <tr>
            <th colSpan="1">Trending Videos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Video placeholder 1</td>
          </tr>
          <tr>
            <td>Video placeholder 2</td>
          </tr>
          {/* Add more rows for additional videos */}
        </tbody>
      </table>
    </div>
  );
};

export default FifaMain;
