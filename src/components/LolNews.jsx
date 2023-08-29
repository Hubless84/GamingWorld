import React from 'react';
import './LolNews.css';

const LolNews = () => {
  return (
    <div className="lol-news-container">
      <h1 className="lol-news-title">Latest League of Legends News</h1>
      <div className="article-grid">
        {/* Article 1 */}
        <div className="article-item">
          <h2>Article Title 1</h2>
          <p>Article content goes here...</p>
        </div>
        {/* Article 2 */}
        <div className="article-item">
          <h2>Article Title 2</h2>
          <p>Article content goes here...</p>
        </div>
        {/* Article 3 */}
        <div className="article-item">
          <h2>Article Title 3</h2>
          <p>Article content goes here...</p>
        </div>
        {/* Article 4 */}
        <div className="article-item">
          <h2>Article Title 4</h2>
          <p>Article content goes here...</p>
        </div>
        {/* Article 5 */}
        <div className="article-item">
          <h2>Article Title 5</h2>
          <p>Article content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default LolNews;
