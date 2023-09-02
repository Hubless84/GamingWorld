import React from 'react';
import './LolVideos.css';

const videoIds = [
  'UOxkGD8qRB4?si=Nz4zQ4SDqr9DLb5k',
  'bzVTONHA5h4?si=Ve-2if_Veljb-nEW',
  'rtfS6PQEot0?si=_ADnkMR8bYDmh3wJ',
  'cJT5d5Ue3ao?si=YPsbVulm_2KYQo0o',
  'nYDLEZvuiqQ?si=-5txHZ0MoZpeInwF',
  't7R6KDE0ejs?si=GC5g3_MRCtk7lInD',
  'nYDLEZvuiqQ?si=-5txHZ0MoZpeInwF',
  'b-krYWQMU8I?si=PAsBYKRSLFURl_Ua',
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
