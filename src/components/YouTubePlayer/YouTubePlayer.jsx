// src/components/YouTubePlayer.jsx
import React from 'react';

const YouTubePlayer = ({ videoId, title }) => {
  return (
    <div style={{ width: '100%', marginTop: '15px' }}>
      <iframe
        width="100%"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
