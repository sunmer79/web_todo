import React, { useState } from 'react';
import YouTubePlayer from './YouTubePlayer';
import '../../styles/YouTubePlayer.css';

const SongSection = ({ todaySong, updateSong }) => {
  const [inputSongValue, setInputSongValue] = useState('');

  const extractVideoId = (value) => {
    try {
      const url = new URL(value);
      return url.searchParams.get('v') || url.pathname.split('/').pop();
    } catch {
      return value; // 그냥 ID일 경우
    }
  };

  const handleTodaySongChange = () => {
    const videoId = extractVideoId(inputSongValue.trim());
    if (!videoId) return;
    updateSong(videoId);
    setInputSongValue('');
  };

  return (
    <>
      <h2 className="section-title">
         오늘의 노래 ⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹ ࣪ ˖
      </h2>

      <div className="song-input-wrapper">
        <input
          type="text"
          placeholder="YouTube 영상 ID 또는 URL을 입력하세요"
          value={inputSongValue}
          onChange={(e) => setInputSongValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleTodaySongChange();
          }}
        />
        <button onClick={handleTodaySongChange}>재생</button>
      </div>

      <YouTubePlayer videoId={todaySong.videoId} title={todaySong.title} />
    </>
  );
};

export default SongSection;
