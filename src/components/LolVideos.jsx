import React from 'react';
import './LolVideos.css';

const videoIds = [
  'VIDEO_ID_1',
  'VIDEO_ID_2',
  'VIDEO_ID_3',
  'VIDEO_ID_4',
  'VIDEO_ID_5',
  'VIDEO_ID_6',
  'VIDEO_ID_7',
  'VIDEO_ID_8',
];

const LolVideos = () => {
  return (
    <div className="lol-videos-container">
      <div className='lol-videos-title'><h1>Most Popular League of Legends Videos</h1></div>
      <div className="video-grid">
        {videoIds.map((videoId, index) => (
          <div className="video-item" key={index}>
            <iframe
              title={`Video ${index + 1}`}
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LolVideos;
